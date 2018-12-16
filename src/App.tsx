import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Scene, { SceneEventArgs } from './scene';
import addition from "./addition"
import './App.css';

const showWorldAxis = (scene: BABYLON.Scene, size: number) => {
  const makeTextPlane = function(text: string, color: string, size: number) {
    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
    const plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    const material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    material.backFaceCulling = false;
    material.specularColor = new BABYLON.Color3(0, 0, 0);
    material.diffuseTexture = dynamicTexture;
    plane.material = material;
    return plane;
  };
  const axisX = BABYLON.Mesh.CreateLines("axisX", [
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
  axisX.color = new BABYLON.Color3(1, 0, 0);
  const xChar = makeTextPlane("x", "red", size / 10);
  xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
  const axisY = BABYLON.Mesh.CreateLines("axisY", [
      BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
      ], scene);
  axisY.color = new BABYLON.Color3(0, 1, 0);
  const yChar = makeTextPlane("y", "green", size / 10);
  yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
  const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
      BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
      ], scene);
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  const zChar = makeTextPlane("z", "blue", size / 10);
  zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};

class App extends Component {
  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;
    const { earth } = addition.excavation;
    const earthOffset = earth.meshOffset;
    const cameraVector = new BABYLON.Vector3(
      (earth.width.floatValueInInches / 2) + earthOffset.x,
      (earth.height.floatValueInInches / 2) + earthOffset.y,
      (earth.depth.floatValueInInches / 2) + earthOffset.z
    )
    const cameraRadius = Math.max(earth.width.floatValueInInches, earth.depth.floatValueInInches) * 2;
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 3, cameraRadius, cameraVector, scene); // BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // create the addition
    addition.render3d(scene);

    // add the origin sphere
    BABYLON.MeshBuilder.CreateSphere("", {
      diameter: 5
    }, scene);

    // and add the axis
    showWorldAxis(scene, 100);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="scene">
          <Scene onSceneMount={this.onSceneMount} />
        </div>
      </div>
    );
  }
}

export default App;
