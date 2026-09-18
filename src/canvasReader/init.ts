import {
  GroupInput,
  ParticleHtmlInput,
  ParticleImageInput,
  ParticleInput,
  ParticleTextInput,
} from "../types/particleReader";
import { shuffle } from "../utils/lists";
import { getCanvasPoints } from "./canvasReading";
import {
  renderHtmlToCtx,
  renderImageToCtx,
  renderTextToCtx,
} from "./renderFuncs";

export const initCanvasReader = (
  canvasEl: HTMLCanvasElement
  //   width: number,
  //   height: number
) => {
  //intialize the ctx context for rendering images and other things to the canvas
  const Ctx = canvasEl.getContext("2d", { willReadFrequently: true });
  particles.readerCE = canvasEl;
  // Opt-in for experimental HTML-in-Canvas (layoutsubtree + drawElementImage).
  canvasEl.setAttribute("layoutsubtree", "");
  particles.readerCE.width = particles.glSize.width * particles.dpi;
  particles.readerCE.height = particles.glSize.height * particles.dpi;
  particles.readerSize.width = canvasEl.width;
  particles.readerSize.height = canvasEl.height;
  //set up the actual ctx on our global object
  if (Ctx) {
    particles.ctx = Ctx;
  }
  //create the functions for the canvas reader

  const updateCTXForProcessing = async (inputs: ParticleInput[]) => {
    let renderedToCanvas = false;
    if (particles.ctx && particles.readerCE) {
      particles.ctx.clearRect(
        0,
        0,
        particles.readerSize.width,
        particles.readerSize.height
      );
      for (let l = 0; l < inputs.length; l++) {
        const renderTask: any = inputs[l];
        //if the user wants text to be the thing that particles show then get the positions from text
        if (renderTask?.text) {
          const input = renderTask as ParticleTextInput;
          renderTextToCtx(
            input,
            particles.ctx,
            particles.readerSize.width,
            particles.readerSize.height,
            particles.dpi
          );
          renderedToCanvas = true;
          //if the user wants an image to be the thing we render
        } else if (renderTask?.image) {
          const input = renderTask as ParticleImageInput;
          renderImageToCtx(
            input,
            particles.ctx,
            particles.readerSize.width,
            particles.readerSize.height,
            particles.dpi
          );
          renderedToCanvas = true;
          // experimental: paint HTML into the canvas, then reuse the same pixel pipeline
        } else if (renderTask?.html !== undefined) {
          const input = renderTask as ParticleHtmlInput;
          const ok = await renderHtmlToCtx(
            input,
            particles.readerCE,
            particles.ctx,
            particles.readerSize.width,
            particles.readerSize.height,
            particles.dpi
          );
          if (ok) renderedToCanvas = true;
        }
      }
    }
    return renderedToCanvas;
  };

  const addInputs = async (gInput: GroupInput) => {
    if (particles.ctx) {
      const { inputs } = gInput;
      if (inputs.length > 0) {
        //iterate through all of the inputs passed in and render them to the canvas
        const renderedToCanvas = await updateCTXForProcessing(inputs);
        if (renderedToCanvas) {
          // console.log(sizeRef.current.width);
          const image = particles.ctx.getImageData(
            0,
            0,
            particles.readerSize.width,
            particles.readerSize.height
          ).data;
          const pointData = getCanvasPoints(
            image,
            particles.readerSize.width,
            particles.readerSize.height,
            particles.dpi,
            Math.min(
              Math.max(
                gInput?.resPerc ?? particles.options.resolutionPercent,
                5
              ),
              100
            ),
            gInput?.removeWhite ?? false
          );
          particles.ctx.clearRect(
            0,
            0,
            particles.readerSize.width,
            particles.readerSize.height
          );
          if (gInput.shufflePoints)
            pointData.points = shuffle(pointData.points);
          particles.addFromPoints(pointData, gInput);
        }
      }
    }
  };

  console.log("adding canvas reader input group function");

  particles.addInputGroup = addInputs;

  return true;
};
