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

### Donut

```html
<app-donut-chart
  [percentualLength]="<number>"
  [ray]="'<value><unity>'"
  [strokeWidth]="'<value><unity>'"
  [sectors]="[
    {
      percentualLength: 50,
      ngClass: {
        class-1: <true or false>,
        class-2: <true or false>
      }
    },
    {
      percentualLength: 50
    }
  ]"
></app-donut-chart>
```

