import Cartitem from "../components/Cartitem";

const Cart = () => {
    return (
        <div className="bg-orange-100 h-screen flex">
            <div className="w-1/2 flex flex-col gap-5 p-3">
                <h1 className=" font-bold text-3xl opacity-70">Your Cart</h1>
                <div className=" h-screen overflow-y-auto pr-4">
                    <div className=" flex gap-5 flex-col ">
                        <Cartitem />
                        <Cartitem />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/2 mt-16 gap-3 p-3">
                <input type="text" pl />
            </div>
        </div>
        
    );
}

export default Cart;