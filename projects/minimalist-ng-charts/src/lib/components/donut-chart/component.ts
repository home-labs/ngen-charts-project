import {
    Component,
    Input,
    OnInit,
    // ViewChild,
    // ElementRef
} from '@angular/core';

import '../../extensions/number';


declare interface Sector {
    value: number;
    ngClass?: Object;
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

    @Input()
    sectors: Array<Object>;

    // @ViewChild('svg')
    // private svg: ElementRef;

    // private _svg: SVGElement;

    sectorsData: Array<Object>;

    circumferenceLength: number;
    diameter: string;
    calculatedRadius: string;

    private numericInputRadius: number
    private sum: number;

    constructor() {
        this.sectorsData = [];
        this.sum = 0;
    }

    ngOnInit() {
        let
            lastOffset: number = 0,
            lastLength: number = 0,
            diameter: number;

        // this._svg = this.svg.nativeElement;

        this.numericInputRadius = parseFloat(this.radius);
        diameter = 2 * this.numericInputRadius;
        this.circumferenceLength = (Math.PI * diameter).round(4);
        this.resolvesLength();
        this.calculatesSum();

        this.sectors.forEach(
            (sector: Sector) => {
                const
                    sectorData: Object = {},
                    percentageLength: number = this.sum.calculatesPercentageTo(sector.value);

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
            (sector: Sector) => {
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

    private resolvesLength() {
        let
            radiusUnity: string = this.extractsUnity(this.radius),
            borderWidth: number = parseFloat(this.borderWidth),

            diameter: number = (2 * this.numericInputRadius) + borderWidth;

        this.diameter = `${diameter}${radiusUnity}`;
        this.calculatedRadius = `${(diameter / 2)}${radiusUnity}`;
    }

    private extractsUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
