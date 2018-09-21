import { Input } from "@angular/core";


export class DonutClockChartComponent {

    @Input()
    ray: number;

    @Input()
    ngClass: Object;

    private circumferenceLength: number;

    construct() {
        this.circumferenceLength = Math.PI * 2 * this.ray;
    }


}
