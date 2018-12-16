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
      width: `32'`,
      depth: `17'`,
      height: `6'`,
      offset: {
        from: earth,
        width: `4'`,
        height: `2'`
      }
    })
    const footings = [
      new Volume({
        width: `2'`,
        depth: `14'`,
        height: `18"`,
        offset: {
          from: hole,
          width: `3'`,
          height: `-18"`
        }
      }),
      new Volume({
        width: `2'`,
        depth: `14'`,
        height: `18"`,
        offset: {
          from: hole,
          width: `26'`,
          height: `-18"`
        }
      }),
      new Volume({
        width: `21'`,
        depth: `2'`,
        height: `18"`,
        offset: {
          from: hole,
          width: `5'`,
          height: `-18"`,
          depth: `12'`
        }
      }),
    ];
    this.excavation = new Excavation({earth, hole, footings})
  }

  render3d(scene: BABYLON.Scene) {
    return this.excavation.render3d(scene)
  }
}

export default new Addition();