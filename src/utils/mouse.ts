import { MouseRef } from "../hooks/useMouseCursor";

export const excludeOldMouseEntries = (mouseRef: MouseRef) => {
  if (new Date().getTime() - mouseRef.current.lastRecordedTime.getTime() > 100)
    mouseRef.current = { ...mouseRef.current, dx: 0, dy: 0, mag: 0, magSqr: 0 };
};

export const removeInitalAndLiftingClicks = (mouseRef: MouseRef) => {
  if (mouseRef.current.leftClick) mouseRef.current.leftClick = false;
  if (mouseRef.current.rightClick) mouseRef.current.rightClick = false;
};
