import { DefaultedWrapperOptions } from "../types";
import { ParticleGroups } from "../types/groups";
import { MouseCursor } from "../types/mouse";
import { GLDeps } from "../types/webgl";
import { updateGroups } from "./render/updateGroups";

export const webGLLoop = (
  gl: WebGL2RenderingContext,
  deps: GLDeps,
  options: DefaultedWrapperOptions,
  mouse: MouseCursor,
  width: number,
  height: number,
  groups: ParticleGroups,
  dpi: number
) => {
  const { vaos, tfbs, currentVAO, programs, buffers, uniforms } = deps;
  const curTFB =
    currentVAO + 1 >= Object.keys(vaos).length ? 0 : currentVAO + 1;
  const vaoSource = deps.vaos[`vao${currentVAO}`].vao;
  const tfbSource = deps.tfbs["tfb" + curTFB].tfb;
  const now = performance.now();
  const deltaTime = now - deps.lastRenderTime;
  deps.lastRenderTime = now;
  // printResults(gl, buffers[curVao].offset_vels, "pos1");

  gl.bindVertexArray(vaoSource);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tfbSource);
  // console.log(uniforms.mpc.loc, mouse.x);
  gl.uniform4f(uniforms.mpc.loc, mouse.x, mouse.y, mouse.dx, mouse.dy);
  gl.uniform4f(uniforms.md.loc, mouse.lastX, mouse.lastY, mouse.nDx, mouse.nDy);
  gl.uniform4f(
    uniforms.md2.loc,
    mouse.mag,
    mouse.magSqr,
    mouse.leftMouseDown ? 1.0 : 0.0,
    0.0
  );
  gl.uniform1f(uniforms.u_time.loc, performance.now());
  gl.uniform1f(uniforms.dpi.loc, dpi);
  gl.uniform2f(uniforms.scroll.loc, mouse.scrollDX, mouse.scrollDY / 7);
  const interactionType =
    options.mouseClickInteractionType === "push"
      ? 0.0
      : options.mouseClickInteractionType === "orbit"
      ? 1.0
      : 2.0;
  const edgeInteractionType =
    options.edgeInteractionType === "bounce"
      ? 2.0
      : options.edgeInteractionType === "teleport"
      ? 0.0
      : 0.0;
  gl.uniform4f(
    uniforms.additional_opts.loc,
    interactionType,
    edgeInteractionType,
    0.0,
    0.0
  );
  // gl.uniform2f(uniforms.scroll.loc, mouse.scrollDX, mouse.scrollDY);
  gl.uniform4f(
    uniforms.interaction_props.loc,
    options.mouseInteractionFieldDistance,
    options.mouseInteractionFieldIntensity,
    options.mouseClickInteractionFieldDistance,
    options.mouseClickInteractionFieldIntensity
  );
  // console.log(width, height);
  gl.uniform2f(uniforms.u_resolution.loc, width, height);
  gl.uniform1f(uniforms.dt.loc, deltaTime / 10);

  const groupPrtcleCnt = updateGroups(
    gl,
    deps,
    groups,
    width,
    height,
    options,
    mouse
  );
  // console.log(gl.canvas.width);

  gl.beginTransformFeedback(gl.POINTS);
  gl.drawArraysInstanced(
    gl.POINTS,
    0,
    1,
    options.backgroundParticleCount + groupPrtcleCnt
  );
  gl.endTransformFeedback();

  gl.bindVertexArray(null);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

  // printResults(gl, buffers[curTFB].offset_vels, "pos");

  deps.currentVAO =
    currentVAO + 1 >= Object.keys(vaos).length ? 0 : currentVAO + 1;
};
