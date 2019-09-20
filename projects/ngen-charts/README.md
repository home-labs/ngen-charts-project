# NGenCharts

## Requirements

>- @angular/core and @angular/common 5 or higher;
>- @rplaurindo/mathrix.ts 1 or higher.

## Installing

	$ npm i @rplaurindo/ngen-charts --save

## Usage

Include the module into ```imports``` metadata key of ```NgModule``` decorator of your application importing ```NGenChartsModule``` from ```@rplaurindo/ngen-charts```, like that.

```typescript
import { NGenChartsModule } from '@rplaurindo/ngen-charts';

@NgModule({
    imports: [
        NGenChartsModule
    ]
})
export class MyModule() { }
```

## Usage

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

