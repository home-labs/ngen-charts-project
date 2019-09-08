import {
    Component,
    Input,
    OnInit
} from '@angular/core';

import '../../extensions/number';

import { StrokeSettings } from '../../stroke-settings';
import { EnteredSector } from '../../entered-sector';
import { Sector } from '../../sector';
import { SectorBorder } from '../../sector-border';


@Component({
    selector: 'lib-donut-chart',
    templateUrl: './template.html',
    styleUrls: ['./style.styl']
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

    diameter: string;

    sectorsData: Array<Sector>;

    calculatedRadius: string;

    circumferenceLength: number;

    calculatedOuterCircumferenceRadius: string;

    calculatedInnerCircumferenceRadius: string;

    innerCircumferenceStroke: string;

    sectorBorders: Array<SectorBorder>;

    private numericInputRadius: number;

    private numericInputStrokeWidth: number;

    private sum: number;

    constructor() {
        this.strokeSettings = {};
        this.sectorsData = [];
        this.sectorBorders = [];
        this.strokeSettings.bindOn = [];
        this.strokeSettings.width = '1px';
        this.innerCircumferenceStroke = '0px';
        this.calculatedInnerCircumferenceRadius = '0px';
        this.sum = 0;
    }

    ngOnInit() {
        this.numericInputRadius = parseFloat(this.radius);
        this.numericInputStrokeWidth = parseFloat(this.strokeSettings.width);

        let lastOffset = 0;

        let lastLength = 0;

        let calculatedDiameter: number;

        const currentAnglePosition = 0;

        const unity: string = this.extractsUnity(this.radius);

        const diameter: number = this.numericInputRadius * 2;

        const numericInputBorderWidth: number = parseFloat(this.borderWidth);

        const circumferenceAngle = 360;

        this.diameter = `${diameter}${unity}`;

        // only half of the outer borders are considered to width and height
        this.calculatedOuterCircumferenceRadius = `${
            (
                diameter - this.numericInputStrokeWidth
            ) / 2}${unity}`;

        this.calculatedRadius = `${
            (
                diameter - (
                    ((this.numericInputStrokeWidth - 0.1) * 2) +
                    numericInputBorderWidth
                )
            ) / 2}${unity}`;


        if (this.strokeSettings.bindOn.includes('inner')) {
            this.innerCircumferenceStroke = this.strokeSettings.width;
            this.calculatedInnerCircumferenceRadius = `${
                (
                    diameter - (
                        // one of its own plus 2 of the outer
                        (this.numericInputStrokeWidth * 3) +
                        ((numericInputBorderWidth - 0.1) * 2)
                    )
                ) / 2}${unity}`;
        } else {
            this.calculatedInnerCircumferenceRadius = `${
                (
                    diameter - (
                        (this.numericInputStrokeWidth * 2) +
                        ((numericInputBorderWidth - 0.1) * 2)
                    )
                ) / 2}${unity}`;
        }

        calculatedDiameter = parseFloat(this.calculatedRadius) * 2;
        this.circumferenceLength = (Math.PI * calculatedDiameter).round(4);

        this.calculatesSum();

        this.sectors.forEach(
            (enteredSector: EnteredSector) => {

                const sector: Sector = {};

                const proportionalAngle: number = circumferenceAngle.calculatesValueToProportionalPart(enteredSector.value, this.sum);

                const adjacentLegLength: number = this.numericInputRadius + (Math.cos((currentAnglePosition as number * Math.PI) / 180)
                    * (this.numericInputRadius - this.numericInputStrokeWidth));

                const oppositeLegLength: number = this.numericInputRadius +
                        (Math.sin((currentAnglePosition as number * Math.PI) / 180) *
                            (this.numericInputRadius -
                                this.numericInputStrokeWidth));

                (currentAnglePosition as number) += proportionalAngle;

                if (enteredSector.hasOwnProperty('ngClass')) {
                    sector.ngClass = enteredSector.ngClass;
                }

                sector.length = this.circumferenceLength.calculatesValueToProportionalPart(enteredSector.value, this.sum).round(4);

                if (sector.length > this.circumferenceLength) {
                    sector.length = this.circumferenceLength;
                }

                sector.offset = (lastLength as number) + (lastOffset as number);

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

    private calculatesSum() {
        this.sectors.forEach(
            (sector: EnteredSector) => {
                this.sum += sector.value;
            }
        );
    }

    private extractsUnity(value: string = 'px'): string {
        const pattern: RegExp = /[a-z]+/;

        const match = value.match(pattern);

        return match[0];
    }

}
