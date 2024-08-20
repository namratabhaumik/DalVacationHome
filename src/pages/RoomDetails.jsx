import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { eachDayOfInterval } from 'date-fns';
import toast from 'react-hot-toast';

import userStore from '@/lib/store/userStore';
import Loader from '@/components/Loader';
import UpdateRoomModal from '@/components/modals/UpdateRoomModal';
import CreateReservationModal from '@/components/modals/CreateReservationModal';
import axiosInstance from '@/lib/axiosInstance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AddFeedbackModal from '@/components/modals/AddFeedbackModal';

const RoomDetails = () => {

    const { roomId } = useParams();
    const [room, setRoom] = useState();
    const [feedback, setFeedback] = useState([]);
    const [resId, setResId] = useState();
    const [status, setStatus] = useState('unbooked');
    const [disDates, setDisDates] = useState([]);


    const { userRole, userId } = userStore();

    const fetchReservations = async () => {
        try {
            const res = await axiosInstance.get("https://r764pd4h2b.execute-api.us-east-1.amazonaws.com/reservationStage/fetchReservationByRoomId" + `?roomId=${roomId}`);
            const parsedBody = JSON.parse(res.data.body);


            if (parsedBody?.reservations) {
                let dates = [];

                parsedBody?.reservations.forEach((reservation) => {
                    const range = eachDayOfInterval({
                        start: new Date(new Date(reservation.startDate)),
                        end: new Date(new Date(reservation.endDate))
                    });
                    console.log({ range })
                    dates = [...dates, ...range];
                })
                console.log({ dates });
                setDisDates(dates);

            }

            const filterReservations = parsedBody.reservations.filter((res => {
                return res.userId === userId
            }))

            if (filterReservations.length > 0) {
                setResId(filterReservations[0].reservationId);
                setStatus("booked");
            }

        } catch (error) {
            if (error.message !== "Reservation not found") {
                console.error("Error while fetching reservations", error)
                toast.error(error.message);
            }
        }
    }

    const fetchRoomDetails = async () => {
        try {
            const response = await axiosInstance.get("https://z6fffkei3a.execute-api.us-east-1.amazonaws.com/roomStage/getRoom" + `?roomId=${roomId}`);
            setRoom(JSON.parse(response.data.body));
        } catch (error) {
            console.error("Error while fetching roomDetails: ", error);
            toast.error(error.message)
        }
    };

    const fetchFeedbacks = async () => {
        try {
            const feedbackResponse = await axiosInstance.get("https://ew0w9pmr1i.execute-api.us-east-1.amazonaws.com/feedbackStage/getFeedback" + `?roomId=${roomId}`)
            setFeedback(JSON.parse(feedbackResponse.data.body));
        } catch (error) {
            if (error.message !== "Feedback is not found for given roomId!") {
                console.error("Error while fetching feedbacks", error)
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        fetchRoomDetails();
        fetchFeedbacks();
    }, [roomId, userId]);

    useEffect(() => {
        fetchReservations();
    }, [])

    if (!room) return <Loader />;

    return (
        <div className="p-4">
            {(userRole === "regular" && status === "booked") && (
                <div className="my-4 p-4 bg-green-800 text-white font-bold">
                    You've successfully reserved this room. Your reservation ID is: {resId}
                </div>
            )}
            <Card className="w-full max-w-2xl mx-auto my-3">
                <CardHeader className="bg-black text-primary-foreground p-6 rounded-t-lg ">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-4xl font-bold text-white">Room {room.roomNumber}</h1>
                        <div className='flex justify-end'>
                            {(userRole === "regular" && status === "unbooked") && (
                                <CreateReservationModal roomId={roomId} roomNumber={room.roomNumber} setStatus={setStatus} disDates={disDates} />
                            )}
                            {(userRole === "regular" && status === "pending") && (
                                <Button className="mt-2" variant='secondary' disabled={true}>Pending</Button>
                            )}
                            {(userRole === "regular" && status === "booked") && (
                                <Button className="mt-2" variant='secondary' disabled={true}>Booked</Button>
                            )}
                            {(userRole === "admin0" && userId === room?.userId) && (
                                <UpdateRoomModal room={room} onRoomUpdated={() => fetchRoomDetails()} />
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">{room.roomType.toUpperCase()} Room</h2>
                        <p className="text-muted-foreground">
                            {room.description}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tariff:</span>
                            <span className="font-semibold">${room.tariff}/night</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Capacity:</span>
                            <span className="font-semibold">{room.capacity} adults</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Room Type:</span>
                            <span className="font-semibold">{room.roomType.toUpperCase()}</span>
                        </div>
                    </div>
                </CardContent>
                <CardContent className="p-6 border-t">
                    <h3 className="text-xl font-semibold mb-2">Amenities</h3>
                    <ul className="grid grid-cols-2 gap-2 text-muted-foreground">
                        {room.amenities.map((amenity, index) => (
                            <li className='font-thin' key={index}>{amenity}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardContent className="p-6 border-t">
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className="text-xl font-semibold">Feedback</h3>
                        {(resId) && (
                            <div className='flex justify-end mb-4'>
                                <AddFeedbackModal roomNumber={room.roomNumber} roomId={roomId} userId={userId} onFeedbackAdded={fetchFeedbacks} />
                            </div>
                        )}
                    </div>
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-4">
                            {feedback.length > 0 ? (
                                feedback.map((item, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                                        <p className="text-gray-700 mb-2">{item.feedbackText}</p>
                                        <p className="text-gray-900 text-sm">Polarity: <Button className={`cursor-auto ${item.sentiment === "POSITIVE" && 'bg-green-900'} ${item.sentiment === "NEGATIVE" && 'bg-red-900'}`} size="sm" variant="custom">{item.sentiment}</Button></p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-700">No feedback available.</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RoomDetails