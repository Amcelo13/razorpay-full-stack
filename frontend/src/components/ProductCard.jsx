/* eslint-disable no-unused-vars */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { Toaster, toast } from 'sonner'
import useRazorpay from "react-razorpay";

export const ProductCard = () => {
    const [amount, setamount] = useState(350)
    const [Razorpay] = useRazorpay()
    // handlePayment Function
    const handlePayment = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/payments/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
        } catch (error) {
            console.log(error);
        }
    }, [amount, Razorpay]); // add dependencies here

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Chetan Thakur",
            description: "Test Mode",
            order_id: data.id,
            prefill: {
                name: "Chetan Thakur",
                email: "cheyu@gmail.com",
                contact: "9999999999"
            },
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/payments/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Something Went Wrong!")
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new Razorpay(options);
        // rzp1.on("payment.failed", function (response) {
        //     alert(response.error.code);
        //     alert(response.error.description);
        //     alert(response.error.source);
        //     alert(response.error.step);
        //     alert(response.error.reason);
        //     alert(response.error.metadata.order_id);
        //     alert(response.error.metadata.payment_id);
        // });
        rzp1.open();
    }
    return (
        <Card className="mt-6 w-96 bg-[#222f3e] text-white">
            <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                <img
                    src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
                    alt="card-image"
                />
            </CardHeader>

            <CardBody>
                <Typography variant="h5" className="mb-2">
                    My First Product
                </Typography>

                <Typography>
                    ₹350 <span className=" line-through">₹699</span>
                </Typography>
            </CardBody>

            <CardFooter className="pt-0">
                <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">Buy Now</Button>
                <Toaster />
            </CardFooter>

        </Card>
    );
}