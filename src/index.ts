import { initParticles } from "./particles/init";
import { DEFAULT_OPTIONS } from "./options";
import { ParticleGlobalController } from "./types";
import { GroupAction, GroupIndividualAction } from "./types/groups";
import { GroupInput } from "./types/particleReader";
import { initialMouseCursorObject } from "./types/mouse";
import { startLoop } from "./particles/start";
import { CanvasPointData } from "./canvasReader/canvasReading";
import { loadImageURL } from "./utils/loadImage";

globalThis.particles = {
  deleteAllGroups: (useGroupLifetime?: boolean) =>
    console.error("Particles not initialized"),
  setGroupLifetime: (groupIds: number[], lifetime: number, offset?: number) =>
    console.error("Particles not initialized"),
  addFromPoints: (points: CanvasPointData, gInput: GroupInput) =>
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
  loadImageURL: loadImageURL,
  loop: () => console.error("Particles not initialized"),
  enabled: false,
  ready: false,
  gl: null,
  glCE: null,
  glReady: false,
  glSize: { width: window.innerWidth, height: window.innerHeight },
  readerCE: null,
  ctx: null,
  readerSize: { width: 0, height: 0 },
  pGroups: {},
  options: DEFAULT_OPTIONS,
  mouse: initialMouseCursorObject,
  dpi: window.innerWidth < 1000 ? window.devicePixelRatio || 1 : 1,
  lastDPIUpdate: new Date().getTime(),
} as ParticleGlobalController;
