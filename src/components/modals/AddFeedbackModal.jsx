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

const feedbackSchema = z.object({
    feedbackText: z.string().min(1, "Feedback must have at least 1 character")
})

const AddFeedbackModal = ({ roomId, userId, onFeedbackAdded, roomNumber }) => {

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(feedbackSchema)
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post("https://ew0w9pmr1i.execute-api.us-east-1.amazonaws.com/feedbackStage/createFeedback", {
                feedbackText: data.feedbackText,
                roomId,
                userId,
                roomNumber
            })
            setIsOpen(false);
            toast.success("Feedback added successfully.")
            onFeedbackAdded();
        } catch (error) {
            console.error("Error adding feedback: ", error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Add Feedback</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Feedback</DialogTitle>
                    <DialogDescription>
                        Please provide your feedback below
                    </DialogDescription>
                </DialogHeader>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="feedbackText" className="text-right">Feedback</Label>
                        <Input id="feedbackText" type="text" {...register('feedbackText')} className="col-span-3" />
                        {errors.feedbackText && <span className="text-red-500 text-xs col-span-4">{errors.feedbackText.message}</span>}
                    </div>
                    <DialogFooter>
                        <Button disabled={loading}  type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddFeedbackModal