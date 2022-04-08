import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import artifact from "./compiled-json/Greeter.json";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Greeter } from "./Components/Greeter/Greeter";

function App() {
  //saving the contract in a ref
  //can use useState too
  //contract.current value won;t change on re-render once initialized
  const [contract, setContract] = useState(0);

  //laoding check
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    //cant use asycn with useEffect, it causes a race condition
    //instead making another async function

    const setup = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const network = await provider.getNetwork();

      const contractValue = await new ethers.Contract(
        artifact.address,
        artifact.abi,
        provider.getSigner()
      );

      setContract(contractValue);

      //this has to be inside this function
      //caling it outside would make call the greet function on an unresolved promise
      setFetchData(true);
    };

    setup();
  }, []);

  return (
    <div>
      {fetchData ? (
        <div>
          {console.log(contract)}{" "}
          <Router>
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
              <Link to="/greeter">Greeter App</Link>
            </button>

            <Routes>
              <Route
                path="/greeter"
                element={<Greeter contract={contract} />}
              ></Route>
            </Routes>
          </Router>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default App;
