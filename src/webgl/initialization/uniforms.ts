import { DefaultedWrapperOptions } from "../../types";
import { GLUniforms, UniformType } from "../../types/webgl";

export const initUniforms = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  options: DefaultedWrapperOptions
) => {
  const uniforms: GLUniforms = {};

  const addUniform = (name: string, type: UniformType, initialData?: any) => {
    const uniformLoc = gl.getUniformLocation(program, name);
    if (uniformLoc)
      uniforms[name] = {
        loc: uniformLoc,
        type,
        associatedProgram: "particles",
      };
  };

  //--------- find uniform locations ------------
  addUniform("mpc", "4f");
  addUniform("md", "4f");
  addUniform("md2", "4f");
  addUniform("scroll", "2f");
  addUniform("interaction_props", "4f");
  addUniform("u_resolution", "2f");
  addUniform("u_resolution", "2f");
  addUniform("dt", "f");
  addUniform("u_matrices", "1fv");
  addUniform("group_actions", "1iv");
  addUniform("group_rads", "1fv");
  addUniform("u_time", "1f");
  addUniform("dpi", "1f");
  return uniforms;
};
