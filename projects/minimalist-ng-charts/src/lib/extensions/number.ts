declare interface Number {

    calculatesProportionalPartTo(value: number, oneHundredPercentEquivalence?: number): number;

    calculatesValueToProportionalPart(value: number, oneHundredPercentEquivalence?: number): number;

    isOdd(): number;

    round(decimalPlacesCount?: number): number;

}

Number.prototype.calculatesProportionalPartTo = function (value: number, oneHundredPercentEquivalence: number = 100): number {

    return (value * oneHundredPercentEquivalence) / this;

};

Number.prototype.calculatesValueToProportionalPart = function (value: number, oneHundredPercentEquivalence: number = 100): number {

    return (value * this) / oneHundredPercentEquivalence;

};

Number.prototype.isOdd = function (): number {

    return this % 2;

};

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
        zerosCount: Number = 0,
        zeros: String = ''
    ;

    if (!decimalPlacesCount) {
        return Math.round(this);
    }

    parts = `${this}`.split('.');

    if (parts.length === 2) {
        integerPart = Number.parseInt(parts[0]);
        decimalPart = parts[1];

        if (decimalPlacesCount < decimalPart.length) {

            nextNeighborsOfRight = Number.parseInt(decimalPart
                .slice(decimalPlacesCount + 1, decimalPart.length) || '0');

            decimalPart2ChangeAsString = decimalPart
                .slice(0, decimalPlacesCount);
            oldDecimalFirstDigit = Number.parseInt(decimalPart2ChangeAsString[0]);
            decimalPart2Change = Number.parseInt(decimalPart2ChangeAsString);

            if (Number.parseInt(decimalPart[decimalPlacesCount]) > 5
                // according IBGE resolution number 886/66
                || (Number.parseInt(decimalPart[decimalPlacesCount]) === 5
                    && (nextNeighborsOfRight > 0
                        || Number.parseInt(decimalPart[decimalPlacesCount - 1]).isOdd()
                        )
                )
            ) {
                decimalPart2Change += 1;

                decimalFirstDigit = Number.parseInt(`${decimalPart2Change}`[0]);

                if (decimalPart2ChangeAsString.length >
                    `${decimalPart2Change}`.length
                ) {
                    zerosCount = decimalPart2ChangeAsString.length -
                        `${decimalPart2Change}`.length;
                    zeros = decimalPart2ChangeAsString.slice(0, zerosCount as number);
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
};
