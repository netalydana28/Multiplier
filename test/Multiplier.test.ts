import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { generateProof } from "./utils/util";
import { Groth16Verifier } from "../typechain-types";

describe("Multiplier", function () {
  let MultiplierVerifier, multiplierVerifier: Groth16Verifier, Multiplier, multiplier;

  before(async function () {
    MultiplierVerifier = await ethers.getContractFactory("Groth16Verifier");
    multiplierVerifier = await MultiplierVerifier.deploy();
    await multiplierVerifier.deployed();

    Multiplier = await ethers.getContractFactory("SimpleMultiplier");
    multiplier = await Multiplier.deploy(multiplierVerifier.address);
    await multiplier.deployed();
  });

  it("Should return true for valid proof on-chain", async function () {

    let dataResult = await generateProof(
      1, 4,
      'multiplier',
    );

    let result = await multiplierVerifier.verifyProof(
      dataResult.a,
      dataResult.b,
      dataResult.c,
      dataResult.Input
    );
    expect(result).to.equal(true);
  });

  it("Should return false for invalid proof on-chain", async function () {
    let a = [0, 0];
    let b = [
      [0, 0],
      [0, 0],
    ];
    let c = [0, 0];
    let Input = [10];

    let dataResult = { a, b, c, Input };

    let result = await multiplierVerifier.verifyProof(
      dataResult.a,
      dataResult.b,
      dataResult.c,
      dataResult.Input
    );
    expect(result).to.equal(false);
  });

  it("Should return true when validating with proof", async function () {

    let dataResult = await generateProof(
      2, 5,
      'multiplier',
    );

    expect(
      await multiplier.submitProof(
        dataResult.a,
        dataResult.b,
        dataResult.c,
        dataResult.Input
      )
    ).to.be.true;
  });
});

