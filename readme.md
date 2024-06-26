# Description

A particle library that enables users to create images objects shapes and text out of particles and render them quickly and effiecently using webGL, enabling the usage of hundreds of thousands of particles, perhaps even millions in the web browser. The particles are interactable with the mouse, and can be dragged or interacted with a click.

Make sure you are not running other heavy graphics applications, it will significantly impact the speed. I have gotten this to render up to 500,000 particles with small frame dropping from 60fps on a 2018 macbook. Also sometimes it appears that there still might be some memory leakage or something, even though I clean up the webgl instance sometimes the performance gets slower. Not sure if thats also due to other applictions and their memory leaks. Sometimes you need to restart your computer to get the best performace.

https://github.com/tbpatj/Particle-Morph-Engine/assets/15040109/31836618-25e6-49c5-85f1-a4956be87166

# How to Setup:

Load in the library using the script tag, using either a built .js file or the provided project included, perhaps suppoort for npm later

```
<script type="module" src="index.ts"></script>
```

Make sure to have two canvas html elements in the DOM how ever you would create those. The canvas elements need ids that will help the library access them, as well as they need to be styled using a style tag or a classname where the styling sets the width of the elements css wise, be sure to hide the second canvas element the "canvas reader" as it will only be used rendering things using the ctx context to convert them into particles for the actual webgl, so it will not display any fun or useful things.

```
    <canvas style="width:100vw;height:100vh;" id="canvas-particles"></canvas>
    <canvas style="width:100vw;height:100vh;" id="canvas-reader"></canvas>

```

Call the library init function passing in the particles canvas element and the cavas reader element id's as strings both are required, should run synchronously

```
    particles.init("canvas-particles", "canvas-reader")
```

Check if the library initialization was successful

```
    if(particles.ready) {
        //do what ever you want
    }
```

If you properly ran this code you should see the default floating particles displaying on the screen,
The amount of these particles can be changed before running the .init function by changing particles.options.backgroundParticleCount, which also has to be equal to or less than particles.options.prtcleCnt

# How to create particle groups

## Basic Example

below is a basic example of setting up a new particle group.

```
particles.addInputGroup({
    group: 0,
    xPos: "50%",
    yPos: "50%",
    inputs: [
        { text: "test", color: "#000000", align: "center" },
    ],
})
```

## Advanced Example

```
//load up an image it needs to be loaded in a special way as by default ctx doesn't like us rendering images from external sites. So be aware that not all images may work
const myImage = await particles.loadImageURL(
  "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
);

particles.addInputGroup({
  group: 0,
  xPos: "50%",
  yPos: "50%",
  inputs: [
    //you can create multiple objects to render to a single group, here we render text and an image
    {
      text: "test",
      color: "#000000",
      //you could use an image as the fill color for text
      // color: {
      //   image: myImage,
      //   repetition: "repeat",
      // },
      //fillOffset: {x: 0, y: 0},
      align: "right",
      xPos: "50% + 30px",
      fontSize: "80px",
      fontWeight: "bold",
      //any ctx filter is allowed here
      filter: "hue-rotate(100deg)"
    },
    //image rendering
    {
      image: myImage,
      xPos: "25% + 20px",
      yPos: "50%",
      scaleX: 1, // 1 being 100% of the image size
      //any ctx filter is allowed here
      filter: "hue-rotate(100deg)"
    },
  ],
  //typically you will want to allocate more particles for images and bigger amounts, or find a balance of the radius size and what works
  allocatedParticles: 8000,
  rot: 10,
  //change the radius of the particles when they are making up the group
  radius: 3,
  scaleX: "100%",
  scaleY: "100%",
  //how pixel perfectly the canvas reader will read pixels, if you decrease this value say 90 then it will skip some pixels and read only 90 percent of the generated canvas image
  resPerc: 100,
  //change the distance of randomness from a actual pixel point, usually you will want this at it's default or something higher than 0
  prtclDstRng: 0,
  //does not process white pixels as valid particles, usefull for images
  removeWhite: true,
  //by default the pixels will be attained in a certain order always, use this to change that order, though be aware this causes a lot of lag
  shufflePoints: true,
  //you can choose whether the particles by default are enabled
  enabled: true,
  //when the user clicks on the hitbox of the particle group do an action.
  clickCallback: () => {
    //you could make it so if the group is disabled enable it
    if (!particles.pGroups[0].enabled) {
      particles.enableGroups([0]);
    } else {
      //if the group is enabled disable it
      particles.disableGroups([0]);
    }
  },
  //actions are great for moving groups real time, in this case we use it to set the particles at their assigned position straight away instead of floating in from where ever they were originally. Great for when you load the project in and want something there already.
  action: {
    type: "point",
    xPos: "50%",
    yPos: "50%",
    mode: "set",
  },
});

```

