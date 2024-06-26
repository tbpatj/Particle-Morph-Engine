import { GLDeps, TestGLDeps } from "../types/webgl";

export const cleanUpGL = (gl: WebGL2RenderingContext, deps: GLDeps) => {
  // gl.deleteBuffer(deps.buffers)
  gl.clear(gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  console.log(deps);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  for (const name in deps.tfbs) {
    const tfb = deps.tfbs[name].tfb;
    gl.deleteTransformFeedback(tfb);
  }
  for (const name in deps.buffers) {
    const buffer = deps.buffers[name];
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, 1, buffer.drawType);
    gl.deleteBuffer(buffer.buffer);
  }
  gl.bindVertexArray(null);
  for (const name in deps.vaos) {
    const vao = deps.vaos[name];
    gl.deleteVertexArray(vao.vao);
  }
  gl.useProgram(null);
  for (const name in deps.programs) {
    const program = deps.vaos[name];
    gl.deleteProgram(program);
  }
  for (const name in deps.data) {
    const data = deps.data[name];
    delete deps.data[name];
  }
};
