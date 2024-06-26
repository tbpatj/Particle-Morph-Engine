import { DefaultedWrapperOptions } from "../../types";
import {
  GLBuffers,
  GLDeps,
  GLTransformFeedbacks,
  GLVAOS,
} from "../../types/webgl";
import { getFragmentShader } from "../shaders/fragmentShader";
import { getVertexShader } from "../shaders/vertexShader";
import { initBuffers } from "./buffers";
import { getGLData } from "./data";
import { createProgram } from "./program";
import { createShader } from "./shaders";
import { initTransformFeedback } from "./transformFeedback";
import { initUniforms } from "./uniforms";
import { unBindDeps } from "./util";
import { addGLVao } from "./vao";

export const inititalizeGLDependencies = (
  gl: WebGL2RenderingContext,
  options: DefaultedWrapperOptions,
  width: number,
  height: number
) => {
  //initialize the shaders
  const vs = getVertexShader(options);
  const vShader = createShader(gl, gl.VERTEX_SHADER, vs);
  const fs = getFragmentShader(options);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, fs);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  if (vShader && fShader) {
    //initialize the program with the shaders
    const program = createProgram(gl, vShader, fShader, [
      "v_offset_vel",
      "v_p_color",
      "v_radius",
      "v_lifetime",
    ]);
    if (program) {
      const vaos: GLVAOS = {};
      const buffers: GLBuffers = {};
      const tfbs: GLTransformFeedbacks = {};
      const data = getGLData(width, height, options);
      for (let i = 0; i < 2; i++) {
        //create vao
        addGLVao(gl, vaos, `vao${i}`);
        initBuffers(gl, buffers, data, vaos[`vao${i}`], `${i}`);
        initTransformFeedback(gl, tfbs, buffers, vaos[`vao${i}`], `${i}`);
        //unbind the vertex array object
        gl.bindVertexArray(null);
      }
      const uniforms = initUniforms(gl, program, options);
      const programs = { particles: { program } };
      //test for updating some buffer data

      gl.useProgram(program);
      const deps: GLDeps = {
        programs,
        buffers,
        vaos,
        tfbs,
        data,
        uniforms,
        currentVAO: 0,
        lastRenderTime: performance.now(),
      };
      return deps;
    }
  }
  return null;
};
