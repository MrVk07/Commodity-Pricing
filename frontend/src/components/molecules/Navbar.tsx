import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link className="text-white text-lg font-bold p-2" to="/">Commodity Pricing</Link>
                <button className="text-white block lg:hidden" onClick={toggleMenu} type="button">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'} lg:block`}>
                    <ul className="lg:flex lg:items-center lg:justify-between text-base text-white pt-4 lg:pt-0">
                        <li className="lg:p-4 py-3 px-0 block">
                            <Link className="hover:text-gray-300" to="/">Home</Link>
                        </li>
                        <li className="lg:p-4 py-3 px-0 block">
                            <Link className="hover:text-gray-300" to="/pulses">Pulses</Link>
                        </li>
                        <li className="lg:p-4 py-3 px-0 block">
                            <Link className="hover:text-gray-300" to="/spices">Spices</Link>
                        </li>
                        <li className="lg:p-4 py-3 px-0 block">
                            <Link className="hover:text-gray-300" to="/oilseeds">Oil Seeds</Link>
                        </li>
                        <li className="lg:p-4 py-3 px-0 block">
                            <Link className="hover:text-gray-300" to="/cereals">Cereals</Link>
                        </li>
                        <li className="lg:p-4 py-3 px-0 block">
                            <Link className="hover:text-gray-300" to="/fruits">Fruits</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
