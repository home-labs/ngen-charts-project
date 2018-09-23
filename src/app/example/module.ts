import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleComponent } from './component';

import { MinimalistNgChartsModule } from 'minimalist-ng-charts';


@NgModule({
    imports: [
        CommonModule,
        MinimalistNgChartsModule
    ],
    declarations: [
        ExampleComponent
    ],
    exports: [
        ExampleComponent
    ]
})
export class ExampleModule { }
