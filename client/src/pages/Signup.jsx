import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        id:'3fa85f64-5717-4562-b3fc-2c963f66afa6',
        first_name: '',
        last_name: '',
        phone_no: '',
        address: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            axios.post('/api/signup', formData)
                .then(response => {
                    console.log('Signup successful:', response.data);
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Signup failed:', error);
                });
            
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="h-screen w-screen bg-orange-100 flex items-center justify-center">
            <div className='w-1/3 bg-orange-100 h-screen'></div>
            <div className="py-5 px-4 flex flex-col w-3/5 items-center rounded-md">
                <h1 className='text-5xl text-opacity-85 mt-5 text-yellow-950' style={{ fontFamily: "Pacifico" }}>SignUp</h1>
                <div className='flex flex-col gap-3 w-2/3 mt-10'>
                    <div className="flex justify-between gap-3">
                        <input type="text" id="first_name" placeholder="First Name" className="bg-orange-50 w-1/2 rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.first_name} onChange={handleChange} />
                        <input type="text" id="last_name" placeholder="Last Name" className="bg-orange-50 w-1/2 rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <input type="tel" id="phone_no" placeholder="Phone Number" className="bg-orange-50 w-full rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.phone_no} onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <textarea type="text" id="address" placeholder="Address" className="bg-orange-50 resize-none w-full rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="relative flex gap-3">
                        <input type="email" id="email" placeholder="example@mail.com" className="bg-orange-50 w-full rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.email} onChange={handleChange} />
                        <input type="password" id="password" placeholder="Password" className="bg-orange-50 w-full rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <button onClick={handleSubmit} className='bg-black mt-5 bg-opacity-70 w-24 shadow-md text-orange-100 rounded-full flex justify-center items-center gap-1 px-4 py-2'>
                    <h1>Signup</h1>
                </button>
                <h1 className='mt-2'>Have an account?</h1>
                <h1 className='font-semibold cursor-pointer' onClick={() => navigate("/login")}>Login</h1>
            </div>
            <div className='w-1/3 bg-orange-100 h-screen'></div>
        </div>
    );
};

export default Signup;
