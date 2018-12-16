// all types used in the app

const specRegex = /^(\s*-)?(\s*(\d+)\s*('))?(\s*(\d+)\s*((\/)\s*(\d+)\s*)?("))?$/
// see https://regexper.com/#%5E%28%5Cs*-%29%3F%28%5Cs*%28%5Cd%2B%29%5Cs*%28'%29%29%3F%28%5Cs*%28%5Cd%2B%29%5Cs*%28%28%5C%2F%29%5Cs*%28%5Cd%2B%29%5Cs*%29%3F%28%22%29%29%3F%24

enum MatchIndex {
  Negative = 1,
  WholeFeet = 3,
  FeetMarker = 4,
  WholeInch = 6,
  Fraction = 8,
  FractionalInch = 9,
  InchMarker = 10
}

export class Measurement {
  private negativeMultiplier : number;
  private wholeInches: number
  private fractionalInchesNumerator: number
  private fractionalInchesDenominator: number
  private hasFraction: boolean;

  constructor (spec: string) {
    const m = spec.match(specRegex);
    if (!m || (!m[MatchIndex.FeetMarker] && !m[MatchIndex.InchMarker])) {
      throw new Error("Invalid measurement");
    }

    this.negativeMultiplier = 1;
    this.wholeInches = 0;
    this.fractionalInchesNumerator = 0;
    this.fractionalInchesDenominator = 0;
    this.hasFraction = false;

    if (m[MatchIndex.Negative]) {
      this.negativeMultiplier = -1;
    }
    if (m[MatchIndex.FeetMarker]) {
      this.wholeInches = parseInt(m[MatchIndex.WholeFeet], 10) * 12;
    }
    if (m[MatchIndex.InchMarker]) {
      if (m[MatchIndex.Fraction]) {
        this.hasFraction = true;
        this.fractionalInchesNumerator = parseInt(m[MatchIndex.WholeInch], 10);
        this.fractionalInchesDenominator = parseInt(m[MatchIndex.FractionalInch], 10);
      }
      else {
        this.wholeInches += parseInt(m[MatchIndex.WholeInch], 10);
      }
    }
  }

  public get floatValueInInches() {
    let fractionalValue = 0;
    if (this.hasFraction) {
      fractionalValue = this.fractionalInchesNumerator / this.fractionalInchesDenominator;
    }
    return this.negativeMultiplier * (this.wholeInches + fractionalValue);
  }

  public get floatValueInFeet() {
    return this.floatValueInInches / 12;
  }
}
