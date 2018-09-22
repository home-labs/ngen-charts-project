import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { ExampleComponent } from './example/component';


const appRoutes: Routes = [
    {
        path: '',
        component: ExampleComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
