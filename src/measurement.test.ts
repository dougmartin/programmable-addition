import { Measurement } from "./measurement";

// have to add because CRA sets --isolatedModules to true
export default undefined

it('fails on empty specs', () => {
  expect(() => {
    new Measurement(``)
  }).toThrowError("Invalid measurement")
})

it('fails on unitless specs', () => {
  expect(() => {
    new Measurement(`24`)
  }).toThrowError("Invalid measurement")
})

it('parses whole feet', () => {
  const m = new Measurement(`24'`)
  expect(m.floatValueInInches).toBe(24*12)
  expect(m.floatValueInFeet).toBe(24)
})

it('parses whole inches', () => {
  const m = new Measurement(`24"`)
  expect(m.floatValueInInches).toBe(24)
  expect(m.floatValueInFeet).toBe(2)
})

it('parses whole feet and inches', () => {
  const m = new Measurement(`24' 24"`)
  expect(m.floatValueInInches).toBe((24*12)+24);
  expect(m.floatValueInFeet).toBe(26)
})

it('parses fractional inches', () => {
  const m = new Measurement(`1/2"`)
  expect(m.floatValueInInches).toBe(0.5);
  expect(m.floatValueInFeet).toBeCloseTo(0.04166)
})

it('parses feet plus fractional inches', () => {
  const m = new Measurement(`2' 1/2"`)
  expect(m.floatValueInInches).toBe(24.5);
  expect(m.floatValueInFeet).toBeCloseTo(2.04166)
})