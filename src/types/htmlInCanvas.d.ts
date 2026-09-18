/**
 * Experimental HTML-in-Canvas API typings.
 * Requires Chrome 146+ with chrome://flags/#canvas-draw-element enabled.
 * @see https://blog.master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas/
 */

interface HTMLCanvasElement {
  /** Opt canvas descendants into layout/hit-testing for HTML-in-Canvas. */
  layoutSubtree?: boolean;
  /** Request a paint snapshot so the `paint` event can draw element images. */
  requestPaint?(): void;
}

interface CanvasDrawElementImage {
  (
    element: Element,
    dx: number,
    dy: number
  ): DOMMatrix;
  (
    element: Element,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): DOMMatrix;
}

interface CanvasRenderingContext2D {
  /** Draw a laid-out DOM element's painted output into the canvas. */
  drawElementImage?: CanvasDrawElementImage;
}

interface WebGL2RenderingContext {
  /** Upload a laid-out DOM element's painted output as a texture. */
  texElementImage2D?(
    target: GLenum,
    level: GLint,
    internalformat: GLint,
    format: GLenum,
    type: GLenum,
    source: Element
  ): void;
}

interface HTMLElementEventMap {
  paint: Event;
}
