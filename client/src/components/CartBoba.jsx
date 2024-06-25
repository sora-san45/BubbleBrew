const CartBoba = () => {
    return (
        <div className='flex flex-col items-center opacity-70 '>
            <div className='h-2.5 w-5 -mb-1 bg-black rounded z-50 shadow-md'></div>
            <div className=' h-12 rounded-t-full w-20 bg-orange-100 bg-opacity-40 shadow-md'></div>
            <div className=' h-3  w-24 rounded bg-black shadow-md'></div>
            <div className=' h-24  w-20 flex flex-col  justify-end bg-orange-100 bg-opacity-40 shadow-md rounded-b-md'>
                <div className={` h-20 flex flex-col justify-end items-center gap-2 ${'bg-emerald-200'} p-3 rounded-b `}>
                    <div className='flex gap-3 '>
                        <div className={`h-3 w-3 rounded-full ${'bg-black'}`}></div>
                        <div className={`h-3 w-3 rounded-full -my-2.5 ${'bg-black'}`}></div>
                        <div className={`h-3 w-3 rounded-full my-0.5 ${'bg-black'}`}></div>
                    </div>
                    <div className='flex gap-3 px-2'>
                        <div className={`h-3 w-3 rounded-full ${'bg-black'}`}></div>
                        <div className={`h-3 w-3 rounded-full ${'bg-black'}`}></div>
                        <div className={`h-3 w-3  rounded-full m-1  ${'bg-black'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartBoba;