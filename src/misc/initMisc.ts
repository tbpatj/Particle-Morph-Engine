const adjustSize = () => {
  if (particles.gl && particles.glCE) {
    particles.glCE.width = window.innerWidth * particles.dpi;
    particles.glCE.height = window.innerHeight * particles.dpi;
    particles.gl.viewport(
      0,
      0,
      window.innerWidth * particles.dpi,
      window.innerHeight * particles.dpi
    );
  }
  if (particles.ctx && particles.readerCE) {
    particles.readerCE.width = window.innerWidth * particles.dpi;
    particles.readerCE.height = window.innerHeight * particles.dpi;
    particles.readerSize.width = particles.readerCE.width;
    particles.readerSize.height = particles.readerCE.height;
  }
};

const handleWindowVisibility = (e: any) => {
  if (particles.enabled) {
    if (document.visibilityState === "visible") {
      if (particles.glDeps) {
        //update the last render time, that way it isn't like 20 seconds since last render and it doesn't move the particles all around the screen trying to compensate
        particles.glDeps.lastRenderTime = performance.now();
        particles.loop();
      }
    } else {
      cancelAnimationFrame(particles.animFrameCBNum);
    }
  }
};

export const initMisc = () => {
  window.addEventListener("visibilitychange", handleWindowVisibility);
  window.addEventListener("resize", adjustSize);
};

export const cleanUpMisc = () => {
  window.removeEventListener("resize", adjustSize);
  window.removeEventListener("visibilitychange", handleWindowVisibility);
};
