import { GLDeps } from "../../types/webgl";

export const updateBuffers = (gl: WebGL2RenderingContext, deps: GLDeps) => {
  // const { updatedBuffers } = deps;
  // for (let i = 0; i < updatedBuffers.length; i++) {
  //   const bufferName = updatedBuffers[i];
  //   const bufferObj = deps.buffers[bufferName];
  //   const { buffer, numComponents, divisor, loc, data, type, drawType } =
  //     bufferObj;
  //   //update the float 32 array buffers
  //   if (type === "Float32Array") {
  //     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  //     gl.enableVertexAttribArray(loc);
  //     gl.vertexAttribPointer(loc, numComponents, gl.FLOAT, false, 0, 0);
  //     gl.bufferData(gl.ARRAY_BUFFER, data, drawType);
  //     if (divisor) {
  //       gl.vertexAttribDivisor(loc,1)
  //     }
  //   }
  // }
};
