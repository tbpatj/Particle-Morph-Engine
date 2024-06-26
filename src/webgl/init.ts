export const initalizeGLRenderingContext = (canvas: HTMLCanvasElement) => {
  const gl =
    canvas.getContext("webgl2") ||
    (canvas.getContext("experimental-webgl") as WebGL2RenderingContext | null);
  if (gl) {
    //this sets up the clip space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
  return gl;
};
