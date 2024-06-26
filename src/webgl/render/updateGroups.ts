import { checkHitbox } from "../../groups/checkHitbox";
import { DefaultedWrapperOptions } from "../../types";
import { ParticleGroups } from "../../types/groups";
import { MouseCursor } from "../../types/mouse";
import { GLDeps } from "../../types/webgl";
import m3 from "../../utils/mat3";
import { getGroupSpacialProps } from "../../utils/updateGroups";

export const updateGroups = (
  gl: WebGL2RenderingContext,
  deps: GLDeps,
  groups: ParticleGroups,
  width: number,
  height: number,
  options: DefaultedWrapperOptions,
  mouse: MouseCursor
) => {
  const { uniforms } = deps;
  const groupKeys = Object.keys(groups);
  let matrices: any = new Array(options.maxGroups * 9).fill(0);
  const uniformActions = new Array(options.maxGroups).fill(0);
  const groupRads = new Array(options.maxGroups).fill(0);
  let usedParticles = 0;
  let cursorOverClickable = false;

  for (const key in groupKeys) {
    const groupIndx: any = groupKeys[key];
    const group = groups[groupIndx];
    const { xPos, yPos, rot, scaleX, scaleY, uniformAction, radius } =
      getGroupSpacialProps(group, width, height);

    //basic setting of the group position and offset and rotation and scale
    let translationMatrix = m3.translation(xPos, yPos);
    const rotationMatrix = m3.rotation(rot);
    const scaleMatrix = m3.scaling(scaleX, scaleY);
    // Multiply the matrices.
    let matrix = m3.multiply(translationMatrix, rotationMatrix);
    matrix = m3.multiply(matrix, scaleMatrix);

    const indx = Number(groupIndx) * 9;
    for (let i = 0; i < 9; i++) {
      matrices[indx + i] = matrix[i];
    }
    uniformActions[Number(groupIndx)] = group.enabled ? uniformAction : -2;
    usedParticles = Math.max(usedParticles, group.endIndx);
    groupRads[Number(groupIndx)] = radius;

    //check if the group was clicked on
    if (group.clickCallback) {
      //do a reverse translation for the mouse cursor
      let translationMatrix2 = m3.translation(xPos, yPos);
      const rotationMatrix2 = m3.rotation(-rot);
      const scaleMatrix2 = m3.scaling(1 / scaleX, 1 / scaleY);
      // Multiply the matrices.
      let matrix2 = m3.multiply(translationMatrix2, rotationMatrix2);
      matrix2 = m3.multiply(matrix2, scaleMatrix2);
      if (checkHitbox(matrix2, group, mouse, xPos, yPos)) {
        cursorOverClickable = true;
      }
    }

    //group lifetime updates
    if (uniformAction >= 4 && uniformAction <= 7) {
      if (uniformAction >= 6)
        group.lifetime = radius + options.lifetimeOffsetRng * 1.25;
      else {
        group.lifetime =
          (radius * 10.0 - Math.floor(radius * 10.0)) * 10000000.0 +
          options.lifetimeOffsetRng * 1.25;
      }
    }
    if (group.lifetime && group?.lifetime > 0) {
      group.lifetime -= 1;
    } else if (group.lifetime !== undefined && group.lifetime <= 0) {
      delete groups[groupIndx];
    }
  }

  if (cursorOverClickable) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "default";
  }
  gl.uniform1fv(uniforms.u_matrices.loc, matrices);
  gl.uniform1iv(uniforms.group_actions.loc, uniformActions);
  gl.uniform1fv(uniforms.group_rads.loc, groupRads);
  return Math.max(usedParticles - options.backgroundParticleCount, 0);
};
