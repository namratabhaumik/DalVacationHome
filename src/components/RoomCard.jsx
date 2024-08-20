import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import delux from "../../assets/delux.jpg"
import standard2 from "../../assets/standard2.jpg"

const RoomCard = ({ room }) => {
    return (
        <Card>
            <img src={room.roomType === "deluxe" ? delux : standard2} alt="Room Image" className="rounded-t-lg object-cover w-full aspect-[4/3]" />
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Room {room.roomNumber}</CardTitle>
                    <div className="text-primary font-semibold">${room.tariff}/night</div>
                </div>
                <Link to={`/rooms/${room.roomId}`}>
                    <Button variant="outline" className="w-full hover:bg-black hover:text-white mt-3">
                        View Details
                    </Button>
                </Link>

            </CardContent>
        </Card>
    );
};

export default RoomCard;
