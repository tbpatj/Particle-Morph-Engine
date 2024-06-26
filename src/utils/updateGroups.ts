import { ParticleGroup } from "../types/groups";
import { addStringValues, convertStringValue } from "./groupPos";

const getNewAttribute = (
  val: number,
  groupVal: string,
  actionVal: string,
  type: string,
  mode: string | undefined,
  range: number
) => {
  const newVal = convertStringValue(actionVal, range);
  let newGroupVal = groupVal;
  let returnVal = val;
  if (!mode || mode === "shift") {
    returnVal += newVal;
    if (type === "both" || type === "dest" || type === "bothIndividual") {
      newGroupVal = addStringValues(groupVal, actionVal, range);
    }
  } else {
    returnVal = newVal;
    if (type === "both" || type === "dest" || type === "bothIndividual") {
      newGroupVal = actionVal;
    }
  }
  return { returnVal, newGroupVal };
};

export const getGroupSpacialProps = (
  group: ParticleGroup,
  width: number,
  height: number
) => {
  let xPos = convertStringValue(group.xPos, width);
  let yPos = convertStringValue(group.yPos, height);
  let rot = group.rot;
  let scaleX = convertStringValue(group.scaleX, 1);
  let scaleY = convertStringValue(group.scaleY, 1);
  let radius = group.radius;
  //0 - nothing, 1 - moving pos
  let uniformAction = 0;
  if (group.action) {
    const action = group.action;
    if (
      action.type === "both" ||
      action.type === "dest" ||
      action.type === "point"
    ) {
      const { type, mode } = action;
      if (type === "both" || type === "point") uniformAction = 1;

      //any sort of moving translating or that
      if (action?.xPos) {
        const { returnVal, newGroupVal } = getNewAttribute(
          xPos,
          group.xPos,
          action.xPos,
          action.type,
          action.mode,
          width
        );
        group.xPos = newGroupVal;
        xPos = returnVal;
      }

      if (action?.yPos) {
        const { returnVal, newGroupVal } = getNewAttribute(
          yPos,
          group.yPos,
          action.yPos,
          action.type,
          action.mode,
          height
        );
        group.yPos = newGroupVal;
        yPos = returnVal;
      }

      if (action?.rot !== undefined && action?.rot !== null) {
        if (!mode || mode === "shift") {
          rot += (action.rot / 180) * 3.14;
        } else {
          rot = (action.rot / 180) * 3.14;
        }
        if (type === "both" || type === "dest") {
          group.rot = rot;
        }
      }

      if (action?.scaleX) {
        const { returnVal, newGroupVal } = getNewAttribute(
          scaleX,
          group.scaleX,
          action.scaleX,
          action.type,
          action.mode,
          1
        );
        group.scaleX = newGroupVal;
        scaleX = returnVal;
      }

      if (action?.scaleY) {
        const { returnVal, newGroupVal } = getNewAttribute(
          scaleY,
          group.scaleY,
          action.scaleY,
          action.type,
          action.mode,
          1
        );
        group.scaleY = newGroupVal;
        scaleY = returnVal;
      }
      if (action?.radius) {
        if (action.mode === "shift" || !action.mode) {
          radius += action.radius;
          if (action.type === "both" || action.type === "dest") {
            group.radius = radius;
          }
        } else {
          radius = action.radius;
          if (action.type === "both" || action.type === "dest") {
            group.radius = radius;
          }
        }

        if (
          (action?.xPos || action?.yPos) &&
          (action.type === "both" || action.type === "point")
        ) {
          uniformAction = 2;
        } else {
          uniformAction = 3;
        }
      }
    } else if (action.type === "bothIndividual") {
      uniformAction = 1;
      let xPos2 = xPos + 0;
      if (action.pXPos) {
        const { returnVal, newGroupVal } = getNewAttribute(
          xPos,
          group.xPos,
          action.pXPos,
          action.type,
          action.pMode,
          width
        );
        xPos = returnVal;
      }
      if (action.dXPos) {
        const { returnVal, newGroupVal } = getNewAttribute(
          xPos2,
          group.xPos,
          action.dXPos,
          action.type,
          action.dMode,
          width
        );
        group.xPos = newGroupVal;
      }
      let yPos2 = yPos + 0;
      if (action.pYPos) {
        const { returnVal, newGroupVal } = getNewAttribute(
          yPos,
          group.yPos,
          action.pYPos,
          action.type,
          action.pMode,
          height
        );
        yPos = returnVal;
      }
      if (action.dYPos) {
        const { returnVal, newGroupVal } = getNewAttribute(
          yPos2,
          group.yPos,
          action.dYPos,
          action.type,
          action.dMode,
          height
        );
        group.yPos = newGroupVal;
      }
      if (action.dRot !== undefined && action.dRot !== null) {
        let rot2 = rot;
        if (!action.dMode || action.dMode === "shift") {
          rot2 += (action.dRot / 180) * 3.14;
        } else {
          rot2 = (action.dRot / 180) * 3.14;
        }
        group.rot = rot2;
      }
      if (action.pRot !== undefined && action.pRot !== null) {
        if (!action.pMode || action.pMode === "shift") {
          rot += (action.pRot / 180) * 3.14;
        } else {
          rot = (action.pRot / 180) * 3.14;
        }
      }
      let scaleX2 = scaleX + 0;
      if (action.pScaleX) {
        const { returnVal, newGroupVal } = getNewAttribute(
          scaleX,
          group.scaleX,
          action.pScaleX,
          action.type,
          action.pMode,
          1
        );
        scaleX = returnVal;
      }
      if (action.dScaleX) {
        const { returnVal, newGroupVal } = getNewAttribute(
          scaleX2,
          group.scaleX,
          action.dScaleX,
          action.type,
          action.dMode,
          1
        );
        group.scaleX = newGroupVal;
      }
      let scaleY2 = scaleY + 0;
      if (action.pScaleY) {
        const { returnVal, newGroupVal } = getNewAttribute(
          scaleY,
          group.scaleY,
          action.pScaleY,
          action.type,
          action.pMode,
          1
        );
        scaleY = returnVal;
      }
      if (action.dScaleY) {
        const { returnVal, newGroupVal } = getNewAttribute(
          scaleY2,
          group.scaleY,
          action.dScaleY,
          action.type,
          action.dMode,
          1
        );
        group.scaleY = newGroupVal;
      }
    }
  }
  group.action = undefined;
  return { xPos, yPos, rot, scaleX, scaleY, uniformAction, radius };
};
