export const createProgram = (
  gl: WebGL2RenderingContext,
  vShader: WebGLShader,
  fShader: WebGLShader,
  transformVaryings?: string[]
) => {
  const program = gl.createProgram();
  if (program) {
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    if (transformVaryings) {
      gl.transformFeedbackVaryings(
        program,
        transformVaryings,
        gl.SEPARATE_ATTRIBS
      );
    }
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;
  }
  if (program) console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
};
