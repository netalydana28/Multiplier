#!/bin/bash

CIRCUIT=''

FOLDER_PATH='build'

if [ "$1" ]; then
    CIRCUIT=$1
fi

if [ ! -d "$FOLDER_PATH" ]; then
  mkdir ${FOLDER_PATH}
fi

circom ./circuit/${CIRCUIT}.circom --r1cs --wasm --sym --c -o ${FOLDER_PATH}

node ${FOLDER_PATH}/${CIRCUIT}_js/generate_witness.js ${FOLDER_PATH}/${CIRCUIT}_js/${CIRCUIT}.wasm ./circuit/input.json ${FOLDER_PATH}/${CIRCUIT}_js/witness.wtns
