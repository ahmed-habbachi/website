---
path: '/Create-an-Angular-clean-architecture-solution'
title: Create an Angular clean architecture solution
date: 2021-09-26 21:45:00
category: Development
tags: [Angular, cleanArchitecture]
featuredImage: ./angular-header.jpg
published: true
---

I am amassed how developer split and architect their projects multi repo, mono repo solutions but when ever I see clean architecture I froze and spend more time to think about it and try to analyses the structure and how to separate modules and component concerns.

In this post I'll try to cover the basics to have a starting clean Angular solution, this article will certainly have a follow up or modification in the future, I will keep it updated.

## Prerequisites

This is an Angular project so make sure to have node installed (best advice is to use nvm):

- Node installed and ready to be used
- Angular CLI installed `npm i -g @angular/cli@latest`

## Scaffolding the empty solution

First we need to tell angular to create a new workspace with only structure folders and without creating the application for it

`ng new clean-architecture --create-application false --strict`

- `--create-application false` is to tell angular to not generate
- `--strict` is to strict type checking to catch error ahead of time

after initializing our workspace change directory to it `cd clean-architecture`

## Scaffolding our application

Angular provide a very nice schematics to scaffold our application, all we need to do is to generate application schematics:

`ng g application clean-architecture-app --prefix cat --style scss --routing`

- application are a schematic to generate a basic angular app definition in the projects folder
- `--prefix cat` is to change the application prefix from app (the default prefix) to cat, optional (just to mention that such an option exists)
- `--style scss` is flag to tell angular we want to use .scss files to style our components
- `--routing` to add app-routing to our generated app definition

## The Clean Architecture

Again angular is providing us with a the necessary schematics to scaffold our modules, lets start by creating our core module

`ng g m core` this module will be load at the start with the **AppModule**

`ng g m features/home --route home --module app.module.ts` this is our first lazy loaded feature module we named it **HomeModule**. we will continue on adding our feature modules in the features folder

`ng g m features/back-office --route back-office --module app.module.ts` this is our second lazy loaded feature module **BackOfficeModule**, these two feature are just for demonstration and can be anything depending on your need for sure.

 `ng g m shared` this module **ShredModule** will contain mainly things that are shared across our features.

now lets adjust our dependencies and our imports.

First things first lets start by adding two route paths to our routing

```jsx
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'back-office', loadChildren: () => import('./features/back-office/back-office.module').then(m => m.BackOfficeModule) },
  { path: '**', redirectTo: 'home'}
];
```

now lets do some imports and remove redundant once:

lets start with the AppModule:

```jsx
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

notice we almost deleted everything from there and kept only the **AppRoutingModule** and added the **CoreModule** which will contain the basic imports like the angular common and all required modules to start the app.

lets take a look at the **CoreModule** then:

```jsx
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule],
})
export class CoreModule {}
```

here we imported the two main modules for **BrowserModule** (which also contain the **CommonModule**) and **BrowserAnimationsModule** (this is more optional but thought we will need it anyway later), the **RouterModule** is there because this module will also hold our app layout therefore it will hold our navigation and routing. we will add more to this module a bit later when we will add the library that we will use in our project to help us to better present our controls, views and styles.

for he shared module this will get the most changes as we build our app as most of the feature shares a lot of modules between them and all those modules will be added here lets take a look at it before it gets more bigger:

```jsx
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, RouterModule],
})
export class SharedModule {}
```

for now it only hold the **CommonModule** and the **RouterModule** but the interesting part here is that we also added them to the exports to make them visible for the host module later.

lets review one of the feature module example the **HomeModule** now:

```jsx
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
```

for now it is clean no feature specific import as it has only the **HomeRoutingModule** which is specific to this module that will contain the module sub-routing if ever needed, and like all the other feature module it imports the **SharedModule**, and for now only declares the **HomeComponent**.

We can say now that we have achieved our clean and straight forward architecture (thought every opinionated architecture has its drawback). now we will continue on adding some useful library and add them to our structured modules.

## Adding A UI library

When adding a UI library make sure to import its module in the shared library as mainly all the application layers will benefit from it and no need to load it each time.
