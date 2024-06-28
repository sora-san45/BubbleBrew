import CartBoba from "../components/CartBoba";
import CollapsibleOrder from "../components/CollapsableOrder";

const Orders = () => {
    return (
        <div className=" flex flex-col py-3 px-4 overflow-y-auto overflow-x-hidden bg-orange-100 h-screen w-full">
            <h1 className=" font-bold text-3xl opacity-80"  >Your Orders</h1>
            <div className=" flex flex-col gap-3 mt-10">
                <CollapsibleOrder/>
            </div>
        </div>
    );
}

export default Orders;