import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DonutClockChartComponent } from './donut-clock-chart/component';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        DonutClockChartComponent
    ],
    exports: [
        DonutClockChartComponent
    ]
})
export class MinimalistNgChartModule { }
