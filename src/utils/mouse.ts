import { MouseCursor } from "../types/mouse";

export const excludeOldMouseEntries = (mouse: MouseCursor) => {
  if (new Date().getTime() - mouse.lastRecordedTime.getTime() > 100)
    mouse = { ...mouse, dx: 0, dy: 0, mag: 0, magSqr: 0 };
};

export const removeInitalAndLiftingClicks = (mouse: MouseCursor) => {
  if (mouse.leftClick) mouse.leftClick = false;
  if (mouse.leftMouseUp) mouse.leftMouseUp = false;
  if (mouse.rightClick) mouse.rightClick = false;
  if (mouse.rightMouseUp) mouse.rightMouseUp = false;
};
