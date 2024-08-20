import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CustomerConcerns = () => {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await axios.get(
          "https://ogaieon439.execute-api.us-east-1.amazonaws.com/prod/customer-concerns"
        );
        const data = JSON.parse(response.data.body);
        setConcerns(data);
      } catch (err) {
        setError("Failed to fetch customer concerns");
        toast.error("Failed to fetch customer concerns");
      } finally {
        setLoading(false);
      }
    };

    fetchConcerns();
  }, []);

  const notifyAgent = (agentEmail) => {
    // Simulate email notification
    toast.success("Email sent to property agent!");
  };

  return (
    <div className="p-3">
      <div className="text-center font-semibold text-5xl mb-3">
        Customer Concerns
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && concerns.length === 0 && (
        <p>No concerns available</p>
      )}
      {!loading && !error && concerns.length > 0 && (
        <div className="space-y-4">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <p className="font-bold">
                Customer Email: {concern.EmailAddress}
              </p>
              <p className="font-semibold">
                Assigned Agent: {concern.AgentEmail}
              </p>
              <p>Concern: {concern.CustomerConcern}</p>
              <Button onClick={() => notifyAgent(concern.AgentEmail)}>
                Notify Agent
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
};

export default CustomerConcerns;
