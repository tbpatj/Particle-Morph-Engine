import { cleanUpGL } from "../webgl/cleanup";
import { initalizeGLRenderingContext } from "../webgl/init";
import { inititalizeGLDependencies } from "../webgl/initialization/dependencies";
import { cleanUpMouse, initMouse } from "./mouse/mouse";

export const initParticles = (
  particleCanvasId: string,
  backgroundCanvasId: string
) => {
  //particle renderer
  const pCanvas = document.getElementById(
    particleCanvasId
  ) as HTMLCanvasElement;

  //background renderer used for rendering images and other elements that are turned into particles
  const rCanvas = document.getElementById(backgroundCanvasId);
  if (pCanvas === null || rCanvas === null)
    throw new Error(
      `One or both canvas elements particleCanvasId: ${particleCanvasId}, and backgroundCanvasId: ${backgroundCanvasId}, not found.`
    );
  if (pCanvas.nodeName !== "CANVAS" || rCanvas.nodeName !== "CANVAS")
    throw new Error(
      `One or both canvas elements found are not of type 'canvas'. ${particleCanvasId}: ${pCanvas.nodeName}, ${backgroundCanvasId}: ${rCanvas.nodeName}`
    );

  const gl = initalizeGLRenderingContext(pCanvas as HTMLCanvasElement);
  if (gl) {
    particles.gl = gl;
    particles.glCE = pCanvas as HTMLCanvasElement;
    //TODO make it so it doesn't adjust according to the window size, but accordingly to the parent element size
    const w = window.innerWidth;
    const h = window.innerHeight;
    //adjust the canvas element with the dpi of the device or current dpi set by the user
    const cW = w * particles.options.dpi.current;
    const cH = h * particles.options.dpi.current;
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

  initMouse();

  //TODO add the event listeners for all the needed events, such as window resizing, unmounting, mouse, etc.
  window.addEventListener("beforeunload", () => {
    // Clean up the WebGL instance here
    // For example, you can call a cleanup function or reset any resources used by WebGL
    console.log("cleaning");
    cancelAnimationFrame(particles.animFrameCBNum);
    cleanUpMouse();
    cleanUpGL(particles.gl, particles.glDeps);
  });
};
