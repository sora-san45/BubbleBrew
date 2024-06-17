import { FaTrashCan } from "react-icons/fa6";
import CartBoba from "./CartBoba";

const Cartitem = (props) => {
    return (
        <div className=" relative bg-orange-100 border-2 border-black border-opacity-60 flex rounded-lg gap-10 py-4 p-3 px-6">
            <CartBoba />
            <div className="absolute h-10 w-10 top-0 right-0 bg-black opacity-60 rounded-bl-3xl flex justify-center items-center  rounded-tr-md">
            <FaTrashCan color="#FFEDD5" />
            </div>
            <div className="flex flex-col">
                <div className="flex gap-7 items-center">
                    <h1 className=" text-xl font-medium opacity-70">Macha, Boba</h1>
                    <div className=" px-2 bg-black opacity-60 rounded ">
                        <h1 className=" text-xl font-medium  text-orange-100 ">S</h1>
                    </div>
                </div>
                <h1 className=" text-3xl font-bold opacity-70">$ 2 </h1>
                <div className='flex gap-3 mt-6'>
                    <button className='bg-black opacity-70 px-3 py-1 text-orange-100 rounded'>+</button>
                    <div className='border-black border-opacity-70 border-2  px-3  rounded'>
                        0
                    </div>
                    <button className='bg-black opacity-70 px-3 text-orange-100 rounded'>-</button>
                </div>
            </div>
        </div>
    );
}

export default Cartitem;