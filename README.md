# Programmable House Addition

The purpose of this app is to explore if I can programmatically define an addition to my house and generate both 3d visualizations and 2d plans from the model it generates.  The addition that I'm planning is a simple one-story addon to the north side of my [American Foursquare](https://en.wikipedia.org/wiki/American_Foursquare) house.  The addition will be inset from the north wall to make it more visually pleasing.

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

After searching npmjs.org I found a few fraction libaries but they were all designed around the fraction being an object with a value.  Instead I want the measurements to be used as relations between either the origin or another point and then have a resolver that can process a set of measurements and produce a final value. Since I couldnt find a match so I wrote the start of my own library in a few minutes.

You can find the code in `src/measurement.ts` with tests in `src/measurement.test.ts`.  I took advantage of the Jest VSCode plugin to run and debug the tests within the browser.  An example test that shows the API is:

```
it('parses feet plus fractional inches', () => {
  const m = new Measurement(`2' 1/2"`)
  expect(m.floatValueInInches).toBe(24.5);
  expect(m.floatValueInFeet).toBeCloseTo(2.04166)
})
```

## Step 3: Create a (cubic) volume model

Since this **isn't** a general purpose app and I'm not going to have anything but cubic volumes I can model all objects as having 8 points and 6 faces.  I'm going to use the model to both generate the points for the final 3d and 2d visualizations and to generate measurements for the amount of dirt that will be removed and concrete that will be poured.

The last time I did any real 3d modeling programming was 1992 in my Computer Graphics class in undergrad so I'm pretty much operating with little knowledge and a limited vocabulary.  I'm sure there are existing 3d libraries I could adapt for the data structure but I want it to use my measurement system so I'm writing my own.  I may regret this when I try interface it with the 3d visualization library I pick but given how easy it is to refactor TypeScript I think I'll be fine.  It took me another few minutes to create the start of the library.

You can find the code in `src/volume.ts` with tests in `src/volume.test.ts`.  An example test that shows the API is:

```
it('works with unit volumes', () => {
  const v = new Volume({
    width: `1'`,
    height: `1'`,
    depth: `1'`
  });
  expect(v.floatValueInCubicFeet).toBe(1);
  expect(v.floatValueInCubicInches).toBe(12*12*12);
})
```

You'll notice I'm using width, height and depth instead of x, y, and z.  This makes sense to me as I'm designing the addition I'm thinking of it in 2d plan view (overhead iew) with the origin being in the top left so width is x, height is y and depth is z.

## Step 4: Create the basement excavation model

Now that I have a measurement system and a volume representation I'll start where all construction projects start: in the ground.  The goal for this step is to create a model of the basement excavation.

Instead of generalizing I'm going to create a class for it for now, maybe it can be refactored as we go on.  I'm going to leave excavation of the basement wall footings until a later step.  I'm also going to not add tests for invalid volumes since this is a one off and I'll see any issues when it is eventually rendered.

I need to be able to in general define relationships between volumes and specifically in the excavation define subtraction of the hole from the earth.  To do this I'm going to add an optional offset parameter to the volume options.  The offset has one or more width, height and depth measurements and also defines what it is offset from, which is either another volumes origin or the world origin.  To enable this I've also created a `OriginType` with value `"origin"` and exported a constant with that value and I've added negative measurements.

You can find the excavation model code in `src/excavation.ts` with tests in `src/excavation.test.ts`.  An example of the API is:

```
  const earth = new Volume({
    width: `40'`,
    height: `40'`,
    depth: `8'`,
    offset: {
      from: Origin,
      width: `-10'`
    }
  })
  const hole = new Volume({
    width: `20'`,
    height: `20'`,
    depth: `6'`,
    offset: {
      from: earth,
      width: `10'`,
      height: `10'`
    }
  })
  const ex = new Excavation({earth, hole})
```

You can also see updated tests for the volumes to handle the offsets and measurements to handle negatives.