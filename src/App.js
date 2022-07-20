import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { CreateContainer, Footer, Navbar, Home, AboutUs, Contact } from "./components";

import { getAllFoodItems } from "./utils/firebaseFunctions";

const App = () => {
    const [{
        foodItems
    }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Navbar />
                <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/createItem" element={<CreateContainer />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AnimatePresence>
    );
};

export default App