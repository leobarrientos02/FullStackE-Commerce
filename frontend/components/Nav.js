import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/Nav";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";

const {AnimatePresence} = require("framer-motion");

export default function Nav(){
    const {showCart, setShowCart, totalQuantity} = useStateContext();
    return(
        <NavStyles>
            <Link href={'/'}>Tech.</Link>
            <NavItems>
                <div onClick={() => setShowCart(true)} title="View Cart">
                    {totalQuantity > 0 && <span>{totalQuantity}</span>}
                    <FiShoppingBag />
                    <h3>Cart</h3>
                </div>
            </NavItems>
            <AnimatePresence>
                {showCart && <Cart /> }
            </AnimatePresence>
        </NavStyles>
    );
}