require("@nomiclabs/hardhat-waffle");
// require("@chainlink/contracts");
// require('@openzeppelin/contracts');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ALCHEMY_URL =
  "https://eth-rinkeby.alchemyapi.io/v2/joVQfefvPkiFxuh5Nqs2SJAdbR_W19gf";
const PRIVATE_KEY =
  "77d066f701150e338a6e541478ce2351521788907b9b9fcbdb26c4cb4334e7a1";

module.exports = {
  networks: {
    rinkeby: {
      url: ALCHEMY_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    localhost: {
      url: "http://localhost:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
  },
  solidity: "0.8.4",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "QRJSBM125NFDHNGJXNZ4U9RZX3GQAPYY77"
  }
};
