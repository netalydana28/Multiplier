import { ethers } from "hardhat";

async function main() {

  const MultiplierVerifier = await ethers.getContractFactory("Groth16Verifier");
  const multiplierVerifier = await MultiplierVerifier.deploy();
  await multiplierVerifier.deployed();
  console.log("MultiplierVerifier Contract deployed to:", multiplierVerifier.address);

  const Multiplier = await ethers.getContractFactory("SimpleMultiplier");
  const multiplier = await Multiplier.deploy(multiplierVerifier.address);
  await multiplier.deployed();

  console.log("Multiplier Contract deployed to:", multiplier.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
