import { Input } from '@headlessui/react'

const Login = () => {
    return (
        <div className=" h-screen w-screen bg-orange-200 bg-opacity-60 flex items-center justify-center">
            <div className="py-5 px-6 flex flex-col h-3/4 w-1/3 bg-orange-50 bg-opacity-35 items-center rounded-md shadow-md ">
                <h1 className='text-5xl text-opacity-85 mt-5  text-yellow-950  ' style={{ fontFamily: "Pacifico" }}>Login</h1>
                <div className=' flex flex-col gap-3 '>
                    <div className="relative mt-16">
                        <input type="email" id="UserEmail" placeholder="example@mail.com" className="  bg-orange-50 w-72 rounded-md focus:outline-none border-gray-200 px-5 py-3 shadow-sm sm:text-sm"/>
                        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                <path
                                    fillRule="evenodd"
                                    d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="relative">
                        <input type="password" id="UserEmail" placeholder="Password"  className="  bg-orange-50 w-72 rounded-md focus:outline-none border-gray-200  px-5 py-3 shadow-sm sm:text-sm"/>
                        
                    </div>
                </div>
                <button  className='bg-black bg-opacity-70 mt-10  w-24 shadow-md  text-orange-100 rounded-full flex justify-center items-center gap-1 px-4 py-2' onClick={()=>navigate('/dash/')} >
                    <h1>Login</h1>
                 </button>
            </div>
        </div>
    );
}

export default Login;