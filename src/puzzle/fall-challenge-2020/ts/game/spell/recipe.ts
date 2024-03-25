export class Recipe {
  static MAX_DELTA_RANGE = 22;

  public delta: number[];

  constructor(tier0?: number, tier1?: number, tier2?: number, tier3?: number) {
    this.delta = [tier0 || 0, tier1 || 0, tier2 || 0, tier3 || 0];
  }

  toString() {
    return this.delta;
  }

  debug() {
    printErr(this.toString());
  }

  public add(tier: number, count: number): void {
    this.delta[tier] += count;
  }

  public getTotal(): number {
    return this.delta
               .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  public getTotalLoss(): number {
    return -this.delta
                .filter(value => value < 0)
                .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  public getTotalGain(): number {
    return this.delta
               .filter(value => value > 0)
               .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  public hashCode(): number {
    return this.delta.reduce(
      (previousValue: number, currentValue: number, currentIndex: number) =>
        previousValue + currentValue * Math.pow(Recipe.MAX_DELTA_RANGE, currentIndex)
    );
  }

  public equals(object: any): boolean {
    if (this === object) {
      return true;
    }

    if (!(object instanceof Recipe)) {
      return false;
    }

    return this.hashCode() === object.hashCode();
  }

  public valueOf() {
    return this.hashCode();
  }
}
