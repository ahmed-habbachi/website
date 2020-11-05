---
title: integrating ngrid step by step
date: 2020-09-14 17:20:28
category: Developement
tags: [Angular]
featuredImage: ./ASP-NET-Core-Banner.png
published: false
---

## ngrid

First thing first we should started by installing some packages:

```shell
npm i @pebula/ngrid
npm install @angular/cdk-experimental
npm install resize-observer-polyfill --save-dev
```

to style it i added @import '@pebula/ngrid/themes/default-light.css'; to your general .scss file

After installation the very first thing that we need to do is to add "PblNgridModule" to the module imports, this alone could do the trick to be able to show ngrid in your page. One of the best thing in ngrid is its cell type definition you can add as many as you want to the grid and a good habit is to create a common table template as angular component and add all your cell type definition there, like date, date-time default formatting and star ratings like following:

```html
<div *pblNgridCellTypeDef="'datetime'; value as value;">{{value | date: 'dd MMM, yyyy HH:mm'}}</div>
<div *pblNgridCellTypeDef="'date'; value as value;">{{value | date: 'dd MMM, yyyy'}}</div>
<div *pblNgridCellTypeDef="'starRatings'; value as value">
  {{ value >= 1 ? '★' : '☆' }}
  {{ value >= 2 ? '★' : '☆' }}
  {{ value >= 3 ? '★' : '☆' }}
  {{ value >= 4 ? '★' : '☆' }}
  {{ value === 5 ? '★' : '☆' }}
</div>
```

then to use this common table template component just add it with the withcommon method:

```typescript
PblNgridModule,
PblNgridModule.withCommon([{component: CommonTableTemplatesComponent}]),
```

if you just want to add cell type definition for one specific grid and not all your project grids you can add these definition as content in the grid itself:

```html
<pbl-ngrid [dataSource]="dataSource" [columns]="columnset">
  //....
  <div *pblNgridCellTypeDef="'settings'; row as hotel">
    <vg-button color="warning" size="sm" icon="wrenchOutlined" (click)="editItem(hotel)"></vg-button>
    <vg-button color="danger" size="sm" icon="trash" (click)="removeItem(hotel)"></vg-button>
  </div>
  //....
</pbl-ngrid>
```

as you can see in the example above I set the the columns input value with a property called columnset which is **PblNgridColumnSet**:

## **columns**

to create and bind columns to the datasource we use the **columnFactory** like the following:

```typescript
public columns: PblNgridColumnSet = columnFactory()
  .table(
    { prop: 'id', sort: true, width: '40px', pIndex: true },
    { prop: 'name', width: '500px', sort: true},
    { prop: 'hasBeachAccess', label: 'has beach access',  sort: true, type: 'visualBool'},
    { prop: 'openingDate', label: 'opening date', type: 'date'},
    { prop: 'category', type: 'starRatings', sort: true},
    { prop: 'settings', label: '', type: 'settings', sort: true},
  ).build()
```

we can add some default settings for all the columns with the default method:

```typescript
public columns: PblNgridColumnSet = columnFactory()
  .default({ width: '20%', reorder: true, resize: true, sort: true})
  .table(
    // .....
    // .....
    // .....
  ).build()
```

head to [ngrid documentation](https://shlomiassaf.github.io/ngrid/concepts/columns/column-model#column-definition) for a full list of properties for the column definition (all the properties are pretty much straight forward)

## dataSource

For the dataSource factory definition we have 2 main scenarios

- Client side: The entire datasource is available in one collection
- Server side: A portion of the datasource is available

### Client side

```typescript
dataSource = createDS<T>()
    .onTrigger((event) => this.getData(event.data.curr))
    .create()
```

The handler provided to the onTrigger method accepts the event and returns `DataSourceOf<T>` (array, promise or observable), the getData method just returns an array in this scenario.

### Server side

not yet covered (will be added soon)
