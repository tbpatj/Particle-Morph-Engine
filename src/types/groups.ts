import { MouseCursor } from "./mouse";

export type ParticleGroups = { [index: number]: ParticleGroup };

export interface StoredRange {
  startIndx: number;
  endIndx: number;
}

/**
 * types include:
 *
 * teleport - move the particles and shift the destination
 *
 * shift - move the destination only
 *
 * move - move the particles only
 *
 * resize - scale the destination and position
 *
 * scale - scale the destination
 *
 * pop - scale just the particles
 *
 *
 * mode is defaulted to set
 */
interface MoveActions {
  type: "dest" | "point" | "both";
  mode?: "shift" | "set";
  x: number;
  y: number;
}

export interface GroupAction {
  type: "dest" | "point" | "both";
  mode?: "shift" | "set";
  xPos?: string;
  yPos?: string;
  scaleX?: string;
  scaleY?: string;
  rot?: number;
  radius?: number;
}

export interface GroupIndividualAction {
  type: "bothIndividual";
  pMode?: "shift" | "set";
  pXPos?: string;
  pYPos?: string;
  pScaleX?: string;
  pScaleY?: string;
  pRot?: number;
  dMode?: "shift" | "set";
  dXPos?: string;
  dYPos?: string;
  dScaleX?: string;
  dScaleY?: string;
  dRot?: number;
  radius?: number;
}

export interface HitBox {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export interface GroupEvent {
  group: ParticleGroup;
  groupKey: string;
}

export interface PMouseEvent {
  //the coords within the bounds of the group where the mouse was clicked, so if it was clicked in the center of the hitbox it would be x: 0, y: 0
  coords: { x: number; y: number };
  mouse: MouseCursor;
}

export type GroupMouseEvent = GroupEvent & PMouseEvent;

export interface ParticleGroup extends StoredRange {
  xPos: string;
  yPos: string;
  scaleX: string;
  scaleY: string;
  rot: number;
  enabled: boolean;
  radius: number;
  lifetime?: number;
  action?: GroupAction | GroupIndividualAction;
  hitbox: HitBox;
  held: boolean;
  dragging: boolean;
  lastMouseEvent?: PMouseEvent;
  clickCallback?: (props?: GroupMouseEvent) => void;
  clickUpCallback?: (props?: GroupMouseEvent) => void;
  onDragStart?: (props?: GroupMouseEvent) => void;
  onDragEnd?: (props?: GroupMouseEvent) => void;
  onDrag?: (props?: GroupMouseEvent) => void;
}
