import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { AiTwotoneShop } from "react-icons/ai";
import { MdArrowDropUp, MdPayments, MdArrowDropDown } from "react-icons/md";

const Sidebar = () => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const user = JSON.parse(token);
    const email = user.email;
    const name = user.user_name;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    const getLinkClasses = (path) => {
        return location.pathname === path
            ? "bg-black bg-opacity-70 p-3 font-semibold text-orange-100 rounded text-start"
            : "p-3 font-semibold text-black text-opacity-60 rounded text-start";
    };

    return (
        <div className='md:w-1/5 h-screen p-3 gap-2 md:flex flex-col justify-between bg-orange-200 bg-opacity-60 py-6 shadow-md'>
            <div className='flex flex-col'>
                <Link
                    to="/dash"
                    className={getLinkClasses("/dash")}
                >
                    <div className='flex items-center gap-2'>
                        <AiTwotoneShop />
                        Shop
                    </div>
                </Link>
                <Link
                    to="/dash/cart"
                    className={getLinkClasses("/dash/cart")}
                >
                    <div className='flex items-center gap-2'>
                        <FaCartShopping />
                        Cart
                    </div>
                </Link>
                <Link
                    to="/dash/orders"
                    className={getLinkClasses("/dash/orders")}
                >
                    <div className='flex items-center gap-2'>
                        <MdPayments />
                        Orders
                    </div>
                </Link>
            </div>
            <div className='py-2 px-3 gap-2 items-center shadow-sm border-2 border-dashed border-yellow-900 border-opacity-20  rounded-md flex flex-col'>

                <div className='flex flex-col  w-full gap-5'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex gap-2 items-center'>
                            <div className='w-12 rounded-full p-2 bg-opacity-20 bg-yellow-900'>
                                <img src="/assets/image.png" alt="Profile" className='w-full h-full object-cover rounded-full' />
                            </div>
                            <div className=' flex flex-col'>
                                <div className='font-semibold opacity-70 text-black'>
                                    {name}
                                </div>
                                <div className='text-sm opacity-60'>{email}</div>
                            </div>
                        </div>
                        <button
                            onClick={toggleExpand}
                            className="flex items-center gap-1 focus:outline-none"
                        >
                            {isExpanded ? <MdArrowDropUp  /> : <MdArrowDropDown />}
                        </button>
                    </div>
                    
                    {isExpanded && (
                        <div className="mt-2 w-full">
                            <button
                                className='bg-black bg-opacity-60 w-full text-orange-100 rounded justify-center flex items-center gap-1 px-4 py-2 '
                                onClick={handleLogout}
                            >
                                <h1 className='font-semibold'>Logout</h1>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
