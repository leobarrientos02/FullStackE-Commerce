import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/Nav";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
import User from "./User";
import { useUser } from "@auth0/nextjs-auth0"; // Check if user is already logged in

const {AnimatePresence, motion } = require("framer-motion");

export default function Nav(){
    const {showCart, setShowCart, totalQuantity} = useStateContext();

    const {user, error, isLoading} = useUser(); // Check if user is already logged in
    console.log(user);

    return(
        <NavStyles>
            <Link href={'/'}>Apple Tech.</Link>
            <NavItems>
                <User />
                <div onClick={() => setShowCart(true)} title="View Cart">
                    {totalQuantity > 0 && 
                        <motion.span animate={{scale: 1}} initial={{scale: 0}}>
                            {totalQuantity}
                        </motion.span>
                    }
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