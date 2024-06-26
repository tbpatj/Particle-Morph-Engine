import {
  EdgeInteractionMethods,
  MouseInteractionTypes,
  WrapperOptions,
} from "./types";

export const DEFAULT_RESOLUTION_PERCENT = 50;
// export const DEFAULT_RESOLUTION_PERCENT = 100;
export const DEFAULT_PRTCL_CNT = 50000;
export const DEFAULT_BACKGROUND_PARTICLE_COUNT = 500;
export const DEFAULT_PRTCL_DST_RNG = 0.5;
// export const DEFAULT_PRTCL_DST_RNG = 0;
export const DEFAULT_MAP_PARTICLES_TO_CLOSEST_POINT = false;
export const DEFAULT_USE_PRECISE_MOUSE_DETECTION = true;
export const DEFAULT_MOUSE_INTERACTION_FIELD_DISTANCE = 10000;
export const DEFAULT_MOUSE_INTERACTION_FIELD_INTENSITY = 10;
export const DEFAULT_MOUSE_INTERACTION_TYPE: MouseInteractionTypes = "drag";
export const DEFAULT_MOUSE_CLICK_INTERACTION_TYPE: MouseInteractionTypes =
  "orbit";
export const DEFAULT_MOUSE_CLICK_INTERACTION_FIELD_DISTANCE = 10000;
export const DEFAULT_MOUSE_CLICK_INTERACTION_FIELD_INTENSITY = 0.003;
export const DEFAULT_EDGE_INTERACTION_TYPE: EdgeInteractionMethods = "teleport";
export const DEFAULT_EDGE_RESTITUTION = 0.8;
export const DEFAULT_USE_PARTICLE_QUEUE = true;
export const DEFAULT_PARTICLE_SCROLL_TYPE = "scrollY";
export const DEFAULT_LIFETIME_OFFSET_RNG = 10;
export const DEFAULT_MAX_GROUPS = 10;

export const DEFAULT_OPTIONS: WrapperOptions = {
  resolutionPercent: DEFAULT_RESOLUTION_PERCENT,
  prtcleCnt: DEFAULT_PRTCL_CNT,
  backgroundParticleCount: DEFAULT_BACKGROUND_PARTICLE_COUNT,
  mapParticlesToClosestPoint: DEFAULT_MAP_PARTICLES_TO_CLOSEST_POINT,
  prtclDstRng: DEFAULT_PRTCL_DST_RNG,
  usePreciseMouseDetection: DEFAULT_USE_PRECISE_MOUSE_DETECTION,
  mouseInteractionFieldDistance: DEFAULT_MOUSE_INTERACTION_FIELD_DISTANCE,
  mouseInteractionFieldIntensity: DEFAULT_MOUSE_INTERACTION_FIELD_INTENSITY,
  edgeInteractionType: DEFAULT_EDGE_INTERACTION_TYPE,
  mouseInteractionType: DEFAULT_MOUSE_INTERACTION_TYPE,
  mouseClickInteractionFieldDistance:
    DEFAULT_MOUSE_CLICK_INTERACTION_FIELD_DISTANCE,
  mouseClickInteractionFieldIntensity:
    DEFAULT_MOUSE_CLICK_INTERACTION_FIELD_INTENSITY,
  mouseClickInteractionType: DEFAULT_MOUSE_CLICK_INTERACTION_TYPE,
  edgeRestitution: DEFAULT_EDGE_RESTITUTION,
  useParticleQueue: DEFAULT_USE_PARTICLE_QUEUE,
  particleScrollType: DEFAULT_PARTICLE_SCROLL_TYPE,
  lifetimeOffsetRng: DEFAULT_LIFETIME_OFFSET_RNG,
  maxGroups: DEFAULT_MAX_GROUPS,
};
