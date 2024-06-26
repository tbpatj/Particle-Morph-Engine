import { GLDeps } from "../../types/webgl";

export const updateUniforms = (gl: WebGLRenderingContext, deps: GLDeps) => {
  // const { updatedUniforms } = deps;
  // for (let i = 0; i < updatedUniforms.length; i++) {
  //   const uniformName = updatedUniforms[i];
  //   if(deps.uniforms){
  //     const uniformObj = deps.uniforms[uniformName];
  //     const { type, loc, data } = uniformObj;
  //     if (type === "2f") {
  //       if (!data?.[0] || !data?.[1])
  //         console.error(
  //           `Uniform ${uniformName} does not have all supplied values`
  //         );
  //       else gl.uniform2f(loc, data?.[0], data?.[1]);
  //     }
  //   }
  // }
};
