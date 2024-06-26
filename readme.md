# Description

A particle library that enables users to create images objects shapes and text out of particles and render them quickly and effiecently using webGL, enabling the usage of hundreds of thousands of particles, perhaps even millions in the web browser. The particles are interactable with the mouse, and can be dragged or interacted with a click.

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

## Text

```

```
