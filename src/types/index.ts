import { CanvasPointData } from "../canvasReader/canvasReading";
import {
  AddFromPoints,
  DeleteAllGroups,
  DisableGroups,
  EnableGroups,
  SetGroupLifetime,
} from "./groupController";
import { GroupAction, GroupIndividualAction, ParticleGroups } from "./groups";
import { MouseCursor } from "./mouse";
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

export interface WrapperOptions extends OptionalWrapperOptions {
  resolutionPercent: number;
  mapParticlesToClosestPoint: boolean;
  particleCount: number;
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

export interface OptionalWrapperOptions {
  /** what percent the wrapper scans an "image" and returns back to be processed to assign particles to */
  resolutionPercent?: number;
  /** when a new "image" is allocated, the particles will choose for the most part to go to the closest destination. */
  mapParticlesToClosestPoint?: boolean;
  /** amount of particles spawned in at initialization */
  particleCount?: number;
  /** The amount of background particles just passively being updated and actively drawn at one time */
  backgroundParticleCount?: number;
  /** creates an offset from the original pxl point that a particle is destined to go to*/
  prtclDstRng?: number;
  /** use a more precise method of calculating which particles the mouse has touched, can be slightly more intensive so turn off if optimizing */
  usePreciseMouseDetection?: boolean;
  /** the distance from the cursor with which things interact */
  mouseInteractionFieldDistance?: number;
  /** the intensity of the interaction with the mouse cursor */
  mouseInteractionFieldIntensity?: number;
  mouseInteractionType?: MouseInteractionTypes;
  /** the distance from the cursor with which things interact when clicked */
  mouseClickInteractionFieldDistance?: number;
  /** the intensity of the interaction with the mouse cursor when clicked */
  mouseClickInteractionFieldIntensity?: number;
  mouseClickInteractionType?: MouseInteractionTypes;
  /** determines how the particles interact when they reach the edge  */
  edgeInteractionType?: EdgeInteractionMethods;
  /** how bouncy the edge is if bounce is enabled */
  edgeRestitution?: number;
  /** use particle queue */
  useParticleQueue?: boolean;
  /** scroll type for the particles */
  particleScrollType?: ScrollInteractionTypes;
  /** the random offset of a set lifetime assigned to a particle */
  lifetimeOffsetRng?: number;
  /** max amount of groups that can be used I have to allocate uniform space for this thats why it's fixed */
  maxGroups?: number;
}

export interface DefaultedWrapperOptions {
  resolutionPercent: number;
  mapParticlesToClosestPoint: boolean;
  particleCount: number;
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
  addFromPoints: AddFromPoints;
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
  addFromPoints: (points: CanvasPointData, gInput: GroupInput) => {},
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
  /** size of the gl window */
  glSize: { width: number; height: number };
}

export interface CanvasReader {
  readerCE: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  readerSize: { width: number; height: number };
}

export interface ParticleOptions {
  /** all of the options for the particles including how much to display how to be controlled, and a whole bunch of other settings */
  options: WrapperOptions;
}

export interface Mouse {
  mouse: MouseCursor;
}

export interface RenderLoop {
  animFrameCBNum: number;
  loop: () => void;
}

export interface ParticleGroupsList {
  pGroups: ParticleGroups;
}

export interface DPIAndFPS {
  /** options to set the device pixel ratio, by default finds the devices default pixel ratio if not sets to 1 */
  dpi: number;
  lastDPIUpdate: number;
  fps: number;
  setDpi: (dpi: number) => void;
}

export interface WrapperControlFuncs {
  /** start the loop for the particles */
  start: () => void;
  /**
   * Initialize the particle system, it will create two canvas elements as children of the passed in div element. And initialize them with the proper functions to get the particle system started.
   * @param particleContainerId - the id of the div which will contain the particles
   * @param options - the options for the particle system, here is another location where you can override the default particle options
   * @returns true if the particle system was able to be initialized, false if it was not able to be initialized. Odds are it will throw an error first if it can't
   */
  init: (
    particleContainerId: string,
    options?: OptionalWrapperOptions
  ) => boolean;
}

export interface Util {
  loadImageURL(url: string): Promise<HTMLImageElement>;
}

export type ParticleGlobalController = ParticleController &
  GLRendering &
  CanvasReader &
  WrapperControlFuncs &
  ParticleGroupsList &
  ParticleOptions &
  Mouse &
  RenderLoop &
  DPIAndFPS &
  Util;
