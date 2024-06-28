import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast ,ToastContainer} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        local_kw: ''
    });

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
            const response = await axios.post('http://127.0.0.1:8000/login', formData);
            localStorage.setItem('jwtToken', JSON.stringify(response.data));
            console.log(JSON.parse(localStorage.getItem('jwtToken')))
            toast('Logged in Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                
            });
            navigate("/dash")
            
        } catch (error) {
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
    };

    return (
        <div className="h-screen w-screen bg-orange-100 flex items-center justify-center">
            <div className="py-5 px-4 flex flex-col w-2/5 items-center rounded-md">
                <h1 className='text-5xl text-opacity-85 mt-5 text-yellow-950' style={{ fontFamily: "Pacifico" }}>Login</h1>
                <div className='flex flex-col gap-3 mt-10 w-3/4'>
                    <input type="email" id="email" placeholder="example@mail.com" className="bg-orange-50 w-full rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.email} onChange={handleChange} />
                    <input type="password" id="password" placeholder="Password" className="bg-orange-50 w-full rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm" value={formData.password} onChange={handleChange} />
                </div>
                <button className='bg-black bg-opacity-70 mt-10 w-24 shadow-md text-orange-100 rounded-full flex justify-center items-center gap-1 px-4 py-2' onClick={handleSubmit}>
                    <h1>Login</h1>
                </button>
                <h1 className='mt-5'>Don't have an account?</h1>
                <h1 className='cursor-pointer font-semibold' onClick={() => navigate('/signup')}>Signup</h1>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default Login;
