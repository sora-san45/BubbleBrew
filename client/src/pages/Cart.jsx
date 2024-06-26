import Cartitem from "../components/Cartitem";

const Cart = () => {
    return (
        <div className="bg-orange-100 h-screen p-4 gap-10 flex overflow-x-hidden">
            <div className="w-1/2 flex flex-col gap-5 ">
                <h1 className=" font-bold text-3xl opacity-70"  >Your Cart</h1>
                <div className=" h-screen  pr-4">
                    <div className=" flex gap-5 flex-col ">
                        <Cartitem />
                        <Cartitem />
                    </div>
                </div>
            </div>
            <div className="flex flex-col ml-10 px-10 min-w-96 h-fit py-7 shadow-sm  mt-14   gap-3 rounded-sm bg-yellow-950 bg-opacity-15 p-3">
                <h1 className="font-bold text-2xl mb-5 opacity-70">Cart Totals</h1>
                <div className="flex justify-between items-center">
                    <h1 className=" font-semibold text-black text-opacity-70 ">Subtotal</h1>
                    <h1 className=" font-bold text-xl  text-black text-opacity-70 ">$ 9.00</h1>
                </div>
                <div className="bg-black h-0.5 rounded opacity-30"></div>
                <div className="flex justify-between items-center">
                    <h1 className=" font-semibold text-black text-opacity-70 ">Delivery Charges</h1>
                    <h1 className=" font-bold text-lg text-black text-opacity-70 ">$ 0.90</h1>
                </div>
                <div className="flex justify-end mt-4">
                    <h1 className=" text-yellow-950 text-opacity-60 font-semibold">Shipping to  <span className=" text-black text-opacity-80 font-bold">XYZ Street,Blah blah</span></h1>         
                </div>
                <div className="flex justify-end ">
                    <button className=" font-semibold mb-2">Change Address</button>
                </div>
                <div className="bg-black h-0.5 rounded opacity-30"></div>
                <div className="flex items-center justify-between mb-3">
                    <h1 className=" font-semibold text-black text-opacity-70 ">Total</h1>
                    <h1 className=" font-bold text-xl text-black text-opacity-70 ">$ 9.00</h1>
                </div>
                <button className='bg-black bg-opacity-70  text-orange-100 rounded flex justify-center items-center gap-1 px-4 py-2' >
                        <h1 className=' font-semibold' >Proceed to Payment </h1>
                    </button>
            </div>
        </div>
        
    );
}

export default Cart;