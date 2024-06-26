export const initDPIAndFPS = () => {
  const setDPI = (dpi: number) => {
    if (particles.gl && particles.glCE) {
      particles.glCE.width = window.innerWidth * dpi;
      particles.glCE.height = window.innerHeight * dpi;
      particles.gl.viewport(
        0,
        0,
        window.innerWidth * dpi,
        window.innerHeight * dpi
      );
      if (dpi !== particles.dpi) {
        particles.dpi = dpi;
        particles.lastDPIUpdate = new Date().getTime();
      }
    }
  };
  particles.setDpi = setDPI;
};
