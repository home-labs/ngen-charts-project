# MinimalistNgCharts

## Requirements

>- Angular 4 or higher.

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

### Donut Clock

```html
<app-donut-clock-chart
  [classMap]=" {
    'class-1': <true or false>,
    'class-2': <true or false>,
  }"
  [ray]="'<value><unity>'"
  [strokeWidth]="'<value><unity>'"
  [percentualLength]="<number>"
></app-donut-clock-chart>
```

