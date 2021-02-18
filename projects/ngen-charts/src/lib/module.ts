import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DonutChartComponent } from './components/index';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        DonutChartComponent
    ],
    exports: [
        DonutChartComponent
    ]
})
export class NGenChartsModule { }
