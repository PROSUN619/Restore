import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";
// import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER, decrement, increment } from "./counterReducer";

export default function ContactPage() {
    //dispatching the action to the redux/react hook
    //const dispatch = useDispatch();
    const dispatch = useAppDispatch();
    //use hooks from react store // we are listening the state
   // const { data, title } = useSelector((state: CounterState) => state);
    const { data, title } = useAppSelector(state => state.counter);

    return (
        <>
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="h2">
                This data is: {data}
            </Typography>
            <ButtonGroup>
                {/* <Button onClick={() => dispatch({type:DECREMENT_COUNTER})} variant='contained'  color='error'>Decrement</Button>
                <Button onClick={() => dispatch({type:INCREMENT_COUNTER})} variant='contained' color='primary'>Increment</Button> */}
                <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
                <Button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
                <Button onClick={() => dispatch(increment(5))} variant='contained' color='primary'>Increment by 5</Button>    
            </ButtonGroup>
        </>

    )

}