# Using particle actions

```
p.groupAction(
    {
        type: "dest", // options: "both" | "point" | "dest" | "bothIndividual", change the destination that the particles are trying to go to or change the actual particle point position,
        xPos: "-10%",
        yPos: `2%`,
        mode: "shift" // options: "shift" | "set", shift - shifts it by the xpos and ypos amount, set sets it to that value of xPos and yPos
    },
    0 //the index of the particle group
);
```

the types of the group actions

```
export interface GroupAction {
  type: "dest" | "point" | "both";
  mode?: "shift" | "set";
  xPos?: string;
  yPos?: string;
  scaleX?: string;
  scaleY?: string;
  rot?: number;
  radius?: number;
}
export interface GroupIndividualAction {
  type: "bothIndividual";
  pMode?: "shift" | "set";
  pXPos?: string;
  pYPos?: string;
  pScaleX?: string;
  pScaleY?: string;
  pRot?: number;
  dMode?: "shift" | "set";
  dXPos?: string;
  dYPos?: string;
  dScaleX?: string;
  dScaleY?: string;
  dRot?: number;
  radius?: number;
}
```

# Overriding a particle group

you can override a particle group and update it to a new image or something else. Be careful when updating particle groups due to the way the particle engine works, you need to make sure you are allocating particles carefully. If you are not careful it can cause some problems. This is a feature that could be worked on in the future is creating better dynamic particle allocation.

```
const myImage = await particles.loadImageURL(url1);
const myImage2 = await particles.loadImageURL(url2);

//initialize the particle group to start with
particles.addInputGroup({
  group: 0,
  xPos: "50%",
  yPos: "50%",
  inputs: [

    {
      image: myImage,
    },
  ],
  allocatedParticles: 8000,
  radius: 3,
  removeWhite: true,
});
//create a timeoout to override the particle group in 4 seconds
setTimeout(() =>{
  particles.addInputGroup({
  group: 0,
  xPos: "50%",
  yPos: "50%",
  inputs: [

    {
      image: myImage2,
    },
  ],
  allocatedParticles: 8000,
  radius: 3,
  removeWhite: true,
});
},4000)
```

# Other Particle Functions

Other functions include deleting the groups and setting the lifetime of the groups
lifetime - is how much longer the particle has left to live, after the allocated life is gone it will disappear.

```
    //removing groups
    deleteAllGroups(false) // boolean passed is optional and tells whether to use the group lifetime or not
    setGroupLifetime([0,1], 100, 10) // setGroupLifetime: (groupIds: number[], lifetime: number, offset?: number) => {}

    //disable and enabling groups
    enableGroups([0]); // (groupIds: number[]) => {}
    disableGroups([0]); // (groupIds: number[]) => {}
```

# Particle Options

Not all options have been implemented in this version, I had to redo the entire engine in webgl to make it faster and some things were not translated as quickly as others

```
const options: WrapperOptions = {
  resolutionPercent: 50,
  prtcleCnt: 50000,
  backgroundParticleCount: 500,
  mapParticlesToClosestPoint: false,
  prtclDstRng: 0.5,
  usePreciseMouseDetection: true,
  mouseInteractionType: "drag",
  mouseInteractionFieldDistance: 10000,
  mouseInteractionFieldIntensity: 10,
  mouseClickInteractionFieldDistance: 10000,
  mouseClickInteractionFieldIntensity: 0.003,
  mouseClickInteractionType: "orbit",
  edgeInteractionType: "teleport",
  edgeRestitution: 0.8,
  useParticleQueue: true,
  particleScrollType: "scrollY",
  lifetimeOffsetRng: 10,
  maxGroups: 10,
};
```

# TODO

Since this was orignally a part of my portfolio and I had created a whole engine before this one this one was to optimize there are things that still need to be done:

- pull back in some of the old options
- add back in the fps reporting (very useful for devices that are running something on the graphics card already, like figma, photoshop or some other graphics heavy application,) this enables the program to not attempt to run if its causing too much lag as sometimes that is the case
- optimize and update the allocation of particles
