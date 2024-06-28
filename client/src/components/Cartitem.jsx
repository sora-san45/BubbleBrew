import { FaTrashCan } from "react-icons/fa6";
import CartBoba from "./CartBoba";
import axios from 'axios';

const Cartitem = ({ bubbleTea, onDelete }) => {
    const handleDeleteItem = async () => {
        try {
            
            onDelete()
        } catch (error) {
            console.error('Failed to delete cart item:', error)
        }
    };

    return (
        <div className="relative bg-yellow-950 bg-opacity-25 shadow-sm flex rounded-lg gap-10 py-4 p-3 px-6">
            <CartBoba flavour_color={bubbleTea.flavour_color} topping_color={bubbleTea.topping_color} />
            <div className="absolute h-10 w-10 top-0 right-0 bg-black opacity-60 rounded-bl-3xl flex justify-center items-center rounded-tr-md cursor-pointer" onClick={handleDeleteItem}>
                <FaTrashCan color="#FFEDD5" />
            </div>
            <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-medium opacity-70">{bubbleTea.flavour}</h1>
                        <h1 className="text-xl font-medium opacity-70">{bubbleTea.topping}</h1>
                    </div>
                    <div className="px-2 bg-black opacity-60 rounded mr-10">
                        <h1 className="text-xl font-medium text-orange-100">{bubbleTea.size}</h1>
                    </div>
                </div>
                <div className="flex items-end gap-5">
                    <h1 className="text-5xl font-bold opacity-70">$ {bubbleTea.price.toFixed(2)}</h1>
                    <h1 className="text-2xl font-semibold opacity-70">{bubbleTea.quantity}x</h1>
                </div>
            </div>
        </div>
    );
}

export default Cartitem;