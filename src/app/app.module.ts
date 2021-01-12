import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NGenChartsModule } from '@actjs.on/ngen-charts';


@NgModule({
    imports: [
        BrowserModule,
        NGenChartsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
