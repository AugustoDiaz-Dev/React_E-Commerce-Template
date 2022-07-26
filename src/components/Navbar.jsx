import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Link } from "react-router-dom";
// Signin with Google popup
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdAdd, MdLogout } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { motion } from "framer-motion";

const Navbar = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const {
                user: {
                    // refreshToken,
                    providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };

    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <nav className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary drop-shadow-xl">
            {/* DESKTOP & TABLET START */}
            {/* Logo starts */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-10 rounded object-cover" alt="Company Logo" />
                    <p className="text-headingColor text-xl font-bold">¡El gusto de Sonia!</p>
                </Link>
                {/* Logo ends */}
                {/* Links starts */}
                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-24"
                    >
                        <li className="text-lg text-textColor hover:text-myGreen hover:font-bold duration-100 transition-all ease-in-out cursor-pointer">
                            <Link to={"/"}>Inicio</Link>
                        </li>
                        <li className="text-lg text-textColor hover:text-myGreen hover:font-bold duration-100 transition-all ease-in-out cursor-pointer">
                            <Link to={"/about"}>Acerca</Link>
                        </li>
                        <li className="text-lg text-textColor hover:text-myGreen hover:font-bold duration-100 transition-all ease-in-out cursor-pointer">
                            <Link to={"/contact"}>Contacto</Link>
                        </li>
                    </motion.ul>
                    {/* Cart starts */}
                    <div
                        className="relative flex items-center justify-center"
                        onClick={showCart}
                    >
                        <BsCartCheck className="text-textColor text-2xl cursor-pointer" />
                        {cartItems && cartItems.length > 0 && (
                            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Cart ends */}
                    {/* Login starts */}
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.3 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="User Avatar"
                            onClick={login}
                        />
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-100 shadow-xl rounded-lg flex flex-col absolute top-12 right-1"
                            >
                                {user && user.email === "augustordiaz@gmail.com" && (
                                    <Link to={"/createItem"}>
                                        <p
                                            className="px-4 py-2 flex items-center justify-end gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            Nuevo Producto<MdAdd className="text-myGreen text-2xl" />
                                        </p>
                                    </Link>
                                )}
                                <hr />
                                <p
                                    className="px-4 py-2 flex items-center justify-end gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}
                                >
                                    Terminar Sesión <MdLogout className="text-myRed text-2xl" />
                                </p>
                            </motion.div>
                        )}
                    </div>
                    {/* Login ends */}
                </div>
                {/* Links ends */}
            </div>
            {/* DESKTOP & TABLET END */}
            {/* MOBILE START */}
            <div className="flex items-center justify-between md:hidden w-full h-full ">
                <div
                    className="relative flex items-center justify-center"
                    onClick={showCart}
                >
                    <BsCartCheck className="text-textColor text-2xl mr-2 cursor-pointer" />
                    {cartItems && cartItems.length > 0 && (
                        <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-myGreen font-bold">
                                {cartItems.length}
                            </p>
                        </div>
                    )}
                </div>

                <Link to={"/"} className="flex items-center justify-center gap-2">
                    <img src={Logo} className="w-10 rounded object-cover" alt="Company Logo" />
                    {/* <p className="text-headingColor text-xl font-bold text-center">¡El gusto de Sonia!</p> */}
                </Link>

                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="mr-1 w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                        alt="User Avatar"
                        onClick={login}
                    />
                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-1"
                        >
                            {user && user.email === "augustordiaz@gmail.com" && (
                                <Link to={"/createItem"}>
                                    <p className="px-4 py-2 flex items-center justify-end gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                                        Nuevo Producto<MdAdd className="text-myGreen text-2xl" />
                                    </p>
                                </Link>
                            )}
                            <hr />
                            <ul className="flex flex-col ">
                                <li
                                    className="text-base text-textColor hover:text-myGreen hover:font-bold duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <Link to={"/"}>Inicio</Link>
                                </li>
                                <li
                                    className="text-base text-textColor hover:text-myGreen hover:font-bold duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <Link to={"/about"}>Acerca</Link>
                                </li>
                                <li
                                    className="text-base text-textColor hover:text-myGreen hover:font-bold duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <Link to={"/contact"}>Contacto</Link>
                                </li>
                            </ul>
                            <hr />
                            <p
                                className="m-2 p-2 rounded-md shadow-md flex items-center justify-end gap-3 cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                onClick={logout}
                            >
                                Terminar Sesión <MdLogout className="text-myRed text-2xl" />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
            {/* MOBILE END */}
        </nav >
    );
};

export default Navbar;