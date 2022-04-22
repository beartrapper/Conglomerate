import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
// import artifact from "./compiled-json/Greeter.json";
import artifact from "./compiled-json/PredictionMarket.json";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PredictionMarket } from "./Components/PredictionMarket";
// import { Greeter } from "./Components/Greeter/Greeter";

function App() {
  //saving the contract in a ref
  //can use useState too
  //contract.current value won;t change on re-render once initialized
  const [contract, setContract] = useState(0);
  const [currentUserAddress, setCurrentUserAddress] = useState(0);

  //laoding check
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    //cant use asycn with useEffect, it causes a race condition
    //instead making another async function

    const setup = async () => {
      //getting wallet and addresses
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();

      //getting the contract
      const contractValue = new ethers.Contract(
        artifact.address,
        artifact.abi,
        provider.getSigner()
      );

      setContract(contractValue);
      setCurrentUserAddress(addr);
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
          {console.log(contract)}
          <Router>
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
              <Link to="/make-a-bet">Bet</Link>
            </button>

            <Routes>
              {/* <Route
                path="/greeter"
                element={<Greeter contract={contract} />}
              ></Route> */}
              <Route
                path="/make-a-bet"
                element={
                  <PredictionMarket
                    contract={contract}
                    address={currentUserAddress}
                  />
                }
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
