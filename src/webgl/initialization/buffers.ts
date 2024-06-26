import { DefaultedWrapperOptions } from "../../types";
import { GLBuffer, GLBuffers, GLData, GLVAO } from "../../types/webgl";

export const initBuffers = (
  gl: WebGL2RenderingContext,
  buffers: GLBuffers,
  data: GLData,
  VAO: GLVAO,
  nameExtension?: string
) => {
  let vertexAttribArray = 0;

  //create buffer function
  const createBuffer = (
    name: string,
    numComponents: number,
    drawType: number,
    divisor?: number
  ) => {
    //create and bind the buffer with it's data and attribs
    //TODO make sure we can create the buffer when a vbo is bound.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data[name].data, drawType);
    gl.vertexAttribPointer(
      vertexAttribArray,
      numComponents,
      gl.FLOAT,
      false,
      0,
      0
    );
    gl.enableVertexAttribArray(vertexAttribArray);
    //enable a divisor for instanced geometry
    if (divisor) gl.vertexAttribDivisor(vertexAttribArray, divisor);
    if (buffer) {
      buffers[name + nameExtension] = {
        buffer,
        numComponents: numComponents,
        attribLoc: vertexAttribArray,
        divisor,
        drawType,
        type: "Float32Array",
        associatedProgram: "particles",
        associatedVAO: VAO.name,
      };
      //add the buffer into the current vao
      VAO.buffers.push(name + nameExtension);
    }
    vertexAttribArray++;
  };

  //create the buffers
  createBuffer("verts", 2, gl.STATIC_DRAW);
  createBuffer("offset_vels", 4, gl.DYNAMIC_COPY, 1);
  createBuffer("dest", 3, gl.DYNAMIC_COPY, 1);
  createBuffer("color", 4, gl.DYNAMIC_COPY, 1);
  createBuffer("dest_color", 4, gl.DYNAMIC_COPY, 1);
  createBuffer("radius", 1, gl.DYNAMIC_COPY, 1);
  createBuffer("lifetime", 1, gl.DYNAMIC_COPY, 1);

  //unbind the buffers
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
