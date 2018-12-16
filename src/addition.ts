import { Excavation } from "./excavation";
import { Volume, Origin } from "./volume";
import * as BABYLON from 'babylonjs';

class Addition {
  readonly excavation: Excavation;

  constructor() {
    const earth = new Volume({
      width: `40'`,
      depth: `22'`,
      height: `8'`,
      offset: {
        from: Origin,
        width: `-10'`,
        height: `-8'`
      }
    })
    const hole = new Volume({
      width: `20'`,
      depth: `17'`,
      height: `6'`,
      offset: {
        from: earth,
        width: `10'`,
        height: `2'`
      }
    })
    this.excavation = new Excavation({earth, hole})
  }

  render3d(scene: BABYLON.Scene) {
    return this.excavation.render3d(scene)
  }
}

export default new Addition();