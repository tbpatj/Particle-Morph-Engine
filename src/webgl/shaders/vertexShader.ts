import { DefaultedWrapperOptions } from "../../types";
const drag = 0.985;
const destDrag = 0.93;
const destIntensity = 200.1;

//TODO reimpliment the different mouse actionos, need to put the interaction_type on the interaction_props vector as value z, so the user can quickly update the interaction

export const getVertexShader = (options: DefaultedWrapperOptions) => {
  const lfOff = options.lifetimeOffsetRng + 0.1;
  const maxGroups = options.maxGroups;
  return `#version 300 es
  //setup the input variables
  layout(location=0) in vec2 vert_pos;
  layout(location=1) in vec4 offset_vel; //offset is x,y. Velocity is z,w
  layout(location=2) in vec3 dest; // x,y are position coords, z is a group definition, so -1 is no group. 0 can be a group defined later on... etc
  layout(location=3) in vec4 color;
  layout(location=4) in vec4 dest_color;
  layout(location=5) in float radius; //x is radius, y is lifetime
  layout(location=6) in float lifetime;
  
  //uniforms
  uniform vec2 u_resolution;
  uniform vec4 mpc; //  mousePosChange   - x=mousePos,y=mousePosY, z=mouseDX, w=mouseDY
  uniform vec4 md; //   mouseData        - x=lastMousePos, y=lastMousePosY,z = normalizedX,w = normalizedY
  uniform vec4 md2;//   mouseData2       - x=mouseMag, y = mouseMagSqrd, z=mouseDown
  uniform vec2 scroll;
  uniform vec4 interaction_props; // mouse interaction props  - x=interactionDis, y=interactionIntensity
  uniform float u_matrices[${maxGroups * 9}];
  uniform int group_actions[${maxGroups}];
  uniform float group_rads[${maxGroups}];
  uniform float u_time;
  uniform float dpi;

  uniform float dt; 

  //transform feedbacks
  out vec4 v_offset_vel;
  out vec4 v_p_color;
  out float v_radius;
  out float v_lifetime;

  //fragment shader outputs
  out vec4 v_color;

  highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy,vec2(a,b));
    highp float sn = mod(dt,3.14);
    return fract(sin(sn) * c);
  }
  
  void main() {


// --------------- MOUSE COLLISION ----------------

    //initialize needed varaibles
    vec2 new_vel = vec2(offset_vel.z,offset_vel.w);
    vec2 new_pos = vec2(offset_vel.x,offset_vel.y);
    float new_rad = radius;
    vec4 new_color = vec4(color);
    float velMag = dot(new_vel,new_vel);
        //initialize closest point by default as the lastMousePos
    vec2 closestPoint = vec2(md.x,md.y);
    vec2 p2pos = vec2(0,0);
    float dis = -1.0;
    float new_lifetime = lifetime;
    //MAKE NOTE OF THIS WHICH CARRIES TO THE COLLISION RESPONSE
    //check if the mouse button is not being clicked
    if(md2.z <= 0.5){
      //check if the magnitude of the mouse velocity is equal to zero, if so lets use a different quicker method to figure out the distance.
      if(md2.x != 0.0){
            //get the vector from the last mouse pos to the current particle position
        vec2 mToP = vec2(offset_vel.x - md.x, offset_vel.y - md.y);

            //take the dot product of the mouse velocity vector and the vector from the last mouse pos to the current particle position
        float projMag = (mpc.z * mToP.x + mpc.w * mToP.y) / md2.x;
            //make sure that the projected point is within the bounds of the mouse vector
        projMag = clamp(projMag,0.0,md2.x);

            //get the new closest point by completing the projection then offseting the vector into the world space.
        closestPoint = vec2(md.z * projMag + md.x,md.w * projMag + md.y);
        p2pos = vec2(closestPoint.x - offset_vel.x, closestPoint.y - offset_vel.y);
        dis = dot(p2pos, p2pos);
      
      }

      // ---------------------- COLLISION RESPONSE ----------------------
      if (dis < interaction_props.x && dis != -1.0) {
        float vDotM = (new_vel.x * mpc.z + new_vel.y * mpc.w) / dis;
        if (dis < 1000.0) dis = 1000.0;
        if (velMag < md2.y || (vDotM < 0.01 && md2.y > 10.0)) {
          float dx = mpc.z - offset_vel.z;
          float dy = mpc.w - offset_vel.w;
          new_vel.x += dx / (dis / interaction_props.y);
          new_vel.y += dy / (dis / interaction_props.y);
        }
      }
    } else if(md2.z == 1.0){
      // vec2 mToP = vec2(offset_vel.x - md.x, offset_vel.y - md.y);
      // dis = dot(mToP, mToP);
        //get the vector from the last mouse pos to the current particle position
        vec2 mToP = vec2(offset_vel.x - md.x, offset_vel.y - md.y);

        //take the dot product of the mouse velocity vector and the vector from the last mouse pos to the current particle position
        float projMag = (mpc.z * mToP.x + mpc.w * mToP.y) / md2.x;
        //make sure that the projected point is within the bounds of the mouse vector
        projMag = clamp(projMag,0.0,md2.x);

        //get the new closest point by completing the projection then offseting the vector into the world space.
        closestPoint = vec2(md.z * projMag + md.x,md.w * projMag + md.y);
        p2pos = vec2(closestPoint.x - offset_vel.x, closestPoint.y - offset_vel.y);
        dis = dot(p2pos, p2pos);

      if (dis < interaction_props.z) {
        new_vel.x += mToP.x * (1.0 - dis / interaction_props.z) * interaction_props.w;
        new_vel.y += mToP.y * (1.0 - dis / interaction_props.z) * interaction_props.w;
      }
    }
// ---------------------- EDGE DETECTION ----------------------
  if(dest.z < 0.0){
    if(offset_vel.x < 0.0 - (radius * 2.0)) {
      new_pos.x = u_resolution.x + radius * 4.0 + new_pos.x;
      float rand = random(vec2(gl_InstanceID,u_time));
      new_pos.y = clamp(rand * u_resolution.y,0.0,u_resolution.y);
    }
    if(offset_vel.x > u_resolution.x + radius * 2.0 ) {
      new_pos.x = new_pos.x - (u_resolution.x + radius * 4.0);
      float rand = random(vec2(gl_InstanceID,u_time));
      new_pos.y = clamp(rand * u_resolution.y,0.0,u_resolution.y);
    }
    if(offset_vel.y > u_resolution.y + radius * 2.0 ) {
      new_pos.y = new_pos.y - (u_resolution.y + radius * 4.0);
      float rand = random(vec2(gl_InstanceID,u_time));
      new_pos.x = clamp(rand * u_resolution.x,0.0,u_resolution.x);
    }
    if(offset_vel.y < 0.0 - (radius * 2.0)) {
      new_pos.y = new_pos.y + (u_resolution.y + radius * 4.0);
      float rand = random(vec2(gl_InstanceID,u_time));
      new_pos.x = clamp(rand * u_resolution.x,0.0,u_resolution.x);
    }
  }

// ---------------------- DRAG ----------------------
    if (velMag > 0.02) {
      new_vel.x *= ${drag};
      new_vel.y *= ${drag};
    }

// ---------------------- PARTICLE DESTINATIONS ----------------------
    //if the particle is assigned a group get its current position to it's new one
    if(dest.z >= 0.0){
      int g_i = int(dest.z);
      int indx = g_i * 9;
      int action = group_actions[g_i];
      float group_rad = group_rads[g_i];
      if(action != -2){
        mat3 u_matrix = mat3(u_matrices[indx],u_matrices[indx + 1],u_matrices[indx + 2], u_matrices[indx + 3], u_matrices[indx + 4], u_matrices[indx + 5], u_matrices[indx + 6], u_matrices[indx + 7], u_matrices[indx + 8]);
        
        vec2 proj_dest = (u_matrix * vec3(dest.x,dest.y, 1)).xy;
        if(action == 0){
          vec2 toDest = vec2(proj_dest.x - offset_vel.x, proj_dest.y - offset_vel.y);
          toDest /= ${destIntensity};
          new_vel.x = (new_vel.x + toDest.x * clamp(dt,0.0,2.0)) * ${destDrag};
          new_vel.y = (new_vel.y + toDest.y * clamp(dt,0.0,2.0)) * ${destDrag};

          vec4 to_color = vec4(dest_color - color) / 10.0;
          new_color = vec4(new_color + to_color);

          float to_rad = (group_rad - new_rad) / 10.0;
          new_rad = new_rad + to_rad;
          
          //moving destination
        }
        else if(action == 1) {
          new_pos.x = proj_dest.x;
          new_pos.y = proj_dest.y;
        }else if(action == 2){
          new_pos.x = proj_dest.x;
          new_pos.y = proj_dest.y;
          new_rad = group_rad;
        } else if(action == 3){
          new_rad = group_rad;
        }
      }
    } else {
      new_pos.y = new_pos.y + scroll.y * radius;
    }
// ---------------------- LIFETIME ----------------------
    if(new_lifetime > 0.999){
      new_lifetime = new_lifetime - 1.0;
    } else if(new_lifetime > -0.999){
      new_lifetime = 0.0;
      if(new_rad > 0.0){
        new_rad -= 1.0;
      } else {
        new_rad = 0.0;
      }
    }
    // if(new_lifetime > -0.999 && new_lifetime < 0.99999 && new_rad > -0.999 && new_rad < 0.22222){}
//---------------- CLIP SPACE ----------------
    vec2 zeroToOne = vec2(new_pos.x / u_resolution.x, new_pos.y / u_resolution.y);
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = vec2(zeroToTwo.x - 1.0, zeroToTwo.y - 1.0);

// --------------- OUTPUTS ---------------
    gl_Position = vec4(clipSpace*vec2(1,-1), 0, 1) + vec4(vert_pos.x,vert_pos.y,0,0);
    v_color = vec4(new_color.x,new_color.y,new_color.z,new_color.w);
    //make sure to not return a negative here or else it breaks on some devices
    gl_PointSize = max(new_rad,0.0) * dpi;

    //Transform feedbacks
    v_offset_vel = vec4(new_pos.x + new_vel.x * dt,new_pos.y + new_vel.y * dt,new_vel.x,new_vel.y);
    v_p_color = vec4(new_color.x,new_color.y,new_color.z,new_color.w);
    v_radius = new_rad;
    v_lifetime = new_lifetime;

  }
    `;
};
