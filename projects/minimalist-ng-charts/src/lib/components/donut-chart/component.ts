import {
    Component,
    Input,
    OnInit
} from '@angular/core';


@Component({
    selector: 'app-donut-chart',
    templateUrl: './template.html',
    styleUrls: ['./style.sass']
})
export class DonutChartComponent implements OnInit {

    @Input()
    ray: string;

    @Input()
    strokeWidth: string;

    @Input()
    sectors: Array<Object>;

    sectorsData: Array<Object>;

    circumferenceLength: number;
    diameter: string;
    calculatedRay: string;
    sectorLength: number;

    private numericInputRay: number

    constructor() {
        this.sectorsData = [];
    }

    ngOnInit() {
        let
            lastOffset: number = 0,
            lastLength: number = 0,
            diameter: number;

        this.numericInputRay = parseFloat(this.ray);
        diameter = 2 * this.numericInputRay;
        this.circumferenceLength = Math.PI * diameter;
        this.resolvesLength();

        this.sectors.forEach(
            (sector: Object) => {
                const
                    sectorData: Object = {};

                if (sector.hasOwnProperty('ngClass')) {
                    sectorData['ngClass'] = sector['ngClass'];
                }

                sectorData['length'] = this
                    .calculatesSectorLength(sector['percentageLength']);
                sectorData['offset'] = lastLength + lastOffset;

                this.sectorsData.push(sectorData);

                lastOffset = sectorData['offset'];
                lastLength = sectorData['length'];
            }
        )
    }

    private calculatesSectorLength(percentageLength: number): number {
        const
            length: number = this.circumferenceLength * (percentageLength / 100);

        if (length > this.circumferenceLength) {
            return this.circumferenceLength;
        } else if (length < 0) {
            return 0;
        }

        return length;
    }

    private resolvesLength() {
        let
            rayUnity: string = this.extractsUnity(this.ray),
            strokeWidth: number = parseFloat(this.strokeWidth),

            diameter: number = (2 * this.numericInputRay) + strokeWidth;

        this.diameter = `${diameter}${rayUnity}`;
        this.calculatedRay = `${(diameter / 2)}${rayUnity}`;
    }

    private extractsUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
