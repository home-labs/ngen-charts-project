import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { DonutClockChartComponent } from './donut-clock-chart/component';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule
    ],
    declarations: [
        DonutClockChartComponent
    ],
    exports: [
        DonutClockChartComponent
    ]
})
export class MinimalistNgChartModule { }
