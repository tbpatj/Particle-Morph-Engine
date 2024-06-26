import { DefaultedWrapperOptions } from "../../types";
import { GLBuffers, GLTransformFeedbacks, GLVAO } from "../../types/webgl";

export const initTransformFeedback = (
  gl: WebGL2RenderingContext,
  tfbs: GLTransformFeedbacks,
  buffers: GLBuffers,
  vao: GLVAO,
  nameExtension?: string
) => {
  const tfb = gl.createTransformFeedback();
  let tfbPointer = 0;

  const addBufferToTFB = (name: string) => {
    gl.bindBufferBase(
      gl.TRANSFORM_FEEDBACK_BUFFER,
      tfbPointer,
      buffers[name].buffer
    );
    tfbPointer++;
  };

  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tfb);

  addBufferToTFB("offset_vels" + nameExtension);
  addBufferToTFB("color" + nameExtension);
  addBufferToTFB("radius" + nameExtension);
  addBufferToTFB("lifetime" + nameExtension);

  if (tfb) {
    tfbs["tfb" + nameExtension] = {
      tfb,
      associatedProgram: "particles",
      associatedVAO: vao.name,
    };
    vao.tfbs.push("tfb" + nameExtension);
  }
};
