import { ParticleGroup } from "../types/groups";
import { MouseCursor } from "../types/mouse";
import m3 from "../utils/mat3";

export const checkHitbox = (
  matrix: number[],
  key: string,
  group: ParticleGroup,
  mouse: MouseCursor,
  xPos: number,
  yPos: number
) => {
  const u = m3.multiplyVec3(matrix, {
    x: mouse.x - xPos,
    y: mouse.y - yPos,
    z: 1,
  });

  const boundX = u.x - (group.hitbox?.offsetX + xPos);
  const boundY = u.y - (group.hitbox?.offsetY + yPos);
  if (
    Math.abs(boundX) < (group.hitbox?.width ?? 0) / 2 &&
    Math.abs(boundY) < (group.hitbox?.height ?? 0) / 2
  ) {
    group.lastMouseEvent = undefined;
    const event = {
      coords: { x: boundX, y: boundY },
      group: { ...group },
      mouse: structuredClone(mouse),
      groupKey: key,
    };
    if (mouse.leftClick) {
      group.held = true;
      group?.clickCallback?.(event);
    } else if (mouse.leftMouseUp) {
      group.held = false;
      group?.clickUpCallback?.(event);
    }
    group.lastMouseEvent = event;
    return true;
  }
  return false;
};
