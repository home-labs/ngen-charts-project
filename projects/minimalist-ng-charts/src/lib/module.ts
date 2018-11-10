import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as Components from './components';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        Components.DonutChartComponent
    ],
    exports: [
        Components.DonutChartComponent
    ]
})
export class MinimalistNgChartsModule { }
