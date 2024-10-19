export const initDPIAndFPS = () => {
  const setDPI = (dpi: number) => {
    if (!particles?.glCE) return;
    const parentElement = particles.glCE.parentElement;
    if (parentElement) {
      particles.glSize.width = parentElement.clientWidth;
      particles.glSize.height = parentElement.clientHeight;
    }
    if (particles.gl && particles.glCE) {
      particles.glCE.width = particles.glSize.width * dpi;
      particles.glCE.height = particles.glSize.height * dpi;
      particles.gl.viewport(
        0,
        0,
        particles.glSize.width * dpi,
        particles.glSize.height * dpi
      );
      if (dpi !== particles.dpi) {
        particles.dpi = dpi;
        particles.lastDPIUpdate = new Date().getTime();
      }
    }
  };
  particles.setDpi = setDPI;
};
