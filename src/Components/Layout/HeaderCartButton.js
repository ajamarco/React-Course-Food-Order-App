import React, {useContext, useState, useEffect} from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/cart-context';
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    //get the context
    const cartCtx = useContext(CartContext);

    //set the state for the animation
    const [bumpCart, setBumpCart] = useState(false);

    const numberofCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    },0)

    let cartIconClasses = `${classes.button} ${bumpCart ? classes.bump: ''}`;

    //execute every time an item was added / removed
    useEffect(() => {
        if (cartCtx.items.length === 0) {
          return;
        }
        setBumpCart(true);
    
        const timer = setTimeout(() => {
          setBumpCart(false);
        }, 300);
    
        return () => {
          clearTimeout(timer);
        };
      }, [cartCtx.items]);

    return (
        <button className={cartIconClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberofCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
