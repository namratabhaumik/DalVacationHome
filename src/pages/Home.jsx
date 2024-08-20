import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import userStore from "../lib/store/userStore"
import RoomCard from '@/components/RoomCard';
import Loader from '@/components/Loader';
import AddRoomModal from '@/components/modals/AddRoomModal';
import axiosInstance from '@/lib/axiosInstance';

const Home = () => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userRole } = userStore();

  useEffect(() => {
    fetchAllRooms();
  }, [])

  const fetchAllRooms = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("https://z6fffkei3a.execute-api.us-east-1.amazonaws.com/roomStage/getAllRooms");
      const parsedBody = JSON.parse(res?.data?.body);
      const transformBody = parsedBody.map(item => {
        return {
          tariff: Number(item.tariff.N),
          roomNumber: Number(item.roomNumber.S),
          capacity: Number(item.capacity.N),
          amenities: item.amenities.SS,
          roomType: item.roomType.S,
          updatedAt: item.updatedAt.S,
          createdAt: item.createdAt.S,
          roomId: item.roomId.S,
          description: item.description.S,
        }
      })
      setRooms(transformBody);
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {userRole === "admin0" && (
        <div className='flex justify-center my-4'>
          <AddRoomModal onRoomAdded={fetchAllRooms} />
        </div>
      )}
      {(rooms?.length === 0)
        ? <div className='flex m-4 justify-center items-center text-4xl'>
          No listing to show...!
        </div>
        : <div className='grid md:grid-cols-3 grid-cols-1 justify-center gap-x-16 gap-y-10 mx-4 my-6 sm:grid-cols-2 '>
          {rooms.map(room => (
            <RoomCard room={room} key={room.roomId} />
          ))}
        </div>
      }

    </>
  )
}

export default Home