import CartBoba from "./CartBoba";

const Orderitem = () => {
    return (
        <div className="flex items-center justify-between mt-10 py-3 px-4 rounded ">
            <CartBoba />
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">Macha, Boba</h1>
                <h1 className="text-3xl opacity-45 font-bold">$ 2.00</h1>
            </div>
            <h1 className="text-2xl font-semibold">2x</h1>
            <h1 className="text-3xl opacity-70 font-bold">$ 4.00</h1>
        </div>
    );
}

export default Orderitem;