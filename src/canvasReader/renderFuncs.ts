import {
  ParticleHtmlInput,
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

/** True when the experimental HTML-in-Canvas APIs are present on this canvas/context. */
export const supportsHtmlInCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) =>
  typeof canvas.requestPaint === "function" &&
  typeof ctx.drawElementImage === "function";

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

const HTML_CONTENT_ATTR = "data-particle-html-content";

/**
 * Renders HTML into the canvas using the experimental HTML-in-Canvas API.
 * Puts content as a canvas child (with layoutsubtree), waits for `paint`,
 * then draws it with `drawElementImage` so the existing pixel pipeline can
 * turn it into particles.
 *
 * @see https://blog.master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas/
 */
export const renderHtmlToCtx = (
  input: ParticleHtmlInput,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  ww: number,
  wh: number,
  dpi: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!supportsHtmlInCanvas(canvas, ctx)) {
      console.warn(
        "[particles] HTML-in-Canvas is unavailable. Enable chrome://flags/#canvas-draw-element (Chrome 146+)."
      );
      resolve(false);
      return;
    }

    // Opt descendants into layout + hit testing (required by the API).
    canvas.setAttribute("layoutsubtree", "");

    // Reader canvas is normally 0x0 so it does not show; give it layout space
    // while HTML is measured/painted, then restore.
    const prevStyle = {
      width: canvas.style.width,
      height: canvas.style.height,
      position: canvas.style.position,
      left: canvas.style.left,
      top: canvas.style.top,
      overflow: canvas.style.overflow,
      opacity: canvas.style.opacity,
      pointerEvents: canvas.style.pointerEvents,
    };
    const cssW = ww / dpi;
    const cssH = wh / dpi;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.style.position = "absolute";
    canvas.style.left = "-99999px";
    canvas.style.top = "0";
    canvas.style.overflow = "hidden";
    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";

    // Drop any previous html wrappers from this canvas.
    canvas
      .querySelectorAll(`[${HTML_CONTENT_ATTR}]`)
      .forEach((node) => node.remove());

    const content = document.createElement("div");
    content.setAttribute(HTML_CONTENT_ATTR, "true");
    content.className = "particle-html-content";

    const contentW = input.width ?? cssW;
    const contentH = input.height ?? cssH;
    content.style.cssText = [
      "box-sizing:border-box",
      `width:${contentW}px`,
      `height:${contentH}px`,
      "margin:0",
      "padding:0",
      input.css ?? "",
    ]
      .filter(Boolean)
      .join(";");

    if (typeof input.html === "string") {
      content.innerHTML = input.html;
    } else {
      content.appendChild(input.html.cloneNode(true));
    }

    canvas.appendChild(content);

    let settled = false;
    const cleanup = () => {
      content.remove();
      canvas.style.width = prevStyle.width;
      canvas.style.height = prevStyle.height;
      canvas.style.position = prevStyle.position;
      canvas.style.left = prevStyle.left;
      canvas.style.top = prevStyle.top;
      canvas.style.overflow = prevStyle.overflow;
      canvas.style.opacity = prevStyle.opacity;
      canvas.style.pointerEvents = prevStyle.pointerEvents;
    };

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      canvas.removeEventListener("paint", onPaint);
      cleanup();
      resolve(ok);
    };

    const onPaint = () => {
      try {
        // Do not ctx.reset() — that clears prior text/image stamps in the same group.
        ctx.save();
        if (input.filter) ctx.filter = input.filter;
        const scaleX = input.scaleX ?? 1;
        const scaleY = input.scaleY ?? 1;
        const ihw = (contentW * dpi * scaleX) / 2;
        const ihh = (contentH * dpi * scaleY) / 2;
        adjustRenderPosition(ctx, input, ww, wh, dpi, ihw, ihh);
        if (scaleX !== 1 || scaleY !== 1) {
          ctx.scale(scaleX, scaleY);
        }
        // Core HTML-in-Canvas draw: snapshot the laid-out element into pixels.
        ctx.drawElementImage!(content, 0, 0);
        ctx.restore();
        finish(true);
      } catch (err) {
        console.error("[particles] drawElementImage failed:", err);
        try {
          ctx.restore();
        } catch {
          /* ignore */
        }
        finish(false);
      }
    };

    canvas.addEventListener("paint", onPaint);
    // Kick the paint pipeline so we get a cached paint record to draw from.
    canvas.requestPaint!();

    // Safety timeout if the flag is off or paint never fires.
    window.setTimeout(() => {
      if (!settled) {
        console.warn(
          "[particles] HTML-in-Canvas paint timed out. Is canvas-draw-element enabled?"
        );
        finish(false);
      }
    }, 2000);
  });
};
