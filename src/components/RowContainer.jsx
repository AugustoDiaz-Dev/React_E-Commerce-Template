import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import NotFound from "../img/NotFound.svg";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();

    const [items, setItems] = useState([]);

    const [{ cartItems }, dispatch] = useStateValue();

    const addtocart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    useEffect(() => {
        addtocart();
    }, [items]);

    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3 my-12 scroll-smooth  ${flag
                ? "overflow-x-scroll scrollbar-none"
                : "overflow-x-hidden flex-wrap justify-center"
                }`}
        >
            {data && data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item?.id}
                        className="w-275 h-[210px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlayBlack rounded-lg py-2s px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative border-4 border-white"
                    >
                        <div className="w-full flex items-center justify-between">
                            <motion.div
                                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                                whileTap={{ scale: 2 }}
                            >
                                <img
                                    src={item?.imageURL}
                                    alt="product"
                                    className="w-full h-full object-contain ml-3"
                                />
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-10 h-10 rounded-full bg-myGreen flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                                onClick={() => setItems([...cartItems, item])}
                            >
                                <MdShoppingBasket className="text-white" />
                            </motion.div>
                        </div>
                        {/* Card Content */}
                        <div className="w-full flex flex-col items-end justify-end -mt-3">
                            <p className="text-myGreen font-semibold text-base md:text-lg">
                                {item?.title}
                            </p>
                            <p className="mt-1 text-sm text-primary">
                                {item?.description}
                            </p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-white font-semibold">
                                    <span className="text-sm text-myGreen">$ </span> {item?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={NotFound} className="h-340" alt="not found" />
                    <p className="text-xl text-headingColor font-semibold my-2">
                        Items Not Available
                    </p>
                </div>
            )}
        </div>
    );
};

export default RowContainer;