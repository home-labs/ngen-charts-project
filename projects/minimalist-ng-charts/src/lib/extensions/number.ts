declare interface Number {

    calculatesProportionalPartTo(value: number, oneHundredPercentEquivalence?: number): number;

    calculatesValueToProportionalPart(value: number, oneHundredPercentEquivalence?: number): number;

    isOdd(): number;

    round(decimalPlacesCount?: number): number;

}

// 360 -- 100 -- 500
// x   -- y%  -- 50

// os valores informados não estarão em ângulo, mas representarão parte de um todo. O todo é 1, 100, ou, em ângulo de uma circunferência, 360

// 360 -- 500
// x   -- 50

// this = 500
// 500x = 360 * 50 -> x = (50 * 360)/500 -> x = 36°

// usando porcentagem como meio
// 100 -- 500
// y%  -- 50
// 500y = 5000 -> y (100 * 50)/500  -> y = 5000/500 -> y = 10%

// 360 -- 100
// x   -- 10%

// 100x = 3600 -> x = 3600 / 100 -> x = 36°


// this = 5700
// (570 * 100) / 5700
// 10

// this = 100
// (10 * 5700) / 100
// 570


Number.prototype.calculatesProportionalPartTo = function (value: number, oneHundredPercentEquivalence: number = 100): number {

    return (value * oneHundredPercentEquivalence) / this;

}

Number.prototype.calculatesValueToProportionalPart = function (value: number, oneHundredPercentEquivalence: number = 100): number {

    return (value * this) / oneHundredPercentEquivalence;

}

Number.prototype.isOdd = function (): number {

    return this % 2;

}

Number.prototype.round = function (decimalPlacesCount: number = 0): number {

    let
        pieces: Array<string>,
        integerPiece: number,
        decimalPiece: string,
        nextNeighborsOfRight: number,
        decimalPiece2ChangeAsString: string,
        decimalPiece2Change: number,
        oldDecimalFirstDigit: number,
        decimalFirstDigit: number,
        result: string,
        zerosCount: number = 0,
        zeros: string = ''
        ;

    if (!decimalPlacesCount) {
        return Math.round(this);
    }

    pieces = `${this}`.split('.');
    integerPiece = parseInt(pieces[0]);

    if (pieces.length == 2) {
        decimalPiece = pieces[1];
    }

    if (decimalPlacesCount < decimalPiece.length) {

        nextNeighborsOfRight = parseInt(decimalPiece
            .slice(decimalPlacesCount + 1, decimalPiece.length) || '0');

        decimalPiece2ChangeAsString = decimalPiece
            .slice(0, decimalPlacesCount);
        oldDecimalFirstDigit = parseInt(decimalPiece2ChangeAsString[0]);
        decimalPiece2Change = parseInt(decimalPiece2ChangeAsString);

        if (parseInt(decimalPiece[decimalPlacesCount]) > 5 ||
            // according IBGE resolution number 886/66
            (parseInt(decimalPiece[decimalPlacesCount]) == 5 &&
                (nextNeighborsOfRight > 0 ||
                    parseInt(decimalPiece[decimalPlacesCount - 1]).isOdd()))
        ) {
            decimalPiece2Change += 1;

            decimalFirstDigit = parseInt(`${decimalPiece2Change}`[0]);

            if (decimalPiece2ChangeAsString.length >
                `${decimalPiece2Change}`.length
            ) {
                zerosCount = decimalPiece2ChangeAsString.length -
                    `${decimalPiece2Change}`.length;
                zeros = decimalPiece2ChangeAsString.slice(0, zerosCount);
            }

            if (!zerosCount && decimalFirstDigit < oldDecimalFirstDigit) {
                integerPiece += 1;
            }
        }

        result = `${integerPiece}`;

        if (zeros.length) {
            result += `.${zeros}${decimalPiece2Change}`;
        } else {
            result += `.${decimalPiece2Change}`;
        }

        return parseFloat(result);
    }

    return this;
}
