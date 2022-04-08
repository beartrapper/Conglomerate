import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGreetings } from "../../state/Greeter/actions/fetchGreeting";
import { setGreetings } from "../../state/Greeter/actions/setGreeting";

export const Greeter = (props) => {
  //state variables
  const contract = props.contract;

  const dispatch = useDispatch();
  const greetingValue = useSelector((state) => state.greetingValue);

  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchGreetings(contract));
  }, []);

  //FUNCTIONs
  //changing the greeting value
  const changeValue = () => {
    dispatch(setGreetings(contract, value));
  };

  return (
    <div>
      <h1>{greetingValue}</h1>
      <br />
      <br />
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <button onClick={changeValue}>Change</button>
    </div>
  );
};
