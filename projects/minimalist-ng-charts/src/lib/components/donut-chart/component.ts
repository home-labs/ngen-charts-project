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
    ngClass: Object;
}

declare interface Sector {
    ngClass?: Object;
    length?: number;
    offset?: number;
}

declare interface StrokeSettings {
    width?: string;
    bindOn?: Array<string>;
}

// declare interface Point {
//     x: number;
//     y: number;
// }


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

    @Input()
    strokeSettings: StrokeSettings;

    @Input()
    sectors: Array<EnteredSector>;

    // @ViewChild('svg')
    // private svg: ElementRef;

    // private _svg: SVGElement;

    innerCircumferenceStroke: string;

    borderCircunference: string;

    sectorsData: Array<Sector>;

    diameter: string;
    calculatedRadius: string;
    circumferenceLength: number;
    calculatedOuterCircumferenceRadius: string;
    calculatedInnerCircumferenceRadius: string;

    private sum: number;

    constructor() {
        this.sectorsData = [];
        this.sum = 0;

        this.strokeSettings = {};
        this.innerCircumferenceStroke = '0px';
        this.strokeSettings.width = '1px';
        this.calculatedInnerCircumferenceRadius = '0px';
        this.strokeSettings.bindOn = [];
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

        numericInputStrokeWidth = parseFloat(this.strokeSettings.width);

        this.diameter = `${diameter}${unity}`;

        // only half of the outer borders are considered to width and height
        this.calculatedOuterCircumferenceRadius = `${
            (
                diameter - numericInputStrokeWidth
            ) / 2}${unity}`;

        this.calculatedRadius = `${
            (
                diameter - (
                    ((numericInputStrokeWidth - 0.1) * 2) +
                    numericInputBorderWidth
                )
            ) / 2}${unity}`;


        if (this.strokeSettings.bindOn.includes('inner')) {
            this.calculatedInnerCircumferenceRadius = `${
                (
                    diameter - (
                        // one of its own plus 2 of the outer
                        (numericInputStrokeWidth * 3) +
                        ((numericInputBorderWidth - 0.1) * 2)
                    )
                ) / 2}${unity}`;
        } else {
            this.calculatedInnerCircumferenceRadius = `${
                (
                    diameter - (
                        (numericInputStrokeWidth * 2) +
                        ((numericInputBorderWidth - 0.1) * 2)
                    )
                ) / 2}${unity}`;
        }

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
