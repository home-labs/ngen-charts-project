import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleComponent } from './component';

import { MinimalistNgChartsModule } from '../../../projects/minimalist-ng-charts/src/public_api';


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
