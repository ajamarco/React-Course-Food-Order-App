import React, { useContext } from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
    //create the cart context object
    const cartCtx = useContext(CartContext);

    const { name, description } = props;
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        //call the addItem function on the cart context
        cartCtx.addItem({
            id: props.id,
            name: name,
            amount: amount,
            price: props.price,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;
