import { Volume } from "./volume";

export interface ExcavationOptions {
  earth: Volume,
  hole: Volume,
}

export class Excavation {
  readonly earth: Volume;
  readonly hole: Volume;

  constructor (options: ExcavationOptions) {
    this.earth = options.earth;
    this.hole = options.hole;
  }

  render3d(scene: BABYLON.Scene) {
    const faceColors = new Array(6);
    faceColors[4] = new BABYLON.Color4(0,1,0,1);   // green front

    const earthMesh = this.earth.createMesh({faceColors});
    const holeMesh = this.hole.createMesh();

    const earthCSG = BABYLON.CSG.FromMesh(earthMesh);
    const holeCSG = BABYLON.CSG.FromMesh(holeMesh);
    const excavationCSG = earthCSG.subtract(holeCSG);
    const material = new BABYLON.StandardMaterial("material", scene);
    material.emissiveColor = new BABYLON.Color3(0.581, 0.243, 0.059)
    const excavation = excavationCSG.toMesh("excavation", material, scene, true)

    earthMesh.dispose();
    holeMesh.dispose();
  }
}