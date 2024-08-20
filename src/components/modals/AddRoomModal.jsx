import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
import userStore from '@/lib/store/userStore';

const roomSchema = z.object({
    roomNumber: z
        .string()
        .refine(value => !isNaN(Number(value)), { message: "RoomNumber must be a number" }),
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

const AddRoomModal = ({ onRoomAdded }) => {

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { userId } = userStore();
    
    console.log({userId})

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(roomSchema)
    });

    const onSubmit = async (data) => {
        try {

            setLoading(true);
            console.log(data);

            const transformedData = {
                ...data,
                roomNumber: Number(data.roomNumber),
                tariff: Number(data.tariff),
                capacity: Number(data.capacity),
                amenities: data.amenities.split(',').map(amenity => amenity.trim()),
            };

            const { roomType, tariff, capacity, amenities, description, roomNumber } = transformedData;

            await axiosInstance.post("https://z6fffkei3a.execute-api.us-east-1.amazonaws.com/roomStage/createRoom", {
                roomType,
                tariff,
                capacity,
                amenities,
                description,
                roomNumber,
                userId
            })

            toast.success("Room added successfully.")
            setIsOpen(false);
            onRoomAdded();  
        } catch (error) {
            console.error('Error creating room:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button >Add Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Room</DialogTitle>
                    <DialogDescription>
                        Fill all the required details to add a new room
                    </DialogDescription>
                </DialogHeader>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="roomNumber" className="text-right">Room Number</Label>
                        <Input
                            id="roomNumber"
                            type="text"
                            {...register('roomNumber')}
                            className="col-span-3"
                        />
                        {errors.roomNumber && <span className="text-red-500 text-xs">{errors.roomNumber.message}</span>}
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
                        <Input id="tariff" type="number" {...register('tariff')} className="col-span-3" />
                        {errors.tariff && <span className="text-red-500 text-xs">{errors.tariff.message}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="capacity" className="text-right">Capacity</Label>
                        <Input id="capacity" type="number" {...register('capacity')} className="col-span-3" />
                        {errors.capacity && <span className="text-red-500 text-xs">{errors.capacity.message}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amenities" className="text-right">Amenities</Label>
                        <Input id="amenities" type="text" {...register('amenities')} className="col-span-3" placeholder="Separate with commas" />
                        {errors.amenities && <span className="text-red-500 text-xs">{errors.amenities.message}</span>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input id="description" type="text" {...register('description')} className="col-span-3" />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                    </div>
                    <DialogFooter>
                        <Button disabled={loading} type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddRoomModal