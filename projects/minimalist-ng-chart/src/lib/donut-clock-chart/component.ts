import {
    Component,
    Input
} from '@angular/core';


@Component({
    selector: 'app-donut-clock-chart',
    templateUrl: './template.html',
    styleUrls: ['./style.sass']
})
export class DonutClockChartComponent {

    @Input()
    ray: string;

    @Input()
    strokeWidth: string;

    @Input()
    diameter: string;

    @Input()
    ngClass: Object;

    @Input()
    percentualLength: number;

    sectorLength: number;
    xyNumericValue: number;

    cx: string;
    cy: string;

    private rayNumericValue: number
    private circumferenceLength: number;

    construct() {
        let
            diameter: number;

        this.rayNumericValue = parseFloat(this.ray);
        diameter = 2 * this.rayNumericValue;
        this.circumferenceLength = Math.PI * diameter;
        this.sectorLength = this.circumferenceLength * (this.percentualLength/100);

        this.resolveXY();
    }

    private resolveXY() {

        let
            difference: number,
            xyUnity: string = this.extractUnity(this.diameter),
            strokeWidthNumericValue: number = parseFloat(this.strokeWidth);

        this.xyNumericValue = parseFloat(this.diameter);

        if (strokeWidthNumericValue > this.rayNumericValue) {
            difference = strokeWidthNumericValue - this.rayNumericValue;
            this.xyNumericValue -= difference;
            this.diameter = `${this.xyNumericValue}${xyUnity}`
        }

        this.cx = `${(this.xyNumericValue/2) - (difference/2)}${xyUnity}`;
        this.cy = this.cx;
    }

    private extractUnity(value: string = 'px'): string {
        return '';
    }

}
