import React, { useEffect, useState } from "react";
import Cartitem from "../components/Cartitem";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [cartTeas, setCartTeas] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryCharges] = useState(0.90); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (token) {
                    const userId = JSON.parse(token).user_id;
                    axios.get(`/api/cart_items/${userId}`)
                        .then(response => {
                            const { cart_items, total_amount } = response.data;
                            setCartTeas(cart_items);
                            setSubtotal(total_amount);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Failed to fetch cart items:', error);
                            setLoading(false); 
                        });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
                setLoading(false); 
            }
        };

        fetchCartItems();
    }, []);

    const handleDeleteItem = async (bubbleTeaId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const userId = JSON.parse(token).user_id;
                axios.delete(`/api/delete_item/${userId}/${bubbleTeaId}`)
                    .then(() => {
                        axios.get(`/api/cart_items/${userId}`)
                            .then(response => {
                                const { cart_items, total_amount } = response.data;
                                
                                toast('🗑️ Deleted bubble tea', {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    theme: "dark",
                                    style:{
                                        backgroundOpacity:20
                                    }
                                });

                                setCartTeas(cart_items);
                                setSubtotal(total_amount);
                            })
                            .catch(error => {
                                console.error('Failed to fetch cart items after delete:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Failed to delete cart item:', error);
                    });
            }
        } catch (error) {
            console.error('Failed to delete cart item:', error);
        }
    };

    const total = subtotal + deliveryCharges;

    const handleProceedToPayment = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const userId = JSON.parse(token).user_id;
                const address = JSON.parse(token).address;
                const orderData = {
                    user_id: userId,
                    order_status: "pending",
                    address: address,
                    total_amount: total
                };

                axios.post(`/api/orders`, orderData)
                    .then(response => {
                        console.log('Order placed successfully:', response.data);
                        toast.success('Order placed successfully!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "dark",
                        });

                        setCartTeas([]);
                        setSubtotal(0);
                    })
                    .catch(error => {
                        console.error('Failed to place order:', error);
                    });
            }
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    if (loading) {
        return (
            <div>
                <p className="bg-orange-100 h-screen p-4 gap-10 flex overflow-x-hidden">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-orange-100 h-screen p-4 gap-10 flex overflow-x-hidden">
            <div className="w-1/2 flex flex-col gap-5">
                <h1 className="font-bold text-3xl opacity-70">Your Cart</h1>
                
                <div className="h-screen pr-4">
                    <div className="flex gap-5 flex-col">
                        {cartTeas.map(bubbleTea => (
                            <Cartitem
                                key={bubbleTea.id}
                                bubbleTea={bubbleTea}
                                onDelete={() => handleDeleteItem(bubbleTea.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col ml-10 px-10 min-w-96 h-fit py-7 shadow-sm mt-14 gap-3 rounded-md border-2 border-dashed border-yellow-950 border-opacity-30">
                <h1 className="font-bold text-2xl mb-5 opacity-70">Cart Totals</h1>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-black opacity-70">Subtotal</h1>
                    <h1 className="font-bold text-xl text-black opacity-70">$ {subtotal.toFixed(2)}</h1>
                </div>
                <div className="bg-black h-0.5 rounded opacity-30"></div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-black opacity-70">Delivery Charges</h1>
                    <h1 className="font-bold text-lg text-black opacity-70">$ {deliveryCharges.toFixed(2)}</h1>
                </div>
                <div className="flex justify-end mt-4">
                    <h1 className="text-yellow-950 opacity-60 font-semibold">Shipping to  <span className="text-black text-opacity-80 font-bold">{JSON.parse(localStorage.getItem('jwtToken')).address}</span></h1>
                </div>
                <div className="bg-black h-0.5 rounded opacity-30"></div>
                <div className="flex items-center justify-between mb-3">
                    <h1 className="font-semibold text-black text-opacity-70">Total</h1>
                    <h1 className="font-bold text-xl text-black text-opacity-70">$ {total.toFixed(2)}</h1>
                </div>
                <button onClick={handleProceedToPayment} className='bg-black bg-opacity-60 text-orange-100 rounded flex justify-center items-center gap-1 px-4 py-2'>
                    <h1 className='font-semibold'>Proceed to Payment</h1>
                </button>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Cart;
