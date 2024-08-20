import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, fetchAuthSession, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import amplifyOutput from '../../amplify-output';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import userStore from '@/lib/store/userStore';
import axiosInstance from '@/lib/axiosInstance';

Amplify.configure(amplifyOutput);

const SignIn = () => {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [cipherChallenge, setCipherChallenge] = useState(null);
  const [cipherAnswer, setCipherAnswer] = useState('');
  const [authStage, setAuthStage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserRoleAndId, userRole } = userStore();


  useEffect(() => {
    if (userRole) navigate("/")
  }, [userRole])


  const { register, handleSubmit, formState: { errors } } = useForm();

  const securityQuestion = async (email) => {
    try {
      const res = await axiosInstance.get("https://fechrne8y6.execute-api.us-east-1.amazonaws.com/default/logSecurityQuestionToDynamoDb" + `?userId=${email}`);
      const data = JSON.parse(res.data?.body);
      setQuestion(data?.question);
      setUserAnswer(data?.answer);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCeaserCipherChallenge = async (email) => {
    try {
      const res = await axiosInstance.get("https://fechrne8y6.execute-api.us-east-1.amazonaws.com/default/getCeaserCipherChallenge" + `?userId=${email}`);
      const data = JSON.parse(res.data.body);
      console.log(data);
      setCipherChallenge(data.clue);
      setCipherAnswer(data.answer);
    } catch (error) {
      console.log(error)
      toast.error("Error fetching cesaerCipher challenge")
    }

  }

  const onSubmit = async (data) => {
    const { email, password, securityAnswer, cipherSolution } = data;

    setLoading(true)

    try {
      if (authStage === 1) {
        await signOut();
        await signIn({ username: email, password });
        securityQuestion(email);
        setAuthStage(2);
      } else if (authStage === 2) {
        if (securityAnswer === userAnswer) {
          getCeaserCipherChallenge(email);
          setAuthStage(3);
        } else {
          toast.error('Incorrect security answer');
        }
      } else if (authStage === 3) {
        if (cipherAnswer === cipherSolution) {
          await axiosInstance.post("https://13vrr73rb7.execute-api.us-east-1.amazonaws.com/sendEmail/signIn", {
            email
          })
          const authSession = await fetchAuthSession();
          toast.success('Sign in successful!');
          console.log(authSession?.tokens)
          const userRole = authSession.tokens.idToken.payload["custom:userRole"];
          const idToken = authSession.tokens.idToken.toString();
          const userId = authSession.tokens.idToken.payload["email"];
          localStorage.setItem("idToken", idToken);
          setUserRoleAndId(userRole, userId);
          navigate('/');
        } else {
          toast.error('Incorrect cipher solution');
        }
      }
    } catch (error) {
      console.log("Error : ", error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {authStage === 1 && (
          <>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Email"
                {...register('email')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Password"
                {...register('password')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
          </>
        )}
        {authStage === 2 && (
          <>
            {!question ?
              <div>Loading...</div>
              :
              <div>{question}</div>
            }
            <div>
              <Label htmlFor="securityAnswer">Answer</Label>
              <Input
                id="securityAnswer"
                type="text"
                required
                placeholder="Answer"
                {...register('securityAnswer')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.securityAnswer && <p className="text-red-600">{errors.securityAnswer.message}</p>}
            </div>
          </>
        )}
        {authStage === 3 && (
          <>
          {!cipherChallenge ?
              <div>Loading...</div>
              :
              <div>{cipherChallenge}</div>
            }
            <div>
              <Label htmlFor="cipherSolution">Solve the cipher</Label>
              <Input
                id="cipherSolution"
                type="text"
                required
                placeholder="Solve the cipher"
                {...register('cipherSolution')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cipherSolution && <p className="text-red-600">{errors.cipherSolution.message}</p>}
            </div>
          </>
        )}
        <Button disabled={loading} type="submit" className={`w-full text-white py-2 rounded-lg  ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          {authStage === 1 || authStage === 2 ? 'Next' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
