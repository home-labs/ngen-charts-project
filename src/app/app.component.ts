/// <reference path="../../node_modules/@actjs.on/mathrix/extensions/number/index.d.ts" />


import { ESLoadingResolver } from '@actjs.on/es-loading-resolver';
import { IESLoadingResponse } from '@actjs.on/es-loading-resolver';

const esGlobalModuleResolver = new ESLoadingResolver();

let resolvedDirectory: IESLoadingResponse;

try {

    // await fetch('')
    resolvedDirectory = await esGlobalModuleResolver.import('@actjs.on/mathrix/extensions/number');

} catch (reason: any) {
    console.log(`\n`);
    console.log(reason);
    console.log(`\n`);
}



import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {

    total = 12;

    constructor() {

    }

}
