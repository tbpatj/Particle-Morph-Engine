import { DefaultedWrapperOptions } from "../types";
import { ParticleGroup, ParticleGroups, StoredRange } from "../types/groups";
import { GLDeps } from "../types/webgl";

//get the last index that we can possibly use, this way we rendering groups on top
export const getAvailableParticleRange = (
  groups: ParticleGroups,
  amountOfParticles: number,
  prtcleCnt: number,
  groupID: number,
  settings: DefaultedWrapperOptions
) => {
  let ranges: StoredRange[] = [];
  let startRange = settings.backgroundParticleCount;
  //go through all the current groups and get all the unassigned particle ranges
  const keys = Object.keys(groups).sort((a: string, b: string) => {
    return groups[Number(a)]?.startIndx > groups[Number(b)]?.startIndx ? 1 : -1;
  });
  for (const i in keys) {
    const key = keys[i];
    const group = groups[Number(key)];
    if (Number(key) === groupID) {
      ranges = [{ startIndx: group.startIndx, endIndx: group.endIndx }];
      startRange = prtcleCnt - 1;
      break;
    }
    ranges.push({ startIndx: startRange, endIndx: group.startIndx });
    startRange = group.endIndx;
  }
  //just add the open space from the last groups ending index to the end of the total particles that we have.
  ranges.push({ startIndx: startRange, endIndx: prtcleCnt - 1 });
  ranges = ranges.filter(
    (v) =>
      v.endIndx - v.startIndx !== 0 &&
      v.endIndx + 1 - v.startIndx >= amountOfParticles
  );
  //if we couldn't find an open spot then we can't add in the new group
  if (ranges.length === 0) return null;
  return {
    startIndx: ranges[0].startIndx,
    endIndx: ranges[0].startIndx + amountOfParticles - 1,
  };
};

export interface GroupSubBufferDataPackage {
  gl: WebGL2RenderingContext;
  deps: GLDeps;
  startIndx: number;
  amountOfParticles: number;
}

//get the maximum amount of groups we can update at a time if we are updating multiple. That way we don't need to do a ton of subbuffer calls
export const getGroupSubBufferRange = (
  groupIds: number[],
  groups: ParticleGroups
) => {
  let ranges = [];
  let startIndx = -1;
  let endIndx = -1;
  for (const i in groupIds) {
    if (groups[groupIds[i]]) {
      const group = groups[groupIds[i]];
      if (startIndx === -1) {
        startIndx = group.startIndx;
        endIndx = group.endIndx;
      } else {
        if (endIndx === group.startIndx) {
          endIndx = group.endIndx;
        } else {
          ranges.push({ startIndx: startIndx, endIndx: endIndx });
          startIndx = group.startIndx;
          endIndx = group.endIndx;
        }
      }
    }
  }
  ranges.push({ startIndx, endIndx });
  return ranges;
};

export const updateGroupSubBuffer = (
  data: GroupSubBufferDataPackage,
  name: string,
  updatedBuffer: Float32Array,
  numComponents: number
) => {
  const { gl, deps, startIndx: indx, amountOfParticles } = data;
  //bind a buffer
  const startIndx = Math.max(0, indx);
  gl.bindBuffer(gl.ARRAY_BUFFER, deps.buffers[`${name}0`].buffer);
  //update the buffer partially
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    numComponents * 4 * startIndx,
    updatedBuffer,
    0,
    amountOfParticles * numComponents
  );
  //repeat for the other buffer, (since we are doing transform feedback buffers we need to of each buffer, mainly the transform feedback ones but yeah)
  gl.bindBuffer(gl.ARRAY_BUFFER, deps.buffers[`${name}1`].buffer);
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    numComponents * 4 * startIndx,
    updatedBuffer,
    0,
    amountOfParticles * numComponents
  );
};
