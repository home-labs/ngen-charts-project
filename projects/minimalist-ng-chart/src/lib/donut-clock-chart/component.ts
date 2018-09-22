import {
    Component,
    Input,
    OnInit
} from '@angular/core';


@Component({
    selector: 'app-donut-clock-chart',
    templateUrl: './template.html',
    styleUrls: ['./style.sass']
})
export class DonutClockChartComponent implements OnInit {

    @Input()
    ray: string;

    @Input()
    strokeWidth: string;

    @Input()
    percentualLength: number;

    @Input()
    classMap: Object = {};

    circumferenceLength: number;

    // a service can changes the value of that by a event
    sectorLength: number;

    xy: string;
    cxy: string;

    private rayNumericValue: number

    constructor() { }

    ngOnInit() {
        let
            diameter: number;

        this.rayNumericValue = parseFloat(this.ray);
        diameter = 2 * this.rayNumericValue;
        this.circumferenceLength = Math.PI * diameter;
        this.sectorLength = this.circumferenceLength * (this.percentualLength / 100);

        this.resolveLength();
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
