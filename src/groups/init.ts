import { CanvasPointData } from "../canvasReader/canvasReading";
import { DisableGroups, EnableGroups } from "../types/groupController";
import { GroupAction, GroupIndividualAction, HitBox } from "../types/groups";
import { GroupInput } from "../types/particleReader";
import {
  GroupSubBufferDataPackage,
  getAvailableParticleRange,
  getGroupSubBufferRange,
  updateGroupSubBuffer,
} from "../utils/groupController";
import { convertStringValue } from "../utils/groupPos";

export const initGroups = () => {
  const disableGroups: DisableGroups = (groupIds: number[]) => {
    for (const indx in groupIds) {
      const groupId = groupIds[indx];
      if (particles.pGroups[groupId])
        particles.pGroups[groupId].enabled = false;
    }
  };
  const enableGroups: EnableGroups = (groupIds: number[]) => {
    for (const indx in groupIds) {
      const groupId = groupIds[indx];
      if (particles.pGroups[groupId]) particles.pGroups[groupId].enabled = true;
    }
  };
  const setGroupLifetime = (
    groupIds: number[],
    lifetime: number,
    offset?: number
  ) => {
    if (particles.gl && particles.glDeps) {
      const ranges = getGroupSubBufferRange(groupIds, particles.pGroups);
      const rOffset = offset ?? particles.options.lifetimeOffsetRng;
      for (const i in ranges) {
        const range = ranges[i];
        const lifetimeBuffer = new Float32Array(
          range.endIndx - range.startIndx
        ).map(() => {
          return lifetime + (Math.random() * (rOffset * 2) - rOffset);
        });
        const gsbdp: GroupSubBufferDataPackage = {
          gl: particles.gl,
          deps: particles.glDeps,
          startIndx: range.startIndx,
          amountOfParticles: range.endIndx - range.startIndx,
        };
        updateGroupSubBuffer(gsbdp, "lifetime", lifetimeBuffer, 1);
      }
      particles.gl.bindBuffer(particles.gl.ARRAY_BUFFER, null);
      for (const i in groupIds) {
        const id = groupIds[i];
        if (particles.pGroups[id]) {
          particles.pGroups[id].lifetime = lifetime + rOffset * 2;
        }
      }
    }
  };
  const deleteAllGroups = (useLifetime?: boolean) => {
    if (useLifetime) {
      //just set every possible group's lifetime to 0 so they fade away
      setGroupLifetime(
        new Array(particles.options.maxGroups).map((v, i) => i),
        0
      );
    }
  };
  const addFromPoints = (pointData: CanvasPointData, gInput: GroupInput) => {
    if (particles.gl && particles.glDeps && particles.pGroups) {
      const { points } = pointData;
      const centerX = convertStringValue(
        "50%",
        (particles.glCE?.width ?? window.innerWidth * particles.dpi) /
          particles.dpi
      );
      const centerY = convertStringValue(
        "50%",
        (particles.glCE?.height ?? window.innerHeight * particles.dpi) /
          particles.dpi
      );
      const amountOfParticles = gInput?.allocatedParticles ?? 1000;
      const group = gInput.group;
      //find an unassigned group
      if (!group) {
      }

      const gl = particles.gl;
      const deps = particles.glDeps;
      const groups = particles.pGroups;
      const range = getAvailableParticleRange(
        groups,
        amountOfParticles,
        particles.options.prtcleCnt,
        group,
        particles.options
      );
      if (range) {
        const { startIndx } = range;
        //iteration amount

        const ia = points.length / amountOfParticles;
        const getRandIa = (indx: number) => {
          const newIdx = Math.floor(Math.random() * ia + indx);
          return Math.floor(newIdx >= points.length ? indx : newIdx);
        };
        const updatedBuffer = new Float32Array(amountOfParticles * 3);
        //updated color buffer - ubc
        const ucb = new Float32Array(amountOfParticles * 4);
        //update lifetime (in case the previous group owner deleted them and they now have a lifetime of 0)
        const lifetimeBuffer = new Float32Array(amountOfParticles).fill(-1);
        //assign the new buffer data based off of the point data we get from the canvas render.

        const pdr = gInput.prtclDstRng ?? particles.options.prtclDstRng;
        for (let i = 0; i < amountOfParticles; i++) {
          const point = points[getRandIa(Math.floor(i * ia))];
          const bfi1 = i * 3;
          const bfi2 = i * 4;
          const offsetX = Math.random() * pdr * 2 - pdr;
          const offsetY = Math.random() * pdr * 2 - pdr;

          updatedBuffer[bfi1] = (point?.pos?.x ?? 0) - centerX + offsetX;
          updatedBuffer[bfi1 + 1] = (point?.pos?.y ?? 0) - centerY + offsetY;
          updatedBuffer[bfi1 + 2] = group;

          ucb[bfi2] = (point?.color?.R ?? 0) / 255;
          ucb[bfi2 + 1] = (point?.color?.G ?? 0) / 255;
          ucb[bfi2 + 2] = (point?.color?.B ?? 0) / 255;
          ucb[bfi2 + 3] = 1;
        }

        const gsbdp: GroupSubBufferDataPackage = {
          gl,
          deps,
          startIndx,
          amountOfParticles,
        };

        const hitbox: HitBox = {
          offsetX: (pointData.maxX + pointData.minX) / 2 - centerX,
          offsetY: (pointData.maxY + pointData.minY) / 2 - centerY,
          width: pointData.maxX - pointData.minX,
          height: pointData.maxY - pointData.minY,
        };

        //update the dest position buffer
        updateGroupSubBuffer(gsbdp, "dest", updatedBuffer, 3);
        //update the dest color buffer
        updateGroupSubBuffer(gsbdp, "dest_color", ucb, 4);
        //reset the lifetime on the particles
        updateGroupSubBuffer(gsbdp, "lifetime", lifetimeBuffer, 1);
        //unbind the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        particles.pGroups[group] = {
          startIndx: startIndx,
          endIndx: amountOfParticles + startIndx,
          xPos: gInput.xPos ?? "50%",
          yPos: gInput.yPos ?? "50%",
          scaleX: gInput?.scaleX ?? "100%",
          scaleY: gInput?.scaleY ?? "100%",
          rot: ((gInput?.rot ?? 0) / 180) * 3.14,
          action: gInput?.action,
          enabled: gInput?.enabled ?? true,
          radius: gInput?.radius ?? 6,
          hitbox: hitbox,
          clickCallback: gInput.clickCallback,
        };
      }
    }
  };

  particles.addFromPoints = addFromPoints;
  particles.deleteAllGroups = deleteAllGroups;
  particles.setGroupLifetime = setGroupLifetime;
  particles.enableGroups = enableGroups;
  particles.disableGroups = disableGroups;
  particles.groupAction = (
    action: GroupAction | GroupIndividualAction,
    group: number
  ) => {
    if (particles.pGroups[group]) particles.pGroups[group].action = action;
  };

  return true;
};
