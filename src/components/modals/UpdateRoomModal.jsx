import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from '@/lib/axiosInstance';

const roomSchema = z.object({
    roomType: z.enum(['deluxe', 'standard', 'suite']),
    tariff: z
        .string()
        .refine(value => !isNaN(Number(value)), { message: "Tariff must be a number" })
        .refine(value => Number(value) > 0, { message: "Tariff must be a positive number" }),
    capacity: z
        .string()
        .refine(value => !isNaN(Number(value)), { message: "Capacity must be a number" })
        .refine(value => Number(value) > 0, { message: "Capacity must be a positive number" }),
    amenities: z.string().min(1, 'At least one amenity is required'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),
});

const UpdateRoomModal = ({ room ,onRoomUpdated}) => {

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        defaultValues: {
            roomType: room.roomType,
            tariff: room.tariff.toString(),
            capacity: room.capacity.toString(),
            amenities: room.amenities.join(', '), // Convert amenities array to string for input value
            description: room.description,
        },
        resolver: zodResolver(roomSchema)
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            console.log("Data : ", data);

            const updatedRoom = {
                roomType: data.roomType,
                tariff: data.tariff,
                capacity: data.capacity,
                amenities: data.amenities.split(',').map(item => item.trim()), // Convert amenities string back to array
                description: data.description,
            };
            
            const { roomType, tariff, amenities, description, capacity } = updatedRoom;

            const res = await axiosInstance.put("https://z6fffkei3a.execute-api.us-east-1.amazonaws.com/roomStage/updateRoom" + `?roomId=${room.roomId}`, {
                roomType,
                tariff,
                capacity,
                amenities,
                description
            })

            console.log("transformData: ", updatedRoom);

            console.log(res.data);
            setIsOpen(false);
            toast.success("Room updated successfully.")
            onRoomUpdated(); 
        } catch (error) {

            console.log("Error occurred while updating the room: ", error);
            toast.error(error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
            <Button variant="secondary">Update Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Room</DialogTitle>
                    <DialogDescription>
                        Update the details of the room
                    </DialogDescription>
                </DialogHeader>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomNumber" className="text-right">RoomNumber</Label>
                    <Input type="text" id="roomNumber" value={room.roomNumber} disabled className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="roomType" className="text-right">Room Type</Label>
                        <select id="roomType" {...register('roomType')} className="col-span-3">
                            <option value="deluxe">Deluxe</option>
                            <option value="standard">Standard</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tariff" className="text-right">Tariff</Label>
                        <Input type="number" id="tariff" {...register('tariff')} className="col-span-3" />
                        {errors.tariff && <span className="text-red-500 text-xs">{errors.tariff.message}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="capacity" className="text-right">Capacity</Label>
                        <Input type="number" id="capacity" {...register('capacity')} className="col-span-3" />
                        {errors.capacity && <span className="text-red-500 text-xs">{errors.capacity.message}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amenities" className="text-right">Amenities</Label>
                        <Input id="amenities" {...register('amenities')} className="col-span-3" placeholder="Separate with commas"/>
                        {errors.amenities && <span className="text-red-500 text-xs">{errors.amenities.message}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input id="description" {...register('description')} className="col-span-3" />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                    </div>
                    <DialogFooter>
                    <Button disabled={loading}  type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateRoomModal