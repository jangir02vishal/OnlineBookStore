import React, { useContext, useEffect, useState }  from "react";
import { Link } from "react-router-dom";

//react icons
import { FaBarsStaggered, FaBook, FaCartShopping, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthProvider";


const Navbar = () =>{
    const { cart } = useContext(AuthContext);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const {user} = useContext(AuthContext);
    // console.log(user);

    //toggle menu 
    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () =>{
            if(window.scrollY > 100){
                setIsSticky(true);
            }else{
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])
    //Nav items are defined here
    const navItems = [
        {link: "Home", path: "/"},
        {link: "About", path: "/about"},
        {link: "Shop", path: "/shop"},
        {link: "My Account", path: "/sell/dashboard"},
        {link: "Blog", path: "/blog"},
        {link: "My cart (" + cart.length + ")" , path: "/cart"},
        {link: "Sign up", path: "/signup"},
        {link: "Log in", path: "/login"}
    ]

    return (
        <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""}`}>
                <div className="flex justify-between items-center text-base gap-8">
                    {/* logo */}
                    <Link to = "/" className="text-2x1 font-bold text-blue-700 flex items-center gap-2"><FaBook className="inline-block"/>Books</Link>

                    {/* nav items for large devices */}
                    <ul className="md:flex space-x-12 hidden text-bold">
                        {
                            navItems.map(({link, path}) => <Link key={path} to={path} className="block text-base text-black
                            uppercase cursor-pointer hover:text-blue-700">{link}</Link>)
                        }
                    </ul>
                

                    {/* menu-button for mobile devices */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            {
                                isMenuOpen ? <FaXmark className="h-5 w-5 text:black"/> : <FaBarsStaggered />
                            }
                        </button>
                    </div>

                    {/* nav-items for small devices */}
                    <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                        {
                            navItems.map(({link, path}) => <Link key={path} to={path} className="block text-base text-white
                            uppercase cursor-pointer hover:text-blue-700">{link}</Link>)
                        }
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar;