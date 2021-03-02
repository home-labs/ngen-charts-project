import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DonutChartModule } from '@actjs.on/ngen-charts';
// import { DonutChartModule } from 'projects/ngen-charts/public-api';


@NgModule({
    imports: [
        BrowserModule,
        DonutChartModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
