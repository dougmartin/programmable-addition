import { Excavation } from "./excavation";
import { Volume, Origin } from "./volume";

// have to add because CRA sets --isolatedModules to true
export default undefined

it('works', () => {
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
  expect(ex.earth).toBe(earth);
  expect(ex.hole).toBe(hole);
})