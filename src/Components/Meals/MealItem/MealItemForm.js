//import useRef and useState
import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    //set the ref from the Input custom component
    const amountInputRef = useRef();

    //form submit handler
    const submitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = amountInputRef.current.value; //returns a string - even in a number field
        const numberEnteredAmount = +enteredAmount;

        //if there's an error with the value, set the state to false
        if (
            enteredAmount.trim().length === 0 ||
            numberEnteredAmount < 1 ||
            numberEnteredAmount > 5
        ) {
            setAmountIsValid(false);
            return;
        }
        //if no error happened call the 
        props.onAddToCart(numberEnteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemForm;
