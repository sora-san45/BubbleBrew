import { useEffect, useState } from "react";
import CollapsibleOrder from "../components/CollapsableOrder";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token=localStorage.getItem('jwtToken')
    const userid=JSON.parse(token).user_id
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                
                const response = await axios.get(`https://bubblebrew-server-latest.onrender.com/orders/${userid}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []); 

    return (
        <div className="flex flex-col py-3 px-4 overflow-y-auto overflow-x-hidden bg-orange-100 h-screen w-full">
            <h1 className="font-bold text-3xl opacity-80">Your Orders</h1>
            <div className="flex flex-col gap-3 mt-10">
                {orders.map(orderItem => (
                    <CollapsibleOrder key={orderItem.order.id} order={orderItem} />
                ))}
            </div>
        </div>
    );
};

export default Orders;
