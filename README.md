# Programmable House Addition

The purpose of this app is to explore if I can programmatically define an addition to my house and generate both 3d visualizations and 2d plans from the model it generates.

I've tried many consumer and "pro-sumer" grade 3d home CAD tools and found them both too complex for my needs and at the same time lacking features I need, mostly around the 2d plans that are
generated.

## App Design Guidelines

1. This is **not** a general purpose app nor a interactive design app.  The model points will be determined at load time and the app will simply provide views on those generated points.

2. All elements will be located either in relation to the world origin or a vertex point of an object that ultimately relates to the world origin.

3. All measurements will be in imperial construction units with 1/16 of an inch being the base unit. The measurements will be written as template literals, eg `23' 1/4"`.

4. TypeScript+React and a yet unknown 3d library will be used.  I'm doing this in a browser so that I can easily iterate on the app and so I can share the results.

## Step 1: Setup app

Normally I like to have control of my build setup but for this project I'm just going to use [create-react-app](https://facebook.github.io/create-react-app/).

Since I already had this repo created to write this README setting up the app was easy:

```
cd programming-addition
npx create-react-app .
... wait a crazy amount of time for all the dependencies to resolve..
yarn add typescript @types/node @types/react @types/react-dom @types/jest
... rename src/index.js and src/App.js to .tsx ...
npm start
```

`create-react-app` detected that TypeScript was being used so it created a tsconfig.json file
that I then updated include:

```
"noImplicitAny": true,
"strictNullChecks": true
```

I then restarted `npm start` to insure the `tsconfig.json` changes were picked up.

`create-react-app` also overwrote my README with an expanded version of the following:

### Available Scripts

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Step 2: Create measurement system

I need an imperial measurement system between points defined by strings that allow me to do algebraic operations on two or more measurements with fractional elements and then at the end convert the result to the final float value for whatever 3d models library I choose.  The reason I need to keep things as fractions is something simple as converting 1/2 inch to feet creates a repeating decimal fraction of 0.04166 and the reason I want strings is because it will reduce typing.

After searching npmjs.org I found a few fraction libaries but they were all designed around the fraction being an object with a value.  Instead I want the measurements to be used as relations between either the origin or another point and then have a resolver that can process a set of measurements and produce a final value. Since I couldnt find a match I'm writing my own.

You can find the code in `src/measurement.ts` with tests in `src/measurement.test.ts`.  I took advantage of the Jest VSCode plugin to run and debug the tests within the browser.  An example test that shows the API is:

```
it('parses feet plus fractional inches', () => {
  const m = new Measurement(`2' 1/2"`)
  expect(m.floatValueInInches).toBe(24.5);
  expect(m.floatValueInFeet).toBeCloseTo(2.04166)
})
```


