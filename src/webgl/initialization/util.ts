export const unBindDeps = (gl: WebGL2RenderingContext) => {
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK,null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}