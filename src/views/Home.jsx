import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";

import { Header, FilteredProducts2, CartContainer, FilteredProducts1 } from "../components/index";

const Home = () => {
    const [{ cartShow }, dispatch] = useStateValue();
    // const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => { }, [cartShow]);

    return (
        <section className="w-full h-auto flex flex-col items-center justify-center ">
            <Header />

            <FilteredProducts1 />

            <FilteredProducts2 />

            {cartShow && <CartContainer />}
        </section>
    );
};

export default Home;