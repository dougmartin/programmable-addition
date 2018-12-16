import { Volume, Origin } from "./volume";

// have to add because CRA sets --isolatedModules to true
export default undefined

it('fails with bad measurements', () => {
    expect(() => {
      const v = new Volume({
        width: `foo`,
        height: `bar`,
        depth: `baz`
      });
    }).toThrowError("Invalid measurement")
})

it('works with unit volumes', () => {
  const v = new Volume({
    width: `1'`,
    height: `1'`,
    depth: `1'`
  });
  expect(v.floatValueInCubicFeet).toBe(1);
  expect(v.floatValueInCubicInches).toBe(12*12*12);
  expect(v.offset).not.toBeDefined();
})

it('works with offset volumes', () => {
  const v = new Volume({
    width: `1'`,
    height: `1'`,
    depth: `1'`,
    offset: {
      from: Origin,
      width: `1"`,
      height: `1"`,
      depth: `1"`,
    }
  });
  expect(v.offset).toBeDefined();
})
