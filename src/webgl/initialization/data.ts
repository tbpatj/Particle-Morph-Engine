import { DefaultedWrapperOptions } from "../../types";
import { GLData } from "../../types/webgl";

export const getGLData = (
  width: number,
  height: number,
  options: DefaultedWrapperOptions
) => {
  const data: GLData = {};
  createVertexData(data);
  createOffsetVelocities(data, width, height, options.particleCount);
  createDestData(data, options.particleCount);
  createColorDataWDest(data, options.particleCount);
  createRadiusData(data, options.particleCount);
  createLifetimeData(data, options.particleCount);
  return data;
};

const createVertexData = (dataObj: GLData) => {
  const verts = new Float32Array([0, -0.01]);
  //dividing by 2 because that's the kind of vec it is a vec2
  dataObj["verts"] = {
    instances: verts.length / 2,
    data: verts,
  };
};

const createDestData = (dataObj: GLData, instances: number) => {
  const dest = new Float32Array(3 * instances);
  for (let i = 0; i < instances * 3; i += 3) {
    dest[i] = 0;
    dest[i + 1] = 0;
    dest[i + 2] = -1.0; //the third index defines what group the particle belongs to
  }
  dataObj.dest = {
    instances,
    data: dest,
  };
};

const createColorDataWDest = (dataObj: GLData, instances: number) => {
  const color = new Float32Array(4 * instances);
  const colorDest = new Float32Array(4 * instances);
  for (let i = 0; i < instances * 4; i += 4) {
    color[i] = 0;
    color[i + 1] = 0;
    color[i + 2] = 0;
    color[i + 3] = 0.9;

    colorDest[i] = 0;
    colorDest[i + 1] = 0;
    colorDest[i + 2] = 0;
    colorDest[i + 3] = 0.4;
  }
  dataObj.color = {
    instances,
    data: color,
  };
  dataObj.dest_color = {
    instances,
    data: colorDest,
  };
};

const createRadiusData = (data: GLData, instances: number) => {
  const radius = new Float32Array(instances);
  for (let i = 0; i < instances; i++) {
    radius[i] = i / 4 < 1000 ? Math.random() * 2 + 1 : 0; //radius
  }
  data.radius = {
    instances,
    data: radius,
  };
};

const createLifetimeData = (data: GLData, instances: number) => {
  const lifetime = new Float32Array(instances);
  for (let i = 0; i < instances; i++) {
    lifetime[i] = -1; //lifetime
  }
  data.lifetime = {
    instances,
    data: lifetime,
  };
};

const createOffsetVelocities = (
  dataObj: GLData,
  width: number,
  height: number,
  instances: number
) => {
  //technically we don't need to initialize these arrays... but we will for now
  const offset_vels = new Float32Array(4 * instances);
  for (let i = 0; i < instances * 4; i += 4) {
    const option = Math.round(Math.random() * 3);
    offset_vels[i] = Math.random() * width; //x-offset
    offset_vels[i + 1] = Math.random() * height; //y-offset
    offset_vels[i + 2] = Math.random() * 0.2 - 0.1;
    offset_vels[i + 3] = Math.random() * 0.2 - 0.1;
    // offset_vels[i] = 0; //x-offset
    // offset_vels[i + 1] = 0; //y-offset
    // offset_vels[i + 2] = 0;
    // offset_vels[i + 3] = 0;
    // if (option === 0) offset_vels[i] = Math.random() * width;
    // if (option === 1) {
    //   offset_vels[i] = width;
    //   offset_vels[i + 1] = Math.random() * height;
    // }
    // if (option === 2) offset_vels[i + 1] = Math.random() * height;
    // if (option === 3) {
    //   offset_vels[i] = Math.random() * width;
    //   offset_vels[i + 1] = height;
    // }
  }
  dataObj.offset_vels = {
    instances,
    data: offset_vels,
  };
};
