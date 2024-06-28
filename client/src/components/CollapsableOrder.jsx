import { useState } from 'react';
import CartBoba from './CartBoba'; 
import { MdArrowDropDown } from 'react-icons/md';

const CollapsibleOrder = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="py-10 px-10 flex flex-col w-3/4 border-2 border-black border-opacity-20 border-dashed rounded-md shadow-md ">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl opacity-70">Order Id :</h1>
                <button
                    onClick={toggleExpand}
                    className=" flex items-center gap-1 bg-black bg-opacity-50 rounded p-2 text-orange-100 text-lg font-semibold focus:outline-none"
                >
                    {isExpanded ? 'Close' : 'Show all '}
                    {isExpanded? '':<MdArrowDropDown/>}
                </button>
            </div>
            <h1 className="mb-7">Delivered to <span className="font-semibold">XYZ Street, blah blah</span></h1>
            <div className="flex items-center justify-between py-5 px-7 rounded-md">
                <CartBoba />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">Macha, Boba</h1>
                    <h1 className="text-3xl opacity-45 font-bold">$ 2.00</h1>
                </div>
                <h1 className="text-2xl font-semibold">2x</h1>
                <h1 className="text-3xl opacity-70 font-bold">$ 4.00</h1>
            </div>


            {isExpanded && (
                <>
                    <div className="flex items-center justify-between mt-10 py-3 px-4 rounded ">
                        <CartBoba />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold">Macha, Boba</h1>
                            <h1 className="text-3xl opacity-45 font-bold">$ 2.00</h1>
                        </div>
                        <h1 className="text-2xl font-semibold">2x</h1>
                        <h1 className="text-3xl opacity-70 font-bold">$ 4.00</h1>
                    </div>
                    <div className="flex items-center justify-between mt-10 py-3 px-4 rounded ">
                        <CartBoba />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold">Macha, Boba</h1>
                            <h1 className="text-3xl opacity-45 font-bold">$ 2.00</h1>
                        </div>
                        <h1 className="text-2xl font-semibold">2x</h1>
                        <h1 className="text-3xl opacity-70 font-bold">$ 4.00</h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default CollapsibleOrder;
