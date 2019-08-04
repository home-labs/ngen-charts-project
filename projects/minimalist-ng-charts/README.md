# MinimalistNgCharts

## Requirements

>- Angular 5 or higher.

## Installing

	$ npm i minimalist-ng-charts --save

## Usage

Include the module into ```imports``` metadata key of ```NgModule``` decorator of your application importing ```MinimalistNgChartsModule``` from ```minimalist-ng-charts```, like that.

```typescript
import { MinimalistNgChartsModule } from 'minimalist-ng-charts';

@NgModule({
    imports: [
        MinimalistNgChartsModule
    ]
})
export class MyModule() { }
```

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

