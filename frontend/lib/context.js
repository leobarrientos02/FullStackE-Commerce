import React, { createContext, useContext, useState} from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => { 
    // Add our data for the state
    const [quantity, setQuantity] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Increase product quantity
    const increaseQuantity = () =>{ 
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    
    // Decrease product quantity
    const decreaseQuantity = () =>{ 
        setQuantity((prevQuantity) => {
            if(prevQuantity - 1 < 1) return 1;
                return prevQuantity - 1;
        });
    };

    // Add product to cart
    const onAdd = (product, quantity) =>{
        // Increase total price
        setTotalPrice((prevTotal) => prevTotal + product.price * quantity);

        // Increase total quantity
        setTotalQuantity((prevTotal) => prevTotal + quantity);
        // check if the product is already in the cart
        const exist = cartItems.find(item => item.slug === product.slug); // Slug is the id
        if(exist){
            setCartItems(
                cartItems.map((item) =>
                    item.slug === product.slug
                        ? {...exist, quantity: exist.quantity + quantity}
                        : item
                )
            );
        }else{
            setCartItems([...cartItems, {...product, quantity: quantity }]); // ... means don't alter array
        }
    };

    const onRemove = (product) => {
        // Decrease total price
        setTotalPrice((prevTotal) => prevTotal - product.price);

        // Decrease total quantity
        setTotalQuantity((prevTotal) => prevTotal - 1);
        // Check if the product is already in the cart
        const exist = cartItems.find(item => item.slug === product.slug); // Slug is the id
        if(exist.quantity === 1){
            setCartItems(cartItems.filter((item) => item.slug !== product.slug))
        }else{
            setCartItems(
                cartItems.map(item =>
                    item.slug === product.slug 
                        ? {...exist, quantity: exist.quantity - 1}
                        : item
                )
            );
        }
    }

    return(
        <ShopContext.Provider 
            value={{ 
                quantity, 
                increaseQuantity, 
                decreaseQuantity, 
                showCart,
                setShowCart,
                cartItems, 
                setCartItems,
                onAdd,
                onRemove,
                totalQuantity,
                totalPrice,
                setQuantity,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useStateContext = () => useContext(ShopContext);