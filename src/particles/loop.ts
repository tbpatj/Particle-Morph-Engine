import {
  excludeOldMouseEntries,
  removeInitalAndLiftingClicks,
} from "../utils/mouse";
import { webGLLoop } from "../webgl/loop";

export const loop = () => {
  excludeOldMouseEntries(particles.mouse);
  const curTime = new Date().getTime();
  //fps stuff
  // const timeSinceStart = curTime - fpsRef.current.timeStart;
  // if (timeSinceStart > 3000 && timeSinceStart < 12000 && controllerRef) {
  //   if (
  //     fpsRef.current.fps < 35 &&
  //     dpiRef.current.dpi > 1 &&
  //     curTime - dpiRef.current.lastUpdate > 1000
  //   ) {
  //     dpiRef.current.dpi = dpiRef.current.dpi - 0.25;
  //     dpiRef.current.lastUpdate = curTime;
  //     setDpi(dpiRef.current.dpi);
  //   }
  //   if (fpsRef.current.fps < 30) {
  //     setEnabled(false);
  //     cancelAnimationFrame(animationRef.current);
  //     if (glRef.current && glDepsRef.current) {
  //       cleanUpGL(glRef.current, glDepsRef.current);
  //     }
  //     return;
  //   }
  // }
  //render and update here
  if (particles.gl && particles.glDeps) {
    webGLLoop(
      particles.gl,
      particles.glDeps,
      particles.options,
      particles.mouse,
      particles.glCE?.offsetWidth ?? particles.glSize.width,
      particles.glCE?.offsetHeight ?? particles.glSize.height,
      particles.pGroups,
      particles.dpi
    );
  }

  particles.mouse.scrollDY = 0;
  // updateFPS();
  removeInitalAndLiftingClicks(particles.mouse);
  if (particles.enabled) {
    particles.animFrameCBNum = requestAnimationFrame(loop);
  }
};
