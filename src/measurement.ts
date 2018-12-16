// all types used in the app

const specRegex = /^(\s*(\d+)\s*('))?(\s*(\d+)\s*((\/)\s*(\d+)\s*)?("))?$/
// see https://regexper.com/#%5E%28%5Cs*%28%5Cd%2B%29%5Cs*%28'%29%29%3F%28%5Cs*%28%5Cd%2B%29%5Cs*%28%28%5C%2F%29%5Cs*%28%5Cd%2B%29%5Cs*%29%3F%28%22%29%29%3F%24

enum MatchIndex {
  WholeFeet = 2,
  FeetMarker = 3,
  WholeInch = 5,
  Fraction = 7,
  FractionalInch = 8,
  InchMarker = 9
}

export class Measurement {
  private wholeInches: number
  private fractionalInchesNumerator: number
  private fractionalInchesDenominator: number
  private hasFraction: boolean;

  constructor (spec: string) {
    const m = spec.match(specRegex);
    if (!m || (!m[MatchIndex.FeetMarker] && !m[MatchIndex.InchMarker])) {
      throw new Error("Invalid measurement");
    }

    this.wholeInches = 0;
    this.fractionalInchesNumerator = 0;
    this.fractionalInchesDenominator = 0;
    this.hasFraction = false;

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
    return this.wholeInches + fractionalValue;
  }

  public get floatValueInFeet() {
    return this.floatValueInInches / 12;
  }
}
