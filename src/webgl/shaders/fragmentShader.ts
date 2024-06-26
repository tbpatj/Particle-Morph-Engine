import { DefaultedWrapperOptions } from "../../types";

export const getFragmentShader = (options: DefaultedWrapperOptions) => {
  return `#version 300 es
  precision mediump float;
  // in vec2 v_texcoord;
  in vec4 v_color;
  // in float v_rad;
  out vec4 outColor;
  
  // float circle(in vec2 st, in float radius) {
  //   vec2 dist = st - vec2(0.5);
  //   return 1.0 - smoothstep(
  //      radius - (radius * 0.01),
  //      radius + (radius * 0.01),
  //      dot(dist, dist) * 4.0);
  // }
  
  // void main() {
  //   if (circle(v_texcoord, v_rad) < 0.5) {
  //     discard;
  //   }
  //   outColor = v_color;
  // }


  void main() {
    vec2 delta = gl_PointCoord - vec2(0.5,0.5);
    float lenSqr = abs(dot(delta,delta));
    float a = smoothstep(0.25,0.24,lenSqr);
      outColor = v_color * a;
    }
    `;
};
