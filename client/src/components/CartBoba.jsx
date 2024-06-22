const CartBoba = () => {
    return (
        <div className='flex flex-col items-center opacity-70 '>
            <div className='h-2 w-4 border-2 -mb-1.5 bg-black rounded border-black'></div>
            <div className=' h-8 rounded-t-full w-16 border-2 border-black'></div>
            <div className=' h-3  w-20 rounded bg-black'></div>
            <div className=' h-20  w-16 flex flex-col  justify-end border-2 border-black rounded-b-md'>
                <div className={` h-16 flex flex-col justify-end items-center gap-2 ${'bg-emerald-200'} p-3 rounded-b `}>
                    <div className='flex gap-3 px-2'>
                        <div className={`h-2.5 w-2.5 rounded-full ${'bg-black'}`}></div>
                        <div className={`h-2.5 w-2.5 rounded-full -my-1.5 ${'bg-black'}`}></div>
                        <div className={`h-2.5 w-2.5 rounded-full ${'bg-black'}`}></div>
                    </div>
                    <div className='flex gap-3 px-2'>
                        <div className={`h-2.5 w-2.5 rounded-full ${'bg-black'}`}></div>
                        <div className={`h-2.5 w-2.5 rounded-full ${'bg-black'}`}></div>
                        <div className={`h-2.5 w-2.5  rounded-full m-0.4  ${'bg-black'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartBoba;