const hre = require("hardhat");
const fs = require("fs");

async function main() {
  //   getting the accounts that wil deploy
  const [deployer] = await hre.ethers.getSigners();

  console.log("deployer address: ", deployer.address);

  //getting the main instance of the contract
  const PredictionMarket = await hre.ethers.getContractFactory(
    "PredictionMarket"
  );

  //deploying the contract
  const predictionMarket = await PredictionMarket.deploy();

  //   waiting for it to deployed
  await predictionMarket.deployed();
  console.log("contract address: ", predictionMarket.address);

  //data to be saved for frontend interactions
  const data = {
    address: predictionMarket.address,
    abi: JSON.parse(predictionMarket.interface.format("json")),
  };

  //need to access abi hence saving it somewhere
  fs.writeFileSync(
    "src/compiled-json/PredictionMarket.json",
    JSON.stringify(data)
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
