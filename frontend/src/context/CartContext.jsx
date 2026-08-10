import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product === product._id);

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                // Cap quantity at product's stock level
                const finalQuantity = newQuantity > product.stock ? product.stock : newQuantity;
                return prevItems.map((item) =>
                    item.product === product._id ? { ...item, quantity: finalQuantity } : item
                );
            } else {
                return [
                    ...prevItems,
                    {
                        product: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        stock: product.stock,
                        quantity: quantity > product.stock ? product.stock : quantity,
                    },
                ];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.product === productId) {
                    const finalQuantity = newQuantity > item.stock ? item.stock : (newQuantity < 1 ? 1 : newQuantity);
                    return { ...item, quantity: finalQuantity };
                }
                return item;
            })
        );
    };

    const increaseQuantity = (productId) => {
        const item = cartItems.find((i) => i.product === productId);
        if (item) {
            updateQuantity(productId, item.quantity + 1);
        }
    };

    const decreaseQuantity = (productId) => {
        const item = cartItems.find((i) => i.product === productId);
        if (item) {
            updateQuantity(productId, item.quantity - 1);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const getTotalQuantity = () => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                getSubtotal,
                getTotalQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
