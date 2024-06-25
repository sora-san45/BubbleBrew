import { FaTrashCan } from "react-icons/fa6";
import CartBoba from "./CartBoba";

const Cartitem = (props) => {
    return (
        <div className=" relative bg-yellow-950 bg-opacity-25 shadow-sm  flex rounded-lg gap-10 py-4 p-3 px-6">
            <CartBoba />
            <div className="absolute h-10 w-10 top-0 right-0 bg-black opacity-60 rounded-bl-3xl flex justify-center items-center  rounded-tr-md">
            <FaTrashCan color="#FFEDD5" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-7 items-center">
                    <h1 className=" text-xl font-medium opacity-70">Macha, Boba</h1>
                    <div className=" px-2 bg-black opacity-60 rounded ">
                        <h1 className=" text-xl font-medium  text-orange-100 ">S</h1>
                    </div>
                </div>
                <h1 className=" text-5xl font-bold opacity-70">$ 2 </h1>
                
            </div>
        </div>
    );
}

export default Cartitem;