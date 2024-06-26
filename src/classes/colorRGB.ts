interface ColorConstructor {
  R?: number;
  G?: number;
  B?: number;
  A?: number;
}

const shfflClr = (currentVal: number, range: number) => {
  return Math.min(
    Math.max(~~(currentVal + Math.random() * (range / 2) - range / 2)),
    255
  );
};

class ColorRGB {
  R: number;
  G: number;
  B: number;
  A: number;

  constructor({ R = 0, G = 0, B = 0, A = 255 }: ColorConstructor) {
    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;
  }

  toObject() {
    return { R: this.R, G: this.G, B: this.B, A: this.A };
  }

  toObjectWNoise(mod: number) {
    return {
      R: shfflClr(this.R, mod),
      G: shfflClr(this.G, mod),
      B: shfflClr(this.B, mod),
      A: this.A,
    };
  }

  toString() {
    return `rgba(${this.R},${this.G},${this.B},${this.A / 255})`;
  }

  interpolate(c: ColorRGB, mul: number) {
    this.R = c.R + (this.R - c.R) * mul;
    this.G = c.G + (this.G - c.G) * mul;
    this.B = c.B + (this.B - c.B) * mul;
    if (c.A !== this.A) this.A = c.A + (this.A - c.A) * mul;
  }
}

export default ColorRGB;
