import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DonutChartComponent } from './component';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        DonutChartComponent
    ],
    exports: [
        DonutChartComponent
        , BrowserModule
    ]
})
export class DonutChartModule { }
