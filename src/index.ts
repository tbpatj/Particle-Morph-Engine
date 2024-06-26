import { initParticles } from "./particles/init";
import { DEFAULT_OPTIONS } from "./options";
import { ParticleGlobalController } from "./types";
import { GroupAction, GroupIndividualAction } from "./types/groups";
import { GroupInput } from "./types/particleReader";
import { initialMouseCursorObject } from "./types/mouse";
import { startLoop } from "./particles/start";

globalThis.particles = {
  deleteAllGroups: (useGroupLifetime?: boolean) =>
    console.error("Particles not initialized"),
  setGroupLifetime: (groupIds: number[], lifetime: number, offset?: number) =>
    console.error("Particles not initialized"),
  enableGroups: (groupIds: number[]) =>
    console.error("Particles not initialized"),
  addInputGroup: (gInput: GroupInput) =>
    console.error("Particles not initialized"),
  disableGroups: (groupIds: number[]) =>
    console.error("Particles not initialized"),
  groupAction: (action: GroupAction | GroupIndividualAction, group: number) =>
    console.error("Particles not initialized"),
  init: initParticles,
  start: startLoop,
  enabled: false,
  ready: false,
  gl: null,
  glCE: null,
  glReady: false,
  pGroups: {},
  options: DEFAULT_OPTIONS,
  mouse: initialMouseCursorObject,
} as ParticleGlobalController;

console.log(particles);
