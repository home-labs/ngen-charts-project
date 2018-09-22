import { NgModule } from '@angular/core';

import { ExampleComponent } from './component';

import { MinimalistNgChartModule } from 'minimalist-ng-chart';


@NgModule({
    imports: [
        MinimalistNgChartModule
    ],
    declarations: [
        ExampleComponent
    ],
    exports: [
        ExampleComponent
    ]
})
export class ExampleModule { }
