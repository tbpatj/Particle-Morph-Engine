import {
  DeleteAllGroups,
  DisableGroups,
  EnableGroups,
  SetGroupLifetime,
} from "./groupController";
import { GroupAction, GroupIndividualAction } from "./groups";
import {
  AddInputGroupOptions,
  GroupInput,
  ParticleInput,
} from "./particleReader";
import { GLDeps } from "./webgl";

export interface DPIRef {
  dpi: number;
  lastUpdate: number;
}

export type EdgeInteractionMethods = "bounce" | "teleport" | "none";

export type MouseInteractionTypes =
  | "none"
  | "drag"
  | "orbit"
  | "explode"
  | "push";

export type ScrollInteractionTypes = "scrollY" | "scrollX" | "scroll" | "none";

export interface DPIOptions {
  /** actual device pixel ratio value */
  current: number;
  /** for optimization sometimes the device pixel ratio is updated automatically. Here is where we store when that last update needed to be pushed */
  lastUpdate: number;
}

export interface WrapperOptions {
  /** what percent the wrapper scans an "image" and returns back to be processed to assign particles to */
  resolutionPercent: number;
  /** when a new "image" is allocated, the particles will choose for the most part to go to the closest destination. */
  mapParticlesToClosestPoint: boolean;
  /** amount of particles spawned in at initialization */
  prtcleCnt: number;
  /** The amount of background particles just passively being updated and actively drawn at one time */
  backgroundParticleCount: number;
  /** creates an offset from the original pxl point that a particle is destined to go to*/
  prtclDstRng: number;
  /** use a more precise method of calculating which particles the mouse has touched, can be slightly more intensive so turn off if optimizing */
  usePreciseMouseDetection: boolean;
  /** the distance from the cursor with which things interact */
  mouseInteractionFieldDistance: number;
  /** the intensity of the interaction with the mouse cursor */
  mouseInteractionFieldIntensity: number;
  mouseInteractionType: MouseInteractionTypes;
  /** the distance from the cursor with which things interact when clicked */
  mouseClickInteractionFieldDistance: number;
  /** the intensity of the interaction with the mouse cursor when clicked */
  mouseClickInteractionFieldIntensity: number;
  mouseClickInteractionType: MouseInteractionTypes;
  /** determines how the particles interact when they reach the edge  */
  edgeInteractionType: EdgeInteractionMethods;
  /** how bouncy the edge is if bounce is enabled */
  edgeRestitution: number;
  /** use particle queue */
  useParticleQueue: boolean;
  /** scroll type for the particles */
  particleScrollType: ScrollInteractionTypes;
  /** the random offset of a set lifetime assigned to a particle */
  lifetimeOffsetRng: number;
  /** max amount of groups that can be used I have to allocate uniform space for this thats why it's fixed */
  maxGroups: number;
  /** options to set the device pixel ratio, by default finds the devices default pixel ratio if not sets to 1 */
  dpi: DPIOptions;
}

export interface DefaultedWrapperOptions {
  resolutionPercent: number;
  mapParticlesToClosestPoint: boolean;
  prtcleCnt: number;
  backgroundParticleCount: number;
  prtclDstRng: number;
  usePreciseMouseDetection: boolean;
  mouseInteractionFieldDistance: number;
  mouseInteractionFieldIntensity: number;
  mouseInteractionType: MouseInteractionTypes;
  mouseClickInteractionFieldDistance: number;
  mouseClickInteractionFieldIntensity: number;
  mouseClickInteractionType: MouseInteractionTypes;
  edgeInteractionType: EdgeInteractionMethods;
  edgeRestitution: number;
  useParticleQueue: boolean;
  particleScrollType: ScrollInteractionTypes;
  lifetimeOffsetRng: number;
  maxGroups: number;
}

export type AddInputGroupFunc = (gInput: GroupInput) => void;

export interface ParticleController {
  deleteAllGroups: DeleteAllGroups;
  setGroupLifetime: SetGroupLifetime;
  enableGroups: EnableGroups;
  disableGroups: DisableGroups;
  addInputGroup: AddInputGroupFunc;
  groupAction: (
    action: GroupAction | GroupIndividualAction,
    group: number
  ) => void;
  ready: boolean;
  enabled: boolean;
}

export const initialParticleController: ParticleController = {
  deleteAllGroups: (useGroupLifetime?: boolean) => {},
  setGroupLifetime: (
    groupIds: number[],
    lifetime: number,
    offset?: number
  ) => {},
  enableGroups: (groupIds: number[]) => {},
  disableGroups: (groupIds: number[]) => {},
  addInputGroup: (gInput: GroupInput) => {},
  groupAction: (
    action: GroupAction | GroupIndividualAction,
    group: number
  ) => {},
  ready: false,
  enabled: true,
};

export interface GLRendering {
  /** graphic library instance used for rendering to the canvas element quickly using webgl */
  gl: WebGL2RenderingContext | null;
  /** graphic library canvas element used for accessing the actual canvas element */
  glCE: HTMLCanvasElement | null;
  /** the webGL dependencies, this includes the buffers and other objects which are created and used throughout the project */
  glDeps: GLDeps | null;
  /** lets the project know when the gl context has been intialized */
  glReady: boolean;
}

export interface ParticleOptions {
  /** all of the options for the particles including how much to display how to be controlled, and a whole bunch of other settings */
  options: WrapperOptions;
}

export interface ParticleInit {
  /** initialize the particles by passing in the id for the actual canvas that renders the particles, and a seperate canvas id for another canvas element (WHICH SHOULD BE HIDDEN) that renders images and other objects to be turned into particles */
  init: (particleCanvasId: string, backgroundCanvasId: string) => void;
}

export type ParticleGlobalController = ParticleController &
  ParticleInit &
  GLRendering &
  ParticleOptions;
