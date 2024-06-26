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
  clickCallback?: (coords?: { x: number; y: number }) => void;
}
