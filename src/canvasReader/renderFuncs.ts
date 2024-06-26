import {
  CanvasPoint,
  ParticleImageInput,
  ParticleInput,
  ParticleTextInput,
  ParticleWrapperColorPattern,
  ParticleWrapperConicGradient,
  ParticleWrapperGradient,
  ParticleWrapperLinearGradient,
  ParticleWrapperRadialGradient,
} from "../types/particleReader";
import { PxPercStringToNumber, stringToPXPerc } from "./util";

const createLinearGradient = (
  ctx: CanvasRenderingContext2D,
  grad: ParticleWrapperLinearGradient
) => {
  const gradient = ctx.createLinearGradient(grad.x0, grad.y0, grad.x1, grad.y1);
  for (let i = 0; i < grad.stops.length; i++) {
    const stop = grad.stops[i];
    gradient.addColorStop(stop.offset, stop.color);
  }
  return gradient;
};

const createConicGradient = (
  ctx: CanvasRenderingContext2D,
  grad: ParticleWrapperConicGradient
) => {
  const gradient = ctx.createConicGradient(grad.startAngle, grad.x, grad.y);
  for (let i = 0; i < grad.stops.length; i++) {
    const stop = grad.stops[i];
    gradient.addColorStop(stop.offset, stop.color);
  }
  return gradient;
};

const createPattern = (
  ctx: CanvasRenderingContext2D,
  pattern: ParticleWrapperColorPattern
) => {
  if (pattern.image) {
    const canvasPattern = ctx.createPattern(pattern.image, pattern.repetition);
    if (canvasPattern) ctx.fillStyle = canvasPattern;
  }
};

const createRadialGradient = (
  ctx: CanvasRenderingContext2D,
  grad: ParticleWrapperRadialGradient
) => {
  const gradient = ctx.createRadialGradient(
    grad.x0,
    grad.y0,
    grad.r0,
    grad.x1,
    grad.y1,
    grad.r1
  );
  for (let i = 0; i < grad.stops.length; i++) {
    const stop = grad.stops[i];
    gradient.addColorStop(stop.offset, stop.color);
  }
  return gradient;
};

const getFillStyle = (ctx: CanvasRenderingContext2D, input: ParticleInput) => {
  if ((input.color as ParticleWrapperColorPattern)?.image) {
    createPattern(ctx, input.color as ParticleWrapperColorPattern);
  } else if ((input?.color as ParticleWrapperGradient)?.stops) {
    if ((input?.color as ParticleWrapperRadialGradient)?.r0 !== undefined)
      ctx.fillStyle = createRadialGradient(
        ctx,
        input.color as ParticleWrapperRadialGradient
      );
    else if (
      (input?.color as ParticleWrapperConicGradient)?.startAngle !== undefined
    )
      ctx.fillStyle = createConicGradient(
        ctx,
        input.color as ParticleWrapperConicGradient
      );
    else
      ctx.fillStyle = createLinearGradient(
        ctx,
        input.color as ParticleWrapperLinearGradient
      );
  } else if (typeof input.color === "string") {
    ctx.fillStyle = input.color;
  } else {
    ctx.fillStyle = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)},${Math.random() * 0.25 + 0.75})`;
  }
};

const getRenderPos = (
  input: ParticleInput,
  ww: number,
  wh: number,
  dpi: number,
  ihw?: number,
  ihh?: number
) => {
  const xOffset =
    PxPercStringToNumber(input?.xPos ?? "50%", false, dpi) - (ihw ?? 0);
  const yOffset =
    PxPercStringToNumber(input?.yPos ?? "50%", true, dpi) - (ihh ?? 0);
  // let xOffset = ww / 2 + (ihw ?? 0);
  // if (input?.xPos && input?.xPos?.includes("%")) {
  //   const percent = parseFloat(input?.xPos?.split("%")[0]);
  //   if (!isNaN(percent)) xOffset = (ww - (ihw ?? 0) * 2) * (percent / 100);
  // } else if (input?.xPos) {
  //   const pxl = parseFloat(input?.xPos) - (ihw ?? 0);
  //   if (!isNaN(pxl)) xOffset = pxl;
  // }
  // let yOffset = wh / 2 - (ihh ?? 0) * 2;
  // if (input?.yPos?.includes("%")) {
  //   const percent = parseFloat(input?.yPos?.split("%")[0]);
  //   if (!isNaN(percent)) yOffset = (wh - (ihh ?? 0) * 2) * (percent / 100);
  // } else if (input?.yPos) {
  //   const pxl = parseFloat(input?.yPos) - (ihh ?? 0);
  //   if (!isNaN(pxl)) yOffset = pxl;
  // }
  return { xOffset, yOffset };
};

const adjustRenderPosition = (
  ctx: CanvasRenderingContext2D,
  input: ParticleInput,
  ww: number,
  wh: number,
  dpi: number,
  ihw?: number,
  ihh?: number
) => {
  const { xOffset, yOffset } = getRenderPos(input, ww, wh, dpi, ihw, ihh);
  ctx.translate(xOffset, yOffset);
  if (input.rotDeg) ctx.rotate((input.rotDeg * Math.PI) / 180);
};

export const renderTextToCtx = (
  input: ParticleTextInput,
  ctx: CanvasRenderingContext2D,
  ww: number,
  wh: number,
  dpi: number
) => {
  ctx.save();
  //apply the font and style of text we want
  ctx.font = `${input?.fontWeight ?? "bold"} ${
    input?.fontSize
      ? stringToPXPerc(input?.fontSize, false, dpi) + "px"
      : `${70 * dpi}px`
  } ${input?.font ?? "sans-serif"}`;
  ctx.textAlign = input?.align ?? "center";
  if (input.filter) ctx.filter = input.filter;
  getFillStyle(ctx, input);
  adjustRenderPosition(ctx, input, ww, wh, dpi);
  //move the render position, so if you have a fill gradient or image it can move the position of the fillstyle
  ctx.translate(input.fillOffset?.x ?? 0, input.fillOffset?.y ?? 0);
  // stamp the text onto the canvas
  ctx.fillText(
    input.text,
    -(input.fillOffset?.x ?? 0),
    -(input.fillOffset?.y ?? 0)
  );
  ctx.restore();
};

export const renderImageToCtx = (
  input: ParticleImageInput,
  ctx: CanvasRenderingContext2D,
  ww: number,
  wh: number,
  dpi: number
) => {
  ctx.save();
  //prep up the stamp with data we passed through, scaling, positioning, rotation.
  const { image, xPos, yPos, scaleX, scaleY } = input;
  const aspectRatio = image.height / image.width;
  let iw = (input?.width ?? 200) * dpi;
  let ih = (input?.height ?? 200) * dpi;
  if (aspectRatio < 1) {
    iw = iw * (scaleX ?? 1);
    ih = ih * aspectRatio * (scaleY ?? 1);
  } else {
    iw = (iw / aspectRatio) * (scaleX ?? 1);
    ih = ih * (scaleY ?? 1);
  }
  const ihw = iw / 2;
  const ihh = ih / 2;
  if (input.filter) ctx.filter = input.filter;
  adjustRenderPosition(ctx, input, ww, wh, dpi, ihw, ihh);
  //stamp the image onto the canvas
  ctx.drawImage(image, 0, 0, iw, ih);
  ctx.restore();
};
