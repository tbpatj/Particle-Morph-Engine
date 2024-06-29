import { MouseCursor } from "../../types/mouse";

export const updateCursorPos = (x: number, y: number) => {
  let dx = 0;
  let dy = 0;
  const now = new Date();
  //make sure we aren't recording the user moving the cursor out of the canvas and then to another position on the other side of the canvas making things flip out
  if (now.getTime() - particles.mouse.lastRecordedTime.getTime() < 100) {
    dx = x - particles.mouse.x;
    dy = y - particles.mouse.y;
  }
  const lastX = particles.mouse.x;
  const lastY = particles.mouse.y;
  //get the velocity vector properties
  const magSqr = dx * dx + dy * dy;
  const mag = Math.sqrt(magSqr);
  const nDx = mag === 0 ? mag : dx / mag;
  const nDy = mag === 0 ? mag : dy / mag;
  particles.mouse = {
    ...particles.mouse,
    x,
    y,
    lastX,
    lastY,
    dx,
    dy,
    magSqr: magSqr,
    mag: mag,
    nDx,
    nDy,
    lastRecordedTime: now,
  } as MouseCursor;
};

const handleMouseMove = (e: MouseEvent) => {
  if (particles.glCE) {
    let rect = particles.glCE.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    updateCursorPos(x, y);
  }
};

const handleScrolling = (e: any) => {
  particles.mouse.scrollDY = particles.mouse.scrollPosY - window.scrollY;
  particles.mouse.scrollPosY = window.scrollY;
};

const handleMouseUp = (e: MouseEvent) => {
  if (e.button === 0) {
    particles.mouse = {
      ...particles.mouse,
      leftMouseDown: false,
      leftMouseUp: true,
    };
  } else if (e.button === 2) {
    particles.mouse = {
      ...particles.mouse,
      rightMouseDown: false,
      rightMouseUp: true,
    };
  }
};
const handleMouseDown = (e: MouseEvent) => {
  if (e.button === 0) {
    particles.mouse = {
      ...particles.mouse,
      leftMouseDown: true,
      leftClick: true,
    };
  } else if (e.button === 2)
    particles.mouse = {
      ...particles.mouse,
      rightMouseDown: true,
      rightClick: true,
    };
};

const handleTouchMove = (e: any) => {
  e as TouchEvent;
  //could do something with multiple touches, like disable scroll if only one tap so the user can interact
  updateCursorPos(e.touches[0].clientX, e.touches[0].clientY);
};

export const initMouse = () => {
  window.addEventListener("scroll", handleScrolling);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("touchmove", handleTouchMove);
};

export const cleanUpMouse = () => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mousedown", handleMouseDown);
  document.removeEventListener("mouseup", handleMouseUp);
  window.removeEventListener("scroll", handleScrolling);
  document.removeEventListener("touchmove", handleTouchMove);
};
