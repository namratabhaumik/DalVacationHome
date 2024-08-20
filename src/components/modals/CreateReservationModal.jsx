import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { eachDayOfInterval, differenceInDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import userStore from '@/lib/store/userStore';
import useReservationStore from '@/lib/store/reservationStore';
import axiosInstance from '@/lib/axiosInstance';
import { DateRange } from 'react-date-range';

const reservationSchema = z
    .object({
        startDate: z.coerce.date().refine((data) => data > new Date(), { message: "Start date must be in the future" }),
        endDate: z.coerce.date(),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "End date cannot be earlier than start date.",
        path: ["endDate"]
    });

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

const CreateReservationModal = ({ roomId, setStatus, roomNumber, disDates }) => {

    const { userId } = userStore();
    const { addReservationId } = useReservationStore();

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState(initialDateRange);
    // const [disDates, setDisDates] = useState([]);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(reservationSchema)
    });

    const saveReservationDetails = (reservationId, reservationUserId, roomId) => {
        addReservationId({ reservationId, reservationUserId, roomId });
        setStatus("pending");
    }

    // console.log({ existingReservations })



    // const disabledDates = () => {
    //     let dates = [];

    //     existingReservations.forEach((reservation) => {
    //         const range = eachDayOfInterval({
    //             start: new Date(new Date(reservation.startDate)),
    //             end: new Date(new Date(reservation.endDate))
    //         });
    //         console.log({ range })
    //         dates = [...dates, ...range];
    //     })
    //     console.log({ dates });
    //     setDisDates(dates);

    // };

    // console.log({ dateRange })

    // useEffect(() => {
    //     if (dateRange.startDate && dateRange.endDate) {
    //         const dayCount = differenceInDays(
    //             dateRange.endDate,
    //             dateRange.startDate
    //         );
    //     }
    //     // disabledDates();
    // }, [dateRange]);

    // useEffect(() => {
    // }, [])

    const onSubmit = async () => {
        try {
            setLoading(true);

            const res = await axiosInstance.post("https://ysyv7uxywd.execute-api.us-east-1.amazonaws.com/bookingReq/addBookingRequest", {
                bookingDetails: {
                    roomId,
                    userId,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    roomNumber
                }
            });

            const parsedBody = JSON.parse(res.data.body);
            const reservationId = parsedBody.reservationId;

            toast.success("Booking request successfully added to queue.");
            setIsOpen(false);
            saveReservationDetails(reservationId, userId, roomId)
        } catch (error) {
            console.error('Error adding booking request to queue', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log({ disDates })

    const handleOnChange = (value) => {
        console.log(value.selection.startDate)
        setDateRange({
            startDate: value.selection.startDate,
            endDate: value.selection.endDate,
            key: 'selection'
        });
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Create Reservation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Reservation</DialogTitle>
                    <DialogDescription>
                        Select the dates
                    </DialogDescription>
                </DialogHeader>
                <hr />
                <DateRange
                    rangeColors={['#262626']}
                    ranges={[dateRange]}
                    date={new Date()}
                    onChange={handleOnChange}
                    direction="vertical"
                    showDateDisplay={false}
                    minDate={new Date()}
                    disabledDates={disDates}
                />

                <DialogFooter>
                    <Button disabled={loading} onClick={onSubmit}>Submit</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default CreateReservationModal