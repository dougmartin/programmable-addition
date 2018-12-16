import { Volume } from "./volume";

export interface ExcavationOptions {
  earth: Volume,
  hole: Volume,
  footings: Volume[]
}

export class Excavation {
  readonly earth: Volume;
  readonly hole: Volume;
  readonly footings: Volume[];

  constructor (options: ExcavationOptions) {
    this.earth = options.earth;
    this.hole = options.hole;
    this.footings = options.footings;
  }

  render3d(scene: BABYLON.Scene) {
    const earthMesh = this.earth.createMesh();
    const holeMesh = this.hole.createMesh();
    const footingMeshes = this.footings.map((footing) => footing.createMesh())

    const earthCSG = BABYLON.CSG.FromMesh(earthMesh);
    const holeCSG = BABYLON.CSG.FromMesh(holeMesh);
    const footingCSGs = footingMeshes.map((mesh) => BABYLON.CSG.FromMesh(mesh))

    let excavationCSG = earthCSG.subtract(holeCSG);
    footingCSGs.forEach((footingCSG) => {
      excavationCSG.subtractInPlace(footingCSG);
    })

    const material = new BABYLON.StandardMaterial("material", scene);
    material.emissiveColor = new BABYLON.Color3(0.581, 0.243, 0.059)
    const excavation = excavationCSG.toMesh("excavation", material, scene, true)

    earthMesh.dispose();
    holeMesh.dispose();
    footingMeshes.forEach((mesh) => {
      mesh.dispose()
    })
  }
}