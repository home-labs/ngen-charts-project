declare interface Number {

    percentageRelativeTo(value): number;

}

Number.prototype.percentageRelativeTo = function(value): number {

    return (value * 100) / this;

};
