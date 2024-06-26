////----------------------------- GLDEPS -----------------------------

export interface GLDeps {
  programs: GLPrograms;
  data: GLData;
  buffers: GLBuffers;
  vaos: GLVAOS;
  tfbs: GLTransformFeedbacks;
  uniforms: GLUniforms;
  currentVAO: number;
  lastRenderTime: number;
}

export interface TestGLDeps {
  program: WebGLProgram;
  buffers: any[];
  vaos: WebGLVertexArrayObject[];
  tfbs: WebGLTransformFeedback[];
  uniforms: GLUniforms;
  curVao: number;
}
//----------------------------- VAO -----------------------------
export type GLVAOS = { [key: string]: GLVAO };

export interface GLVAO {
  vao: WebGLVertexArrayObject;
  name: string;
  associatedProgram: string;
  buffers: string[];
  tfbs: string[];
}

//----------------------------- PROGRAMS -----------------------------
export type GLPrograms = { [key: string]: GLProgram };

export interface GLProgram {
  program: WebGLProgram;
}

//----------------------------- TRANSFORM FEEDBACKS -----------------------------
export type GLTransformFeedbacks = { [key: string]: GLTransformFeedback };

export interface GLTransformFeedback {
  tfb: WebGLTransformFeedback;
  associatedProgram: string;
  associatedVAO?: string;
}

//----------------------------- BUFFERS -----------------------------
export type GLBuffers = { [key: string]: GLBuffer };

export interface GLBuffer {
  attribLoc: number;
  buffer: WebGLBuffer;
  numComponents: number;
  divisor?: number;
  type: "Float32Array";
  drawType: number;
  associatedVAO?: string;
  associatedProgram: string;
}

//----------------------------- UNIFORMS -----------------------------
export type UniformType =
  | "2f"
  | "3f"
  | "4f"
  | "f"
  | "mat3v"
  | "1fv"
  | "1iv"
  | "1f";

export type GLUniforms = { [key: string]: GLUniform };

export interface GLUniform {
  loc: WebGLUniformLocation;
  type: UniformType;
  data?: any[];
  associatedVAO?: string;
  associatedProgram: string;
}
//----------------------------- DATA -----------------------------
export type GLData = { [key: string]: GLDataObject };

interface GLDataObject {
  data: Float32Array;
  instances: number;
}

export interface GLDataTypes {
  vertCnt?: number;
  instances?: number;
}

export type GLTestData = GLDataTypes & { [key: string]: Float32Array };
