import { useState } from 'react';
import '../pages/bubble.css';
import { MdShoppingBag } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

const Customize = () => {
    const flavours = [
        { id: 1, text: "Chocolate", color: "bg-yellow-950" },
        { id: 2, text: "Macha", color: "bg-emerald-200" },
        { id: 3, text: "Strawberry", color: "bg-pink-200" },
        { id: 4, text: "Mango", color: "bg-yellow-200" },
        { id: 5, text: "Blueberry", color: "bg-violet-200" },
        { id: 6, text: "Classic", color: "bg-gray-200" }
    ];

    const toppings = [
        { id: 1, text: "Boba", color: 'bg-black' },
        { id: 2, text: "Red Beans", color: 'bg-red-950' },
        { id: 3, text: "Agar", color: 'bg-gray-300' }
    ];

    const [customDrink, setCustomDrink] = useState({
        name: '',
        user_id: JSON.parse(localStorage.getItem('jwtToken')).user_id,
        flavour: '',
        flavour_color: '',
        topping: '',
        topping_color: '',
        size: '',
        price: 0,
        quantity: 0
    });

    const [loading, setLoading] = useState(false);

    const updateDrink = (key, value) => {
        setCustomDrink(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const addToCart = async () => {
        const updatedDrink = {
            ...customDrink,
            name: `${customDrink.flavour} ${customDrink.topping}`
        };

        setCustomDrink(updatedDrink);
        setLoading(true); 

        try {
            console.log(updatedDrink);
            axios.post('/api/bubble_tea', updatedDrink)
            .then(response => {
                console.log('Signup successful:', response.data);
                toast('🧋 Added to cart!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
                console.log('Added:', response.data);
            })
            .catch(error => {
                console.error(' failed:', error);
            });
            
        } catch (error) {
            console.error('Failed to add:', error);
        } finally {
            setLoading(false);
        }
    };

    const incrementQty = () => updateDrink('quantity', customDrink.quantity + 1);
    const decrementQty = () => updateDrink('quantity', Math.max(0, customDrink.quantity - 1));

    return (
        <div className="md:flex h-screen items-center justify-center p-5 gap-5 bg-orange-100 relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center   z-50">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#59534c"
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            )}
            <div className='w-5/6 md:flex-row-reverse flex flex-col p-3 bg-yellow-950 bg-opacity-50 rounded-md opacity-70 h:screen shadow-md'>
                <div className='flex flex-col bg-orange-100 shadow-md rounded-md justify-evenly p-4'>
                    <div className='rounded-md gap-3 flex flex-col'>
                        <h1 className='text-2xl font-semibold'>Flavour</h1>
                        <div className='flex flex-wrap max-w-80 gap-3'>
                            {flavours.map(flavour => (
                                <div key={flavour.id} className='items-center gap-1 flex flex-col'>
                                    <div
                                        onClick={() => updateDrink('flavour', flavour.text) || updateDrink('flavour_color', flavour.color)}
                                        className={`h-14 w-14 cursor-pointer rounded-3xl shadow-md p-2 flex gap-1 items-center ${flavour.color}`}
                                    ></div>
                                    <h3>{flavour.text}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='rounded-md gap-3 flex flex-col'>
                        <h1 className='text-2xl font-semibold'>Toppings</h1>
                        <div className='flex gap-3'>
                            {toppings.map(topping => (
                                <div key={topping.id} className='items-center gap-1 flex flex-col'>
                                    <div
                                        onClick={() => updateDrink('topping', topping.text) || updateDrink('topping_color', topping.color)}
                                        className='h-14 w-14 cursor-pointer rounded-3xl bg-orange-50 px-2.5 shadow-md p-2 flex gap-1 items-center'
                                    >
                                        <div>
                                            <div className={`h-4 w-4 rounded-lg ${topping.color} mb-1`}></div>
                                            <div className={`h-4 w-4 rounded-lg ${topping.color}`}></div>
                                        </div>
                                        <div className={`h-4 w-4 rounded-lg ${topping.color}`}></div>
                                    </div>
                                    <h3>{topping.text}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='rounded-md gap-3 flex flex-col'>
                            <h1 className='text-2xl font-semibold'>Size</h1>
                            <div className='flex gap-3'>
                                <button
                                    className={`px-3 py-1 bg-black rounded text-orange-100 ${customDrink.size === 'S' ? 'opacity-100' : 'opacity-90'}`}
                                    onClick={() => { updateDrink('size', 'S'); updateDrink('price', 2); }}
                                >S</button>
                                <button
                                    className={`px-3 py-1 bg-black text-orange-100 rounded ${customDrink.size === 'M' ? 'opacity-100' : 'opacity-90'}`}
                                    onClick={() => { updateDrink('size', 'M'); updateDrink('price', 2.5); }}
                                >M</button>
                                <button
                                    className={`px-3 py-1 bg-black text-orange-100 rounded ${customDrink.size === 'L' ? 'opacity-100' : 'opacity-90'}`}
                                    onClick={() => { updateDrink('size', 'L'); updateDrink('price', 3); }}
                                >L</button>
                            </div>
                        </div>
                        <div className='rounded-md gap-3 flex flex-col'>
                            <h1 className='text-2xl font-semibold'>Quantity</h1>
                            <div className='flex gap-3 items-center'>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={incrementQty}>+</button>
                                <div className='border-black border-2 py-0.5 px-3 rounded'>
                                    {customDrink.quantity}
                                </div>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={decrementQty}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center p-3 items-center gap-5 w-3/5'>
                    <div className='flex flex-col items-center'>
                        <div className='h-3 w-8 -mb-1 bg-black rounded z-50 shadow-md'></div>
                        <div className='h-24 rounded-t-full bg-orange-100 bg-opacity-30 w-40 shadow-md'></div>
                        <div className='h-5 w-44 rounded bg-black shadow-md'></div>
                        <div className='h-52 w-40 flex flex-col bg-orange-100 bg-opacity-30 justify-end shadow-md rounded-b-md'>
                            <div className={`h-44 flex flex-col justify-end items-center gap-2 ${customDrink.flavour_color} p-3 rounded-b`}>
                                <div className='flex gap-3'>
                                    <div className={`h-6 w-6 rounded-full ${customDrink.topping_color}`}></div>
                                    <div className={`h-6 w-6 rounded-full -my-5 ${customDrink.topping_color}`}></div>
                                    <div className={`h-6 w-6 rounded-full my-1 ${customDrink.topping_color}`}></div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className={`h-6 w-6 rounded-full ${customDrink.topping_color}`}></div>
                                    <div className={`h-6 w-6 rounded-full ${customDrink.topping_color}`}></div>
                                    <div className={`h-6 w-6 m-2 rounded-full ${customDrink.topping_color}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='bg-black text-orange-100 rounded flex items-center gap-1 px-4 py-2' onClick={addToCart}>
                        <MdShoppingBag />
                        <h1 className='font-semibold'>Add</h1>
                    </button>
                    <div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customize;
