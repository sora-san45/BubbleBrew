import Cartitem from "../components/Cartitem";

const Cart = () => {
    return ( 
        <div className="bg-orange-100 h-screen flex">
            <div className="w-1/2 flex flex-col gap-5 p-3">
                <h1 className=" font-bold text-3xl opacity-70">Your Cart</h1>
                <div className="flex flex-col">
                    <Cartitem/>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;