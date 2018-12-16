import { Measurement } from "./measurement";

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
}