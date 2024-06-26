import ColorRGB from "../classes/colorRGB";
import Vector2D from "../classes/vector2D";
import { CanvasPoint } from "../types/particleReader";

export interface CanvasPointData {
  points: CanvasPoint[];
  centerX: number;
  centerY: number;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

export const getCanvasPoints = (
  data: Uint8ClampedArray,
  ww: number,
  wh: number,
  dpi: number,
  resolutionPercent: number = 50,
  removeWhite: boolean = false
) => {
  //TODO create a version of this but instead it's a quad tree that finds points and groups them into quadrents, with a bound, that way we can just update the pxls in the algorithm to a bound, upon finding a bound make sure to calculate the area so we can figure out the pxl per area calculation
  //iterate through the canvas and find what parts of the canvas need particles
  const foundPoints: CanvasPoint[] = [];
  let centerX = null;
  let centerY = null;
  let maxX = null;
  let maxY = null;
  let minX = null;
  let minY = null;

  let R = 0;
  let G = 0;
  let B = 0;
  let A = 0;
  let posX = 0;
  let posY = 0;
  //iterate through the x coordinates of the canvas
  for (
    var i = 0;
    i < ww;
    //iterate through the coordinates skipping some based on the resolution percent, if 100 percent then we will go through all the points
    i += Math.round(ww / (ww * (resolutionPercent / 100)))
  ) {
    for (
      var j = 0;
      j < wh;
      j += Math.round(wh / (wh * (resolutionPercent / 100)))
    ) {
      //find the current index based off of the x y coordinates (i and j being x and y), mul by 4 to get around all the color channels
      const n = (i + j * ww) * 4;
      const isWhite =
        data[n] === 255 &&
        data[n + 1] === 255 &&
        data[n + 2] === 255 &&
        data[n + 3] === 255 &&
        removeWhite;
      if (data[n + 3] > 150 && !isWhite) {
        R = data[n];
        G = data[n + 1];
        B = data[n + 2];
        A = data[n + 3];
        posX = i / dpi;
        posY = j / dpi;
        //add the particles to the found points list
        foundPoints.push({
          pos: new Vector2D(posX, posY),
          color: new ColorRGB({ R, G, B, A }),
          assignedPxls: 0,
        });
        maxX = Math.max(maxX ?? posX, posX);
        maxY = Math.max(maxY ?? posY, posY);
        minX = Math.min(minX ?? posX, posX);
        minY = Math.min(minY ?? posY, posY);
        if (!centerX && !centerY) {
          centerX = posX;
          centerY = posY;
        } else if (centerX && centerY) {
          centerX = centerX + posX;
          centerY = centerY + posY;
        }
      }
    }
  }
  return {
    points: foundPoints,
    centerX: (centerX as number) / foundPoints.length,
    centerY: (centerY as number) / foundPoints.length,
    maxX,
    maxY,
    minX,
    minY,
  } as CanvasPointData;
};
