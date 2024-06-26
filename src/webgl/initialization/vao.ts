import { GLVAOS } from "../../types/webgl";

export const addGLVao = (
  gl: WebGL2RenderingContext,
  vaos: GLVAOS,
  name: string,
  bind: boolean = true
) => {
  const vao = gl.createVertexArray();
  if (vao)
    vaos[name] = {
      vao,
      associatedProgram: "particles",
      tfbs: [],
      buffers: [],
      name,
    };
  if (bind) gl.bindVertexArray(vao);
};
