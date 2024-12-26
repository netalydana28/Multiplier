

import path from "path";
import * as snarkjs from 'snarkjs';

export const generateProof = async (input0: number, input1: number, file: string): Promise<any> => {
  console.log(`Generating vote proof with inputs: ${input0}, ${input1}`);
  
  const inputs = {
    in: [input0, input1],
  }

  const wasmPath = path.join(process.cwd(), `./circuits/build/multiplier_js/${file}.wasm`);
  const provingKeyPath = path.join(process.cwd(), `./circuits/keys/${file}_final.zkey`)

  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(inputs, wasmPath, provingKeyPath);

    const calldataBlob = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);

    const argv = calldataBlob
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x: string | number | bigint | boolean) => BigInt(x).toString());

    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const Input = [];

    for (let i = 8; i < argv.length; i++) {
      Input.push(argv[i]);
    }

    return { a, b, c, Input }
  } catch (err) {
    console.log(`Error:`, err)
    return {
      proof: "", 
      publicSignals: [],
    }
  }
}