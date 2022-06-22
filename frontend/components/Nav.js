import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/Nav";
import Cart from "./Cart";

export default function Nav(){
    return(
        <NavStyles>
            <Link href={'/'}>Tech.</Link>
            <NavItems>
                <div>
                    <FiShoppingBag />
                    <h3>Cart</h3>
                </div>
            </NavItems>
            <Cart />
        </NavStyles>
    );
}