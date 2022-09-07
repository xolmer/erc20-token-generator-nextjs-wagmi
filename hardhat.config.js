require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_ID = process.env.ALCHEMY_ID;
module.exports = {
  solidity: '0.8.9',
  networks: {
    localhost: {
      chainId: 1337,
    },
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
