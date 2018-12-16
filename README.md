# Programmable House Addition

The purpose of this app is to explore if I can programmatically define an addition to my house and
generate both 3d visualizations and 2d plans from the model it generates.

I've tried many consumer and "pro-sumer" grade 3d home CAD tools and found them both too complex
for my needs and at the same time lacking features I need, mostly around the 2d plans that are
generated.

## App Design Guidelines

1. This is **not** a general purpose app nor a interactive design app.  The model points will be
determined at load time and the app will simply provide views on those generated points.

2. All elements will be located either in relation to the world origin or a vertex point of an object
that ultimately relates to the world origin.

3. All measurements will be in imperial construction units with 1/16 of an inch being the base unit.
The measurements will be written as template literals, eg `23' 1/4"`.

4. TypeScript+React and a yet unknown 3d library will be used.  I'm doing this in a browser so that
I can easily iterate on the app and so I can share the results.

