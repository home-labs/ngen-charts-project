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
    classMap: Object = {};

    @Input()
    percentualLength: number;

    sectorLength: number;
    xy: string;

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
            xyUnity: string = this.extractUnity(this.ray),
            strokeValue: number = parseFloat(this.strokeWidth),
            xy: number = (2 * this.rayNumericValue + strokeValue) + 1;

        this.xy = `${xy}${xyUnity}`;
        this.cx = `${(xy / 2)}${xyUnity}`;
        this.cy = this.cx;
    }

    private extractUnity(value: string = 'px'): string {
        const
            pattern: RegExp = /[a-z]+/,
            match = value.match(pattern);

        return match[0]
    }

}
