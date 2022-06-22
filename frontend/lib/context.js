import React, { createContext, useContext, useState} from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => { 
    // Add our data for the state
    const [quantity, setQuantity] = useState(1);

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


    return(
        <ShopContext.Provider value={{ quantity, increaseQuantity, decreaseQuantity }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useStateContext = () => useContext(ShopContext);