import ColorRGB from "../classes/colorRGB";
import Vector2D from "../classes/vector2D";
import { GroupAction } from "./groups";

export interface CanvasPoint {
  pos: Vector2D;
  color: ColorRGB;
  assignedPxls: number;
}

interface BasicParticleInput {
  xPos?: string;
  yPos?: string;
  rotDeg?: number;
  scaleX?: number;
  scaleY?: number;
  color?: ParticleWrapperGradient | ParticleWrapperColorPattern | string;
  fillOffset?: { x?: number; y?: number };
  filter?: string;
}

/**This method adds a color stop with the given color to the gradient at the given offset. Here 0.0 is the offset at one end of the gradient, 1.0 is the offset at the other end. */
export interface ParticleWrapperGradientColorStop {
  offset: number;
  color: string;
}

export interface ParticleWrapperColorPattern {
  image:
    | HTMLImageElement
    | SVGImageElement
    | HTMLVideoElement
    | HTMLCanvasElement
    | ImageBitmap
    | OffscreenCanvas;
  repetition: "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
}

export interface ParticleWrapperLinearGradient {
  /**The x-axis coordinate of the start point. */
  x0: number;
  /** The y-axis coordinate of the start point.*/
  y0: number;
  /** The x-axis coordinate of the end point. */
  x1: number;
  /** The y-axis coordinate of the end point. */
  y1: number;
  stops: ParticleWrapperGradientColorStop[];
}

export interface ParticleWrapperConicGradient {
  /** The angle at which to begin the gradient, in radians. The angle starts from a line going horizontally right from the center, and proceeds clockwise. */
  startAngle: number;
  /** The x-axis coordinate of the center of the gradient. */
  x: number;
  /** The y-axis coordinate of the center of the gradient. */
  y: number;
  stops: ParticleWrapperGradientColorStop[];
}

export interface ParticleWrapperRadialGradient {
  /**The x-axis coordinate of the start point. */
  x0: number;
  /** The y-axis coordinate of the start point.*/
  y0: number;
  /** The radius of the start circle. Must be non-negative and finite. */
  r0: number;
  /** The x-axis coordinate of the end point. */
  x1: number;
  /** The y-axis coordinate of the end point. */
  y1: number;
  /** The radius of the end circle. Must be non-negative and finite. */
  r1: number;
  stops: ParticleWrapperGradientColorStop[];
}

export type ParticleWrapperGradient =
  | ParticleWrapperLinearGradient
  | ParticleWrapperRadialGradient
  | ParticleWrapperConicGradient;

export interface ParticleTextInput extends BasicParticleInput {
  text: string;
  /** defaults to 70px */
  fontSize?: string;
  font?: string;
  fontWeight?: string;
  align?: "left" | "center" | "right" | "start" | "end";
}

export interface ParticleImageInput extends BasicParticleInput {
  image: HTMLImageElement;
  width?: number;
  height?: number;
}

export type ParticleInput = ParticleImageInput | ParticleTextInput;

export interface GroupInput {
  inputs: ParticleInput[];
  xPos?: string;
  yPos?: string;
  rot?: number;
  scaleX?: string;
  scaleY?: string;
  radius?: number;
  allocatedParticles?: number;
  group: number;
  action?: GroupAction;
  enabled?: boolean;
  resPerc?: number;
  shufflePoints?: boolean;
  prtclDstRng?: number;
  removeWhite?: boolean;
  clickCallback?: (coords?: { x: number; y: number }) => void;
}

export interface AddInputGroupOptions {
  teleportParticlesToDest?: boolean;
}

export interface GroupProperties {
  speed?: number;
  maxSpeed?: number;
}

export type ScrollInteractionTypes = "scrollY" | "scrollX" | "scroll" | "none";
