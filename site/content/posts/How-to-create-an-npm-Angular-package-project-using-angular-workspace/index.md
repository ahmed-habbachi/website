---
path: '/How-to-create-an-npm-Angular-package-project-using-angular-workspace'
title: How to create an npm Angular package project using angular workspace
date: 2021-09-20 21:45:00
category: Development
tags: [Angular, npm, library]
featuredImage: ./angular+npm.jpeg
published: true
---

This kind of development environment is intend to create a library and then publish it in npm, the project will contain the library and a demo app to test it during development.

### Creating the solution (library + test app)

Use the Angular CLI to generate a new library skeleton using --create-application=false to avoid creating a regulate application:

```bash
ng new special-project-name --create-application=false
```

change the directory to the newly created solution folder

```bash
cd special-project-name
```

### Creating the library project

after that we need to generate our library, think about a unique library name and use this command to generate it

```bash
ng generate library unique-library-name
```

Angular CLI will create a folder named projects in our solution and inside of it we can find our unique-library-name project, within our project source folder we can find an important file named public_api.ts it exposes our library component and types

> [The exports](https://angular.io/api/core/NgModule#exports) of a @NgModule defines what is exposed to other modules when that module is imported in the imports of another module. The public_api acts as a [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) file for cleaner path imports.

### Creating the test or demo project

again using the Angular CLI (a true life saver) we just have to come up with a demo app name and he will do the rest this time we need the CLI to generate the default application files

```bash
ng generate application unique-library-demo-app
```

at this stage if we take a look to our angular.json file in the root folder we can find that it contains two projects named respectively as we generated them and one have library as projectType and the other has application as projectType, and in the package library the CLI added a new package *ng-packagr* to be used internally to package our library, and without referencing our library in the package dependencies it uses tsconfig.json file where we can locate the paths object which contain a reference to the generated projects, to link our demo app and the library.
To ease your build process add a script in the package.json file (the one located in the root folder) to build your library

```bash
"scripts": {
 ...
 "start": "ng serve unique-library-demo-app",
 "build:lib:watch": "ng build unique-library-name --watch",
 "build:lib": "ng build unique-library-name --prod",
 "build:demo": "ng build unique-library-demo-app",
 ...
}
```

The rest is just your development skills of developing, importing and using your library.

### Publishing your library in npm

First navigate to your library folder under the projects root folder

`cd projects/unique-library-name`

First sign in, You’ll be prompted to enter your username, password, and email address.:

```jsx
npm login
npm publish
```

1. Safety Checks:
    1. `git pull`
    2. `git status`
    3. `npm ci`
    4. `npm test`
2. Prepare the Release:
    1. `npm run build`
3. Update the Changelog
4. Update the Version Number: (major | minor | patch)
    1. `npm version`
    2. `git commit -am '2.0.0'`
    3. `git tag v2.0.0`
5. Publish to npm:
    1. `npm publish`
6. Publish to Git:
    1. `git push`
    2. `git push --tags`
7. Create a GitHub Release (optional)

### Example project

You can take a look to a project that I've created using these steps to generate an npm package and publish it.

[ahmed-habbachi/notification-center](https://github.com/ahmed-habbachi/notification-center)
