import { useState } from 'react';
import '../pages/bubble.css';

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
        flavour: '',
        flavourColor: '',
        topping: '',
        toppingColor: '',
        size: '',
        quantity: 0
    });

    const updateDrink = (key, value) => {
        setCustomDrink(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const incrementQty = () => updateDrink('quantity', customDrink.quantity + 1);
    const decrementQty = () => updateDrink('quantity', Math.max(0, customDrink.quantity - 1));

    return (
        <div className="md:flex h-screen items-center justify-center p-5 gap-5 bg-orange-100">
            <div className='w-5/6 md:flex-row-reverse flex flex-col p-3 bg-yellow-950 bg-opacity-50 rounded-md opacity-70 h:screen shadow-sm'>
                <div className='flex flex-col bg-orange-100 border-black border-opacity-80 border-2 rounded-md justify-evenly p-4'>
                    <div className='rounded-md gap-3 flex flex-col'>
                        <h1 className='text-2xl font-semibold'>Flavour</h1>
                        <div className='flex flex-wrap max-w-80 gap-3'>
                            {
                                flavours.map(flavour => (
                                    <div key={flavour.id} className='items-center gap-1 flex flex-col'>
                                        <div onClick={() => updateDrink('flavour', flavour.text) || updateDrink('flavourColor', flavour.color)} className={`h-14 w-14 cursor-pointer rounded-3xl border-2 p-2 flex gap-1 items-center border-black ${flavour.color}`}>
                                        </div>
                                        <h3>{flavour.text}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='rounded-md gap-3 flex flex-col'>
                        <h1 className='text-2xl font-semibold'>Toppings</h1>
                        <div className='flex gap-3'>
                            {
                                toppings.map(topping => (
                                    <div key={topping.id} className='items-center gap-1 flex flex-col'>
                                        <div onClick={() => updateDrink('topping', topping.text) || updateDrink('toppingColor', topping.color)} className='h-14 w-14 cursor-pointer rounded-3xl border-2 p-2 flex gap-1 items-center border-black'>
                                            <div>
                                                <div className={`h-4 w-4 rounded-lg ${topping.color} mb-1`}></div>
                                                <div className={`h-4 w-4 rounded-lg ${topping.color}`}></div>
                                            </div>
                                            <div className={`h-4 w-4 rounded-lg ${topping.color}`}></div>
                                        </div>
                                        <h3>{topping.text}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='rounded-md gap-3 flex flex-col'>
                            <h1 className='text-2xl font-semibold'>Size</h1>
                            <div className='flex gap-3'>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={() => updateDrink('size', 'S')}>S</button>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={() => updateDrink('size', 'M')}>M</button>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={() => updateDrink('size', 'L')}>L</button>
                            </div>
                        </div>
                        <div className='rounded-md gap-3 flex flex-col'>
                            <h1 className='text-2xl font-semibold'>Quantity</h1>
                            <div className='flex gap-3 items-center'>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={incrementQty}>+</button>
                                <div className='border-black border-2 px-3 rounded'>
                                    {customDrink.quantity}
                                </div>
                                <button className='bg-black px-3 py-1 text-orange-100 rounded' onClick={decrementQty}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center p-3 items-center gap-5 w-3/5'>
                    <div className='flex flex-col items-center'>
                        <div className='h-3 w-8 border-2 -mb-1 bg-black rounded border-black'></div>
                        <div className='h-24 rounded-t-full bg-orange-100 bg-opacity-30 w-40 border-2 border-black'></div>
                        <div className='h-5 w-44 rounded bg-black'></div>
                        <div className='h-52 w-40 flex flex-col bg-orange-100 bg-opacity-30 justify-end border-2 border-black rounded-b-md'>
                            <div className={`h-44 flex flex-col justify-end items-center gap-2 ${customDrink.flavourColor} p-3 rounded-b`}>
                                <div className='flex gap-3'>
                                    <div className={`h-6 w-6 rounded-full ${customDrink.toppingColor}`}></div>
                                    <div className={`h-6 w-6 rounded-full -my-5 ${customDrink.toppingColor}`}></div>
                                    <div className={`h-6 w-6 rounded-full my-1 ${customDrink.toppingColor}`}></div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className={`h-6 w-6 rounded-full ${customDrink.toppingColor}`}></div>
                                    <div className={`h-6 w-6 rounded-full ${customDrink.toppingColor}`}></div>
                                    <div className={`h-6 w-6 m-2 rounded-full ${customDrink.toppingColor}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='bg-black p-3 text-orange-100 rounded' onClick={() => console.log(customDrink)}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Customize;
