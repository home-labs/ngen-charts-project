declare interface Number {

    percentageRelativeTo(value: number): number;

    isOdd(): number;

    roundDecimalPiece(decimalPlacesCount: number): number;

}

Number.prototype.percentageRelativeTo = function (value: number): number {

    return (value * 100) / this;

};

Number.prototype.isOdd = function (): number {

    return this % 2;

}

Number.prototype.roundDecimalPiece = function (decimalPlacesCount: number): number {

    const
        pieces: Array<string> = `${this}`.split('.'),
        integerPiece: number = parseInt(pieces[0]);

    let
        decimalPiece: string,
        decimalPiecePieces: Array<string>,
        nextNeighborsOfRight: number;

    if (pieces.length == 2) {
        decimalPiece = pieces[1];
        decimalPiecePieces = decimalPiece.split('');
    }

    if (decimalPlacesCount < decimalPiece.length) {

        nextNeighborsOfRight = parseInt(decimalPiece.slice(decimalPlacesCount + 1, decimalPiece.length) || '0');

        if (parseInt(decimalPiece[decimalPlacesCount]) > 5 ||
            (parseInt(decimalPiece[decimalPlacesCount]) == 5 &&
                (nextNeighborsOfRight > 0 ||
                    parseInt(decimalPiecePieces[decimalPlacesCount - 1]).isOdd()))
        ) {
            decimalPiecePieces[decimalPlacesCount - 1] = `${parseInt(decimalPiecePieces[decimalPlacesCount - 1]) + 1}`;
        }

        decimalPiece = decimalPiecePieces.slice(0, decimalPlacesCount).join('');
        return parseFloat(`${integerPiece}.${decimalPiece}`);
    }

    return this;
}
