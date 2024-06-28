import { initCanvasReader } from "../canvasReader/init";
import { initDPIAndFPS } from "../dpiAndFps/init";
import { initGroups } from "../groups/init";
import { cleanUpMisc, initMisc } from "../misc/initMisc";
import { OptionalWrapperOptions } from "../types";
import { cleanUpGL } from "../webgl/cleanup";
import { initalizeGLRenderingContext } from "../webgl/init";
import { inititalizeGLDependencies } from "../webgl/initialization/dependencies";
import { loop } from "./loop";
import { cleanUpMouse, initMouse } from "./mouse/mouse";

export const initParticles = (
  particleContainer: string,
  iOptions?: OptionalWrapperOptions
) => {
  particles.options = { ...particles.options, ...iOptions };
  //particle renderer
  const pCElem = document.getElementById(particleContainer);
  if (particleContainer === null)
    throw new Error(
      `The particle container element with id: ${particleContainer} was not found.`
    );
  const pCanvas = document.createElement("canvas");
  pCanvas.style.width = "100%";
  pCanvas.style.height = "100%";
  pCElem.appendChild(pCanvas);

  const rCanvas = document.createElement("canvas");
  rCanvas.style.width = "0px";
  rCanvas.style.height = "0px";
  pCElem.appendChild(rCanvas);

  const gl = initalizeGLRenderingContext(pCanvas as HTMLCanvasElement);
  if (gl) {
    particles.gl = gl;
    particles.glCE = pCanvas as HTMLCanvasElement;
    //TODO make it so it doesn't adjust according to the window size, but accordingly to the parent element size

    const parentElement = particles.glCE.parentElement;
    particles.glSize.width = window.innerWidth;
    particles.glSize.height = window.innerHeight;
    if (parentElement) {
      particles.glSize.width = parentElement.clientWidth;
      particles.glSize.height = parentElement.clientHeight;
    }
    const w = particles.glSize.width;
    const h = particles.glSize.height;
    //adjust the canvas element with the dpi of the device or current dpi set by the user
    const cW = w * particles.dpi;
    const cH = h * particles.dpi;
    particles.glCE.width = cW;
    particles.glCE.height = cH;
    particles.gl.viewport(0, 0, cW, cH);
    const deps = inititalizeGLDependencies(gl, particles.options, cW, cH);
    if (deps) {
      particles.glDeps = deps;
      particles.glReady = true;
    } else throw new Error("GLDeps was not able to be created.");
  } else
    throw new Error(
      "WebGL2RenderingContext was not able to be created from the particleCanvasId provided."
    );

  //initialize the canvas reader
  const result = initCanvasReader(rCanvas as HTMLCanvasElement);
  const result2 = initGroups();

  initDPIAndFPS();
  initMouse();
  initMisc();
  particles.loop = loop;

  //TODO add the event listeners for all the needed events, such as window resizing, unmounting, mouse, etc.
  window.addEventListener("beforeunload", () => {
    // Clean up the WebGL instance here
    // For example, you can call a cleanup function or reset any resources used by WebGL
    console.log("cleaning");
    cancelAnimationFrame(particles.animFrameCBNum);
    cleanUpMouse();
    cleanUpGL(particles.gl, particles.glDeps);
    cleanUpMisc();
  });
  particles.ready = true;
  return true;
};
