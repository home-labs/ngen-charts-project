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
    xy: string;
    cxy: string;
    sectorLength: number;

    private rayNumericValue: number

    constructor() {
        this.sectorsData = [];
    }

    ngOnInit() {
        let
            lastOffset: number = 0,
            lastLength: number = 0,
            diameter: number;

        this.rayNumericValue = parseFloat(this.ray);
        diameter = 2 * this.rayNumericValue;
        this.circumferenceLength = Math.PI * diameter;
        this.resolveLength();

        this.sectors.forEach(
            (sector: Object) => {
                const
                    sectorData: Object = {};

                if (sector.hasOwnProperty('ngClass')) {
                    sectorData['ngClass'] = sector['ngClass'];
                }

                sectorData['length'] = this
                    .calculatePercentageOfSector(sector['percentualLength']);
                sectorData['offset'] = lastLength + lastOffset;

                this.sectorsData.push(sectorData);

                lastOffset = sectorData['offset'];
                lastLength = sectorData['length'];
            }
        )
    }

    private calculatePercentageOfSector(percentualLength: number) {
        return this.circumferenceLength * (percentualLength / 100);
    }

    private resolveLength() {
        let
            xyUnity: string = this.extractUnity(this.ray),
            strokeValue: number = parseFloat(this.strokeWidth),
            xy: number = (2 * this.rayNumericValue + strokeValue) + 1;

        this.xy = `${xy}${xyUnity}`;
        this.cxy = `${(xy / 2)}${xyUnity}`;
    }

    private extractUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
