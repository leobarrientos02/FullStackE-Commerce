import { useStateContext } from "../lib/context";
import { CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, Checkout } from "../styles/CartStyles";
import { FaShoppingCart } from "react-icons/fa"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Quantity } from "../styles/ProductDetails";

export default function Cart(){
    const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

    return(
        <CartWrapper 
            onClick={() => setShowCart(false)} 
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
        >
            <CartStyle 
                onClick={(e) => e.stopPropagation()}
                initial={{ x: "50%" }}
                animate={{ x: "0%" }}
                exit={{ x: "50%" }}
                transition={{ type: "tween" }}
            >
                {cartItems.length < 1 && (
                    <EmptyStyle
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1>You have more shopping to do &#x1F609;</h1>
                        <FaShoppingCart />
                    </EmptyStyle>
                )}

                {cartItems.length >= 1 &&
                    cartItems.map((item) => {
                        return(
                            <Card 
                                key={item.slug}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />
                                <CardInfo>
                                    <h3>{item.title}</h3>
                                    <h3>${item.price.toFixed(2)}</h3>
                                    <Quantity>
                                        <span>Quantity</span>
                                        <button onClick={() => onRemove(item)}>
                                            <AiFillMinusCircle />
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => onAdd(item, 1)}>
                                            <AiFillPlusCircle />
                                        </button>
                                    </Quantity>
                                </CardInfo>
                            </Card>
                        );
                    })
                }
                {cartItems.length >= 1 && (
                    <Checkout>
                        <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
                        <button>Purchase</button>
                    </Checkout>
                )}
            </CartStyle>
        </CartWrapper>
    );
};