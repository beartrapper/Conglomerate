import { useEffect, useRef, useState } from 'react';
import { ethers } from "ethers";
import artifact from "./compiled-json/Greeter.json";


function App() {

  //saving the contract in a ref
  //can use useState too
  //contract.current value won;t change on re-render once initialized
  const contract = useRef();

  //state variables
  const [greetingValue, setGreetingValue] = useState("fetching")


  //FUNCTIONS
  //getting the greeting value
  //cant use the set function directly, it';ll save the promise instead of the fetched value
  const fetchGreetingValue = async () => {
    const value = await contract.current.greet();
    setGreetingValue(value);
  }
  
  useEffect(() => {

    //cant use asycn with useEffect, it causes a race condition
    //instead making another async function 

    const setup = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const network = await provider.getNetwork();


      contract.current = await new ethers.Contract(
        artifact.address,
        artifact.abi,
        provider.getSigner(),
      );
      
    
      //this has to be inside this function
      //caling it outside would make call the greet function on an unresolved promise
      fetchGreetingValue();
    }

    setup();



  }, [])

  return (
    <div className="App">
      <h1>{greetingValue}</h1>
    </div>
  );
}

export default App;