import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MinimalistNgChartsModule } from '../../projects/minimalist-ng-charts/src/public_api';


@NgModule({
    imports: [
        BrowserModule,

        MinimalistNgChartsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
