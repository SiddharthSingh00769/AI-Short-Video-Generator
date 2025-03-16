"use client"
import { useAuthContext } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useMutation } from "convex/react"
import { CircleDollarSign } from "lucide-react"
import React from 'react'
import { toast } from "sonner"
export const creditPlans = [
    {
        credits: 10,
        cost: 1
    },
    {
        credits: 50,
        cost: 4
    },
    {
        credits: 100,
        cost: 8
    },
    {
        credits: 200,
        cost: 15
    },
    {
        credits: 500,
        cost: 35
    }
]

function Billing(){
    const { user, setUser } = useAuthContext();
    const updateUserCredits = useMutation(api.users.UpdateUserCredits);
    const onPaymentSuccess = async(cost, credits) => {
        //Update user credits
        const result = await updateUserCredits({
            uid: user?._id,
            credits: Number(user?.credits) + Number(credits)
        });
        setUser(prev => ({
            ...prev,
            credits: Number(user?.credits) + Number(credits)
        }));

        toast('Credits added successfully!');
    }

    return (
        <div>
            <h2 className="font-bold text-3xl">Credits</h2>

            <div className="p-4 border rounded-xl flex justify-between max-w-2xl mt-5">
                <div>
                    <h2 className="font-bold text-xl">Total Credits</h2>
                    <h2 className="text-sm">1 Credit = 1 Video</h2>
                </div>
                <h2 className="font-bold text-3xl">{user?.credits} Credits</h2>
            </div>

            <p className="text-sm p-5 text-gray-500 max-w-2xl">When your credit balance reaches to 0, video generation will stop working. Add credits to your account to use the service further. Thankyou!</p>
            <div className="mt-5">
                <h2 className="font-bold text-2xl">Buy More Credits</h2>
                <div>
                    {creditPlans.map((plan, index) => (
                        <div key={index} className="p-5 m-3 border rounded-xl flex justify-between max-w-2xl">
                            <h2 className="text-xl flex gap-2 items-center">
                                <CircleDollarSign/> <strong>{plan.credits}</strong> Credits</h2>
                            <div className="flex gap-2 items-center">
                                <h2 className="font-medium text-xl">${plan.cost}</h2>
                                {/* <Button>Buy Now</Button> */}
                                <PayPalButtons style={{ layout: "horizontal" }}
                                onApprove={() => onPaymentSuccess(plan?.cost, plan?.credits)}
                                onCancel={() => toast('Payment Cancelled!')}
                                createOrder={(data, actions) => {
                                    return actions?.order?.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: plan.cost,
                                                    currency_code: "USD"
                                                }
                                            }
                                        ]
                                    })
                                }}
                                />
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Billing;