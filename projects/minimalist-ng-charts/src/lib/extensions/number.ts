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
        parts: Array<string>,
        integerPart: number,
        decimalPart: string,
        nextNeighborsOfRight: number,
        decimalPart2Change: number,
        decimalPart2ChangeAsString: string,
        oldDecimalFirstDigit: number,
        decimalFirstDigit: number,
        result: string,
        zerosCount: number = 0,
        zeros: string = ''
    ;

    if (!decimalPlacesCount) {
        return Math.round(this);
    }

    parts = `${this}`.split('.');

    if (parts.length == 2) {
        integerPart = parseInt(parts[0]);
        decimalPart = parts[1];

        if (decimalPlacesCount < decimalPart.length) {

            nextNeighborsOfRight = parseInt(decimalPart
                .slice(decimalPlacesCount + 1, decimalPart.length) || '0');

            decimalPart2ChangeAsString = decimalPart
                .slice(0, decimalPlacesCount);
            oldDecimalFirstDigit = parseInt(decimalPart2ChangeAsString[0]);
            decimalPart2Change = parseInt(decimalPart2ChangeAsString);

            if (parseInt(decimalPart[decimalPlacesCount]) > 5 ||
                // according IBGE resolution number 886/66
                (parseInt(decimalPart[decimalPlacesCount]) == 5 &&
                    (nextNeighborsOfRight > 0 ||
                        parseInt(decimalPart[decimalPlacesCount - 1]).isOdd()))
            ) {
                decimalPart2Change += 1;

                decimalFirstDigit = parseInt(`${decimalPart2Change}`[0]);

                if (decimalPart2ChangeAsString.length >
                    `${decimalPart2Change}`.length
                ) {
                    zerosCount = decimalPart2ChangeAsString.length -
                        `${decimalPart2Change}`.length;
                    zeros = decimalPart2ChangeAsString.slice(0, zerosCount);
                }

                if (!zerosCount && decimalFirstDigit < oldDecimalFirstDigit) {
                    integerPart += 1;
                }
            }

            result = `${integerPart}`;

            if (zeros.length) {
                result += `.${zeros}${decimalPart2Change}`;
            } else {
                result += `.${decimalPart2Change}`;
            }

            return parseFloat(result);
        }
    }

    return this;
}
