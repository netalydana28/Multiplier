pragma circom 2.1.3;

include "../../node_modules/circomlib/circuits/comparators.circom";

template SimpleMultiplier() {
    signal input in[2];

    signal output out;

    component isz = IsZero();
    isz.in <== in[0] - in[1];

    isz.out === 0;

    component gte[2];
    component lte[2];

    for (var i = 0; i < 2; i++) {
        lte[i] = LessEqThan(3);

        lte[i].in[0] <== in[i];
        lte[i].in[1] <== 5;

        lte[i].out === 1;

        gte[i] = GreaterEqThan(3);

        gte[i].in[0] <== in[i];
        gte[i].in[1] <== 0;

        gte[i].out === 1;
    }

    out <== in[0] * in[1];
}

component main = SimpleMultiplier();