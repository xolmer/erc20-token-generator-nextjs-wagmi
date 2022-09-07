const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const ERC20Factory = await ethers.getContractFactory('ERC20Factory');
  const factory = await ERC20Factory.deploy();

  await factory.deployed();

  console.log(`Test deployed to: ${factory.address}`);

  fs.writeFileSync(
    './config.js',
    `export const contractAddress = "${factory.address}"
  export const ownerAddress = "${(await factory.signer.getAddress()).toString()}"
  `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
