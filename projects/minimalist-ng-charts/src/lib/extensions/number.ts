export { };


declare global {

    export interface Number {

        calculatesProportionalPartTo(value: number, oneHundredPercentEquivalence?: number): number;

        calculatesValueToProportionalPart(value: number, oneHundredPercentEquivalence?: number): number;

        round(decimalPlacesCount?: number): number;

        isOdd(): boolean;

    }

}

Number.prototype.calculatesProportionalPartTo = function (value: number, oneHundredPercentEquivalence: number = 100): number {

    return (value * oneHundredPercentEquivalence) / this;

};

Number.prototype.calculatesValueToProportionalPart = function(value: number, oneHundredPercentEquivalence: number = 100): number {

    return (value * this) / oneHundredPercentEquivalence;

};

Number.prototype.isOdd = function (): boolean {

    return (this % 2) !== 0;

};

Number.prototype.round = function (decimalPlacesCount: number = 0): number {

    let parts: string[];

    let integerPart: number;

    let decimalPart: string;

    let nextNeighborsOfRight: number;

    let decimalPart2Change: number;

    let decimalPart2ChangeAsString: string;

    let oldDecimalFirstDigit: number;

    let decimalFirstDigit: number;

    let result: string;

    let zerosCount = 0;

    let zeros = ``;

    if (!decimalPlacesCount) {
        return Math.round(this);
    }

    parts = `${this}`.split('.');

    if (parts.length === 2) {
        integerPart = parseInt(parts[0], 10);
        decimalPart = parts[1];

        if (decimalPlacesCount < decimalPart.length) {

            nextNeighborsOfRight = parseInt(decimalPart
                .slice(decimalPlacesCount + 1, decimalPart.length) || '0', 10);

            decimalPart2ChangeAsString = decimalPart
                .slice(0, decimalPlacesCount);
            oldDecimalFirstDigit = parseInt(decimalPart2ChangeAsString[0], 10);
            decimalPart2Change = parseInt(decimalPart2ChangeAsString, 10);

            if (parseInt(decimalPart[decimalPlacesCount], 10) > 5 ||
                // according IBGE resolution number 886/66
                (parseInt(decimalPart[decimalPlacesCount], 10) === 5 &&
                    (nextNeighborsOfRight > 0 ||
                        parseInt(decimalPart[decimalPlacesCount - 1], 10).isOdd()))
            ) {
                decimalPart2Change += 1;

                decimalFirstDigit = parseInt(`${decimalPart2Change}`[0], 10);

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
