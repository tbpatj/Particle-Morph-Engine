class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  subScalar(scalar: number) {
    return new Vector2D(this.x - scalar, this.y - scalar);
  }

  addScalar(scalar: number) {
    return new Vector2D(this.x + scalar, this.y + scalar);
  }

  divScalar(scalar: number) {
    return new Vector2D(this.x / scalar, this.y / scalar);
  }

  mulScalar(scalar: number) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  selfSubScalar(scalar: number) {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  }

  selfAddScalar(scalar: number) {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  selfDivScalar(scalar: number) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  selfMulScalar(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /** returns a new vector object */
  sub(v: Vector2D) {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  /** returns a new vector object */
  add(v: Vector2D) {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  /** returns a new vector object */
  mul(v: Vector2D) {
    return new Vector2D(this.x * v.x, this.y * v.y);
  }

  /** returns a new vector object */
  div(v: Vector2D) {
    return new Vector2D(this.x / v.x, this.y / v.y);
  }

  /** modifies the current vector */
  selfSub(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /** modifies the current vector */
  selfAdd(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  /** modifies the current vector */
  selfDiv(v: Vector2D) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  /** modifies the current vector */
  selfMul(v: Vector2D) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
}

export default Vector2D;
