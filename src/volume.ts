import { Measurement } from "./measurement";

export interface VolumeOptions {
  width: string;
  height: string;
  depth: string;
}

export class Volume {
  public readonly width: Measurement;
  public readonly height: Measurement;
  public readonly depth: Measurement;

  constructor (options: VolumeOptions) {
    const {width, height, depth} = options;
    this.width = new Measurement(width);
    this.height = new Measurement(height);
    this.depth = new Measurement(depth);
  }

  get floatValueInCubicInches() {
    return this.width.floatValueInInches * this.height.floatValueInInches * this.depth.floatValueInInches;
  }

  get floatValueInCubicFeet() {
    return this.width.floatValueInFeet * this.height.floatValueInFeet * this.depth.floatValueInFeet;
  }
}