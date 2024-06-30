import { useState } from 'react';
import CartBoba from './CartBoba'; // Importing CartBoba component
import { MdArrowDropDown } from 'react-icons/md';

const CollapsibleOrder = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const firstBubbleTea = order.bubble_teas.length > 0 ? order.bubble_teas[0] : null;

    return (
        <div className="py-10 px-10 flex flex-col w-3/4 bg-orange-300 bg-opacity-20 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl opacity-70">Order Id: <span className='text-xl'>{order.order.id}</span></h1>
                <button
                    onClick={toggleExpand}
                    className="flex items-center gap-1 bg-black bg-opacity-50 rounded p-2 text-orange-100 text-lg font-semibold focus:outline-none"
                >
                    {isExpanded ? 'Close' : 'Show all '}
                    {isExpanded ? '' : <MdArrowDropDown />}
                </button>
            </div>
            <h1 className="mb-7 opacity-50">Delivered to <span className="font-semibold">{order.order.address}</span></h1>
            <div className="flex items-center justify-between mt-10 py-3 px-4 rounded">
                <CartBoba flavour_color={firstBubbleTea?.flavour_color} topping_color={firstBubbleTea?.topping_color} />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold opacity-70 ">{firstBubbleTea?.flavour}, {firstBubbleTea?.topping}</h1>
                    <h1 className="text-3xl opacity-45 font-bold">$ {firstBubbleTea?.price.toFixed(2)}</h1>
                </div>
                <h1 className="text-2xl font-semibold opacity-70 ">{firstBubbleTea?.quantity}x</h1>
                <h1 className="text-3xl opacity-70 font-bold">$ {(firstBubbleTea?.price * firstBubbleTea?.quantity).toFixed(2)}</h1>
            </div>

            {isExpanded && (
                <>
                    {order.bubble_teas.slice(1).map(tea => (
                        <div key={tea.id} className="flex items-center justify-between mt-6 py-3 px-4 rounded">
                            <CartBoba flavour_color={tea.flavour_color} topping_color={tea.topping_color} /> 
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-semibold opacity-70 ">{tea.flavour}, {tea.topping}</h1>
                                <h1 className="text-3xl opacity-45 font-bold">$ {tea.price.toFixed(2)}</h1>
                            </div>
                            <h1 className="text-2xl font-semibold opacity-70 ">{tea.quantity}x</h1>
                            <h1 className="text-3xl opacity-70 font-bold">$ {(tea.price * tea.quantity).toFixed(2)}</h1>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CollapsibleOrder;
