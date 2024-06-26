import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className=" h-screen flex bg-orange-100 w-screen overflow-hidden items-center jus">
            <motion.div
                initial={{ y: '5vh' }}
                animate={{ y: '0' }}
                transition={{ type: 'spring', stiffness: 70, duration: 1, delay: 0.2 }}
                className="h-screen w-1/2 bg-orange-200 shadow-lg bg-opacity-65 flex items-center -mt-10 rounded-br-full"
            >
                <img
                    src="/src/assets/—Pngtree—bubble drink milk tea and_9026973.png"
                    alt=""
                    className="-mt-20 h-96"
                />
            </motion.div>
            <div className="w-1/2 gap-4 items-center justify-center flex flex-col">
                <div className=" flex flex-col items-center p-3  rounded-full gap-2">
                    <h1 className=" text-7xl text-opacity-85  text-yellow-950  " style={{ fontFamily: "Pacifico" }}>BubbleBrew</h1>
                    <h1 className=" text-2xl font-semibold text-opacity-55 text-black">珍 珠 奶 茶</h1>
                </div>
                <motion.div whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                }}
                    whileTap={{ scale: 0.9 }}>
                    <button className='bg-black bg-opacity-70 mt-10  shadow-md  text-orange-100 rounded-full flex justify-center items-center gap-1 px-4 py-2' onClick={() => navigate('/dash/')} >
                        <h1>Shop Now</h1>
                        <FaChevronRight />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

export default Landing;