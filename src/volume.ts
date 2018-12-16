import { Measurement } from "./measurement";
import * as BABYLON from 'babylonjs';

export type OriginType = "origin"
export const Origin: OriginType = "origin";

export interface VolumeOffsetOptions {
  from: Volume | OriginType;
  width?: string;
  height?: string;
  depth?: string;
}

export interface VolumeOptions {
  width: string;
  height: string;
  depth: string;
  offset?: VolumeOffsetOptions
}

export class VolumeOffset {
  public readonly from: Volume | OriginType;
  public readonly width?: Measurement;
  public readonly height?: Measurement;
  public readonly depth?: Measurement;

  constructor (options: VolumeOffsetOptions) {
    const {from, width, height, depth} = options
    this.from = from
    this.width = width ? new Measurement(width) : undefined
    this.height = height ? new Measurement(height) : undefined
    this.depth = depth ? new Measurement(depth) : undefined
  }
}

export class Volume {
  public readonly width: Measurement;
  public readonly height: Measurement;
  public readonly depth: Measurement;
  public readonly offset?: VolumeOffset;

  constructor (options: VolumeOptions) {
    const {width, height, depth} = options;
    this.width = new Measurement(width);
    this.height = new Measurement(height);
    this.depth = new Measurement(depth);
    this.offset = options.offset ? new VolumeOffset(options.offset) : undefined
  }

  get floatValueInCubicInches() {
    return this.width.floatValueInInches * this.height.floatValueInInches * this.depth.floatValueInInches;
  }

  get floatValueInCubicFeet() {
    return this.width.floatValueInFeet * this.height.floatValueInFeet * this.depth.floatValueInFeet;
  }

  toString() {
    return `${this.width.floatValueInInches}" x ${this.height.floatValueInInches}" x ${this.depth.floatValueInInches}"`
  }

  get meshOffset() {
    const {offset} = this;
    const meshOffset = {x: 0, y: 0, z: 0}
    if (offset) {
      const fromOffset = offset.from !== Origin ? offset.from.meshOffset : {x: 0, y: 0, z: 0}
      meshOffset.x = fromOffset.x + (offset.width ? offset.width.floatValueInInches : 0);
      meshOffset.y = fromOffset.y + (offset.height ? offset.height.floatValueInInches : 0);
      meshOffset.z = fromOffset.z + (offset.depth ? offset.depth.floatValueInInches : 0);
    }
    return meshOffset;
  }

  get meshPosition() {
    return {
      x: this.width.floatValueInInches / 2,
      y: this.height.floatValueInInches / 2,
      z: this.depth.floatValueInInches / 2
    }
  }

  createMesh(options?: {faceColors?: BABYLON.Color4[]}) {
    const mesh = BABYLON.MeshBuilder.CreateBox("", {
      width: this.width.floatValueInInches,
      height: this.height.floatValueInInches,
      depth: this.depth.floatValueInInches,
      faceColors: options && options.faceColors
    });
    const position = this.meshPosition;
    const offset = this.meshOffset;
    mesh.position.x = position.x + offset.x;
    mesh.position.y = position.y + offset.y;
    mesh.position.z = position.z + offset.z;
    return mesh;
  }
}