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

declare interface SectorBorder {
    d?: string;
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

    diameter: string;
    sectorsData: Array<Sector>;
    calculatedRadius: string;
    circumferenceLength: number;
    calculatedOuterCircumferenceRadius: string;
    calculatedInnerCircumferenceRadius: string;
    innerCircumferenceStroke: string;
    sectorBorders: Array<SectorBorder>;

    private numericInputRadius: number;
    private sum: number;

    constructor() {
        this.sectorsData = [];
        this.sectorBorders = [];
        this.strokeSettings.bindOn = [];
        this.strokeSettings.width = '1px';
        this.innerCircumferenceStroke = '0px';
        this.calculatedInnerCircumferenceRadius = '0px';
        this.sum = 0;
        this.strokeSettings = {};
    }

    ngOnInit() {

        this.numericInputRadius = parseFloat(this.radius);

        let
            unity: string = this.extractsUnity(this.radius),
            lastOffset: number = 0,
            lastLength: number = 0,
            calculatedDiameter: number,
            numericInputStrokeWidth: number;

        const
            diameter: number = this.numericInputRadius * 2,
            numericInputBorderWidth: number = parseFloat(this.borderWidth),
            circumferenceAngle: number = 360;

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
                    angle: number = circumferenceAngle.calculatesValueToProportionalPart(enteredSector.value, this.sum);

                if (enteredSector.hasOwnProperty('ngClass')) {
                    sector.ngClass = enteredSector.ngClass;
                }

                sector.length = this.circumferenceLength
                    .calculatesValueToProportionalPart(enteredSector.value,
                        this.sum).round(4);

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

    private extractsUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
