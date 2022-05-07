import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER, decrement, increment } from "./counterReducer";

export default function ContactPage() {
    //dispatching the action to the redux/react hook
    const dispatch = useDispatch();
    //use hooks from react store // we are listening the state
    const { data, title } = useSelector((state: CounterState) => state);

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
                <Button onClick={() => dispatch(decrement())} variant='contained' color='error'>Decrement</Button>
                <Button onClick={() => dispatch(increment())} variant='contained' color='primary'>Increment</Button>
                <Button onClick={() => dispatch(increment(5))} variant='contained' color='primary'>Increment by 5</Button>    
            </ButtonGroup>
        </>

    )

}