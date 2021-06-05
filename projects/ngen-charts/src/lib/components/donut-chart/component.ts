import '@actjs.on/mathrix/extensions/number';

import {
    Component,
    Input,
    OnInit
} from '@angular/core';


import { IStrokeSettings } from '../../i-stroke-settings';
import { IEnteredSector } from '../../i-entered-sector';
import { ISector } from '../../i-sector';
import { ISectorBorder } from '../../i-sector-border';


@Component({
    selector: 'lib-donut-chart',
    templateUrl: './template.html',
    styleUrls: ['./style.less']
})
export class DonutChartComponent implements OnInit {

    @Input()
    radius: string;

    @Input()
    borderWidth: string;

    @Input()
    strokeSettings!: IStrokeSettings;

    @Input()
    sectors: Array<IEnteredSector>;

    diameter: string;

    sectorsData: Array<ISector>;

    calculatedRadius: string;

    circumferenceLength: number;

    calculatedOuterCircumferenceRadius: string;

    calculatedInnerCircumferenceRadius: string;

    innerCircumferenceStroke: string;

    sectorBorders: Array<ISectorBorder>;

    private numericInputRadius: number;

    private numericInputStrokeWidth: number;

    private sum: number;

    // private esLoadingResolver = new ESWebLoadingResolver();

    constructor() {
        this.radius = '0px';
        this.borderWidth = '0px';
        this.sectors = [];
        this.diameter = '0px';
        this.calculatedRadius = '0px';
        this.circumferenceLength = 0;
        this.calculatedOuterCircumferenceRadius = '0px';

        this.innerCircumferenceStroke = '0px';
        this.calculatedInnerCircumferenceRadius = '0px';
        this.sum = 0;

        this.numericInputRadius = 0;
        this.numericInputStrokeWidth = 0;

        this.sectorsData = [];
        this.sectorBorders = [];

        this.strokeSettings = {} as IStrokeSettings;
        this.strokeSettings.bindOn = [];
        this.strokeSettings.width = '1px';
    }

    ngOnInit() {
        this.numericInputRadius = parseFloat(this.radius);
        this.numericInputStrokeWidth = parseFloat((this.strokeSettings.width)!);

        let lastOffset = 0;

        let lastLength = 0;

        let calculatedDiameter: number;

        let currentAnglePosition = 0;

        const unity: string = this.extractsUnity(this.radius);

        const diameter: number = this.numericInputRadius * 2;

        const numericInputBorderWidth: number = parseFloat(this.borderWidth);

        const circumferenceAngle = 360;

        this.diameter = `${diameter}${unity}`;

        // only half of the outer borders are considered to width and height
        this.calculatedOuterCircumferenceRadius = `${(
                diameter - this.numericInputStrokeWidth
            ) / 2}${unity}`;

        this.calculatedRadius = `${(
                diameter - (
                    ((this.numericInputStrokeWidth - 0.1) * 2) +
                    numericInputBorderWidth
                )
            ) / 2}${unity}`;

        if (this.strokeSettings.bindOn.includes('inner')) {
            this.innerCircumferenceStroke = (this.strokeSettings.width)!;
            this.calculatedInnerCircumferenceRadius = `${(
                    diameter - (
                        // one of its own plus 2 of the outer
                        (this.numericInputStrokeWidth * 3) +
                        ((numericInputBorderWidth - 0.1) * 2)
                    )
                ) / 2}${unity}`;
        } else {
            this.calculatedInnerCircumferenceRadius = `${(
                    diameter - (
                        (this.numericInputStrokeWidth * 2) +
                        ((numericInputBorderWidth - 0.1) * 2)
                    )
                ) / 2}${unity}`;
        }

        calculatedDiameter = parseFloat(this.calculatedRadius) * 2;

        this.circumferenceLength = (Math.PI * calculatedDiameter).round(4);

        this.calculateSum();

        this.sectors.forEach(
            (enteredSector: IEnteredSector) => {

                const sector: ISector = {} as ISector;

                const proportionalAngle: number = circumferenceAngle.calculateValue4ProportionalPart(enteredSector.value, this.sum);

                const adjacentLegLength: number = this.numericInputRadius + (Math.cos(((currentAnglePosition)! * Math.PI) / 180)
                    * (this.numericInputRadius - this.numericInputStrokeWidth));

                const oppositeLegLength: number = this.numericInputRadius +
                    (Math.sin(((currentAnglePosition)! * Math.PI) / 180) *
                        (this.numericInputRadius -
                            this.numericInputStrokeWidth));

                currentAnglePosition += proportionalAngle;

                if (enteredSector.hasOwnProperty('ngClass')) {
                    sector.ngClass = enteredSector.ngClass;
                }

                sector.length = this.circumferenceLength.calculateValue4ProportionalPart(enteredSector.value, this.sum).round(4);

                if (sector.length > this.circumferenceLength) {
                    sector.length = this.circumferenceLength;
                }

                sector.offset = lastLength + lastOffset;

                this.sectorsData.push(sector);

                lastOffset = sector.offset;
                lastLength = sector.length;

                this.sectorBorders.push({
                    d: `
                        M ${this.numericInputRadius},${this.numericInputRadius}
                        L ${adjacentLegLength},${oppositeLegLength}
                    `
                });
            }
        );

    }

    private calculateSum() {
        this.sectors.forEach(
            (sector: IEnteredSector) => {
                this.sum += sector.value;
            }
        );
    }

    private extractsUnity(value: string = 'px'): string {
        const pattern: RegExp = /[a-z]+/;

        const match: RegExpMatchArray | null = value.match(pattern);

        if (match) {
            return match[0];
        }

        return '';

    }

}
