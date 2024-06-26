import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { AiTwotoneShop } from "react-icons/ai";
import { MdPayments } from "react-icons/md";

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getLinkClasses = (path) => {
        return location.pathname === path
            ? "bg-black bg-opacity-70 p-3 font-semibold text-orange-100 rounded text-start"
            : " p-3  font-semibold text-black text-opacity-60 rounded text-start";
    };

    return (
        <div className='md:w-1/5 h-screen p-3 gap-2 md:flex flex-col bg-orange-200 bg-opacity-60 py-6  shadow-md'>
            <Link
                to="/dash"
                className={getLinkClasses("/dash")}
                onClick={toggleSidebar}
            >
                <div className='flex items-center gap-2'>
                <AiTwotoneShop />
                    Shop
                </div>
            </Link>
            <Link
                to="/dash/cart"
                className={getLinkClasses("/dash/cart")}
                onClick={toggleSidebar}
            >
                <div className='flex items-center gap-2'>
                    <FaCartShopping />
                    Cart
                </div>
            </Link>
            <Link
                to="/dash/orders"
                className={getLinkClasses("/dash/orders")}
                onClick={toggleSidebar}
            >
                <div className='flex items-center gap-2'>
                <MdPayments />
                    Orders
                </div>
            </Link>
        </div>
    );
};


export default Sidebar;
