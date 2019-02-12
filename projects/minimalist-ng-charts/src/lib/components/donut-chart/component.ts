import {
    Component,
    Input,
    OnInit
} from '@angular/core';

import '../../extensions/number';


declare interface Sector {
    value: number;
    ngClass?: Object;
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
    strokeWidth: string;

    @Input()
    sectors: Array<Object>;

    sectorsData: Array<Object>;

    circumferenceLength: number;
    diameter: string;
    calculatedRay: string;

    private numericInputRay: number
    private sum: number;

    constructor() {
        this.sectorsData = [];
        this.sum = 0;
    }

    calculatesSum() {
        this.sectors.forEach(
            (sector: Sector) => {
                this.sum += sector.value;
            }
        );
    }

    ngOnInit() {
        let
            lastOffset: number = 0,
            lastLength: number = 0,
            diameter: number;

        this.numericInputRay = parseFloat(this.radius);
        diameter = 2 * this.numericInputRay;
        this.circumferenceLength = (Math.PI * diameter).round(4);
        this.resolvesLength();
        this.calculatesSum();

        this.sectors.forEach(
            (sector: Sector) => {
                const
                    sectorData: Object = {},
                    percentageLength: number = this.sum.percentageRelativeTo(sector.value);

                if (sector.hasOwnProperty('ngClass')) {
                    sectorData['ngClass'] = sector.ngClass;
                }

                sectorData['length'] = this
                    .calculatesSectorLength(percentageLength);

                sectorData['offset'] = lastLength + lastOffset;

                this.sectorsData.push(sectorData);

                lastOffset = sectorData['offset'];
                lastLength = sectorData['length'];
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

    private resolvesLength() {
        let
            radiusUnity: string = this.extractsUnity(this.radius),
            strokeWidth: number = parseFloat(this.strokeWidth),

            diameter: number = (2 * this.numericInputRay) + strokeWidth;

        this.diameter = `${diameter}${radiusUnity}`;
        this.calculatedRay = `${(diameter / 2)}${radiusUnity}`;
    }

    private extractsUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
