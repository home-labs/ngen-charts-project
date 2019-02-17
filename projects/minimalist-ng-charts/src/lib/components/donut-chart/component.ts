import {
    Component,
    Input,
    OnInit,
    // ViewChild,
    // ElementRef
} from '@angular/core';

import '../../extensions/number';


declare interface EnteredSector {
    value: number;
    ngClass?: Object;
}

declare interface Sector {
    ngClass?: Object;
    length?: number;
    offset?: number;
}

declare interface Point {
    x: number;
    y: number;
}


@Component({
    selector: 'app-donut-chart',
    templateUrl: './template.html',
    styleUrls: ['./style.sass']
})
export class DonutChartComponent implements OnInit {

    @Input()
    radius: string;

    @Input()
    borderWidth: string;

    @Input('strokeWidth') strokeWidth: string;

    @Input()
    sectors: Array<Object>;

    // @ViewChild('svg')
    // private svg: ElementRef;

    // private _svg: SVGElement;

    borderCircunference: string;

    sectorsData: Array<Object>;

    diameter: string;
    calculatedRadius: string;
    circumferenceLength: number;
    calculatedExternalBorderRadius: string;
    calculatedInternalBorderRadius: string;

    private sum: number;

    constructor() {
        this.sectorsData = [];
        this.sum = 0;
    }

    ngOnInit() {

        let
            unity: string = this.extractsUnity(this.radius),
            lastOffset: number = 0,
            lastLength: number = 0,
            calculatedDiameter: number,

            numericInputStrokeWidth: number;

        const
            numericInputRadius: number = parseFloat(this.radius),
            diameter: number = numericInputRadius * 2,
            numericInputBorderWidth: number = parseFloat(this.borderWidth);

        // this._svg = this.svg.nativeElement;

        if (!this.strokeWidth) {
            this.strokeWidth = '0px';
        }

        numericInputStrokeWidth = parseFloat(this.strokeWidth);

        this.diameter = `${diameter}${unity}`;

        // the borders aren't considered to calculate the radius
        this.calculatedExternalBorderRadius = `${(diameter -
            numericInputStrokeWidth) / 2}${unity}`;

        this.calculatedRadius = `${(diameter - numericInputBorderWidth) /
            2}${unity}`;

        this.calculatedInternalBorderRadius = `${(diameter -
            (numericInputBorderWidth * 2)) / 2}${unity}`;

        // console.log(diameter);
        // console.log(numericInputBorderWidth);
        // console.log(numericInputStrokeWidth);
        // console.log((diameter - (numericInputBorderWidth + (numericInputStrokeWidth * 2))) / 2);

        calculatedDiameter = parseFloat(this.calculatedRadius) * 2;
        this.circumferenceLength = (Math.PI * calculatedDiameter).round(4);

        this.calculatesSum();

        this.sectors.forEach(
            (enteredSector: EnteredSector) => {
                const
                    sector: Sector = {},
                    percentageLength: number = this.sum.calculatesPercentageTo(enteredSector.value);

                if (enteredSector.hasOwnProperty('ngClass')) {
                    sector.ngClass = enteredSector.ngClass;
                }

                sector.length = this
                    .calculatesSectorLength(percentageLength);

                sector.offset = lastLength + lastOffset;

                this.sectorsData.push(sector);

                lastOffset = sector.offset;
                lastLength = sector.length;
            }
        );

        // this.render();
    }

    // private render() {
    //     let
    //         circle: SVGCircleElement;

    //     this.sectorsData.forEach(
    //         (sector: Object) => {
    //             circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    //             console.log(circle.constructor);
    //         }
    //     );
    // }

    private calculatesSum() {
        this.sectors.forEach(
            (sector: EnteredSector) => {
                this.sum += sector.value;
            }
        );
    }

    private calculatesSectorLength(percentageLength: number): number {
        const
            length: number = this.circumferenceLength * (percentageLength / 100);

        if (length > this.circumferenceLength) {
            return this.circumferenceLength;
        } else if (length < 0) {
            return 0;
        }

        return length.round(4);
    }

    private extractsUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
