declare interface Number {

    percentageRelativeTo(value: number): number;

    isOdd(): number;

    round(decimalPlacesCount?: number): number;

}

Number.prototype.percentageRelativeTo = function (value: number): number {

    return (value * 100) / this;

};

Number.prototype.isOdd = function (): number {

    return this % 2;

}

Number.prototype.round = function(decimalPlacesCount: number = 0): number {

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

        nextNeighborsOfRight = parseInt(decimalPiece.slice(decimalPlacesCount + 1, decimalPiece.length)  || '0');

        decimalPiece2ChangeAsString = decimalPiece.slice(0, decimalPlacesCount);
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

            if (decimalPiece2ChangeAsString.length > `${decimalPiece2Change}`.length) {
                zerosCount = decimalPiece2ChangeAsString.length - `${decimalPiece2Change}`.length;
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
