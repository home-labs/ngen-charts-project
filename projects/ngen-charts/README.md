# NGenCharts

## Requirements

>- @angular/core and @angular/common 5 or higher;
>- @rplaurindo/mathrix.ts;
>- @rplaurindo/mathrix.js.

## Installing

	$ npm i @rplaurindo/minimalist-ng-charts --save

## Usage

Include the module into ```imports``` metadata key of ```NgModule``` decorator of your application importing ```NGenChartsModule``` from ```@rplaurindo/minimalist-ng-charts```, like that.

```typescript
import { NGenChartsModule } from '@rplaurindo/minimalist-ng-charts';

@NgModule({
    imports: [
        NGenChartsModule
    ]
})
export class MyModule() { }
```

So adds ```"node_modules/@rplaurindo/mathrix.js/extensions/number.js"```, at ```projects.<your-project-name>.architect.build.options.scripts``` of ```angular.json``` or ```"../node_modules/@rplaurindo/mathrix.js/extensions/number.js"``` at ```apps.scripts``` of ```.angular-cli.json```.

## Charts

### Donut

```html
<lib-donut-chart
  [radius]="'<value><unity>'"
  [borderWidth]="'<value><unity>'"
  [sectors]="[
    {
      value: 9,
      ngClass: {
        class-1: <true or false>,
        class-2: <true or false>
      }
    },
    {
      value: 3
    }
  ]"
  [strokeSettings]="{
	width: '<value><unity>',
	bindOn: ['sectors', 'outer', 'inner']
  }"
></lib-donut-chart>
```

