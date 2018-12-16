import { VolumeOptions, Volume } from "./volume";

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
}