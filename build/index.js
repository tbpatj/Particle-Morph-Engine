function $fd76de704c8e1ed8$export$448332262467e042(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while(currentIndex !== 0){
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}


const $07bd345de5525519$var$shfflClr = (currentVal, range)=>{
    return Math.min(Math.max(~~(currentVal + Math.random() * (range / 2) - range / 2)), 255);
};
class $07bd345de5525519$var$ColorRGB {
    constructor({ R: R = 0, G: G = 0, B: B = 0, A: A = 255 }){
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
    }
    toObject() {
        return {
            R: this.R,
            G: this.G,
            B: this.B,
            A: this.A
        };
    }
    toObjectWNoise(mod) {
        return {
            R: $07bd345de5525519$var$shfflClr(this.R, mod),
            G: $07bd345de5525519$var$shfflClr(this.G, mod),
            B: $07bd345de5525519$var$shfflClr(this.B, mod),
            A: this.A
        };
    }
    toString() {
        return `rgba(${this.R},${this.G},${this.B},${this.A / 255})`;
    }
    interpolate(c, mul) {
        this.R = c.R + (this.R - c.R) * mul;
        this.G = c.G + (this.G - c.G) * mul;
        this.B = c.B + (this.B - c.B) * mul;
        if (c.A !== this.A) this.A = c.A + (this.A - c.A) * mul;
    }
}
var $07bd345de5525519$export$2e2bcd8739ae039 = $07bd345de5525519$var$ColorRGB;


class $b4d2f4c9c0bf1d86$var$Vector2D {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    subScalar(scalar) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x - scalar, this.y - scalar);
    }
    addScalar(scalar) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x + scalar, this.y + scalar);
    }
    divScalar(scalar) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x / scalar, this.y / scalar);
    }
    mulScalar(scalar) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x * scalar, this.y * scalar);
    }
    selfSubScalar(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }
    selfAddScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }
    selfDivScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    selfMulScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    /** returns a new vector object */ sub(v) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x - v.x, this.y - v.y);
    }
    /** returns a new vector object */ add(v) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x + v.x, this.y + v.y);
    }
    /** returns a new vector object */ mul(v) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x * v.x, this.y * v.y);
    }
    /** returns a new vector object */ div(v) {
        return new $b4d2f4c9c0bf1d86$var$Vector2D(this.x / v.x, this.y / v.y);
    }
    /** modifies the current vector */ selfSub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /** modifies the current vector */ selfAdd(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /** modifies the current vector */ selfDiv(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /** modifies the current vector */ selfMul(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
}
var $b4d2f4c9c0bf1d86$export$2e2bcd8739ae039 = $b4d2f4c9c0bf1d86$var$Vector2D;


const $0a3286db3d5a9a1c$export$4ba62d411387299b = (data, ww, wh, dpi, resolutionPercent = 50, removeWhite = false)=>{
    //TODO create a version of this but instead it's a quad tree that finds points and groups them into quadrents, with a bound, that way we can just update the pxls in the algorithm to a bound, upon finding a bound make sure to calculate the area so we can figure out the pxl per area calculation
    //iterate through the canvas and find what parts of the canvas need particles
    const foundPoints = [];
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
    for(var i = 0; i < ww; //iterate through the coordinates skipping some based on the resolution percent, if 100 percent then we will go through all the points
    i += Math.round(ww / (ww * (resolutionPercent / 100))))for(var j = 0; j < wh; j += Math.round(wh / (wh * (resolutionPercent / 100)))){
        //find the current index based off of the x y coordinates (i and j being x and y), mul by 4 to get around all the color channels
        const n = (i + j * ww) * 4;
        const isWhite = data[n] === 255 && data[n + 1] === 255 && data[n + 2] === 255 && data[n + 3] === 255 && removeWhite;
        if (data[n + 3] > 150 && !isWhite) {
            R = data[n];
            G = data[n + 1];
            B = data[n + 2];
            A = data[n + 3];
            posX = i / dpi;
            posY = j / dpi;
            //add the particles to the found points list
            foundPoints.push({
                pos: new (0, $b4d2f4c9c0bf1d86$export$2e2bcd8739ae039)(posX, posY),
                color: new (0, $07bd345de5525519$export$2e2bcd8739ae039)({
                    R: R,
                    G: G,
                    B: B,
                    A: A
                }),
                assignedPxls: 0
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
    return {
        points: foundPoints,
        centerX: centerX / foundPoints.length,
        centerY: centerY / foundPoints.length,
        maxX: maxX,
        maxY: maxY,
        minX: minX,
        minY: minY
    };
};


const $fdf494bc63ad927e$export$247e7c31c0385b84 = (string, vertical, dpi)=>{
    if (!string) return 0;
    if (typeof string === "number") return string;
    string.trim();
    if (string.includes("px")) return parseFloat(string.split("px")[0]) * dpi;
    //return percentage
    if (string.includes("%")) return parseFloat(string.split("%")[0]) / 100 * (vertical ? particles.glSize.height * dpi : particles.glSize.width * dpi);
    return parseFloat(string);
};
const $fdf494bc63ad927e$export$9e98694894af2b6c = (string, vertical, dpi)=>{
    let operations = $fdf494bc63ad927e$export$ba2d6f449d78182f(string);
    const calcIncluded = operations.includes("calc");
    operations = $fdf494bc63ad927e$var$Parentheses(operations).layer;
    operations = $fdf494bc63ad927e$export$6b9d25511386687c(operations);
    if (calcIncluded) {
        console.log("seperating div");
        operations = $fdf494bc63ad927e$var$MulDivSeperation(operations);
    }
    const result = $fdf494bc63ad927e$var$RunCalcOnLayer(operations, vertical, dpi ?? 1);
    return result;
// console.log(operations);
// //go through and set up the parts split up by parenthesis
// const depths = Parentheses(operations);
// //run a function to make sure we use the * and / operations first
// const depths2 = MulDivSeperation(depths.layer);
// //run the calculations on the new nested array we have
// const result = RunCalcOnLayer(depths2, vertical);
// return result;
};
const $fdf494bc63ad927e$export$6b9d25511386687c = (operations)=>{
    for(let i = 0; i < operations.length; i++){
        if (typeof operations[i] === "object") operations[i] = $fdf494bc63ad927e$export$6b9d25511386687c(operations[i]);
        if (operations[i] === "calc" || operations[i] === "min") {
            if (typeof operations[i + 1] === "object") operations[i + 1] = $fdf494bc63ad927e$export$6b9d25511386687c(operations[i + 1]);
            if (operations.length > 2) {
                operations[i] = [
                    operations[i],
                    operations[i + 1]
                ];
                operations = operations.slice(0, i).concat([
                    operations[i]
                ]).concat(operations.slice(i + 2, operations.length));
            }
        }
    }
    return operations;
};
const $fdf494bc63ad927e$export$ba2d6f449d78182f = (string)=>{
    if (!string) return [];
    const operations = string.trim().replace(/\s/g, "").split(/(-)|(\+)|(\/)|(\*)|(\()|(\))|(\,)/).filter((s)=>s !== undefined && s !== "");
    return operations;
};
const $fdf494bc63ad927e$var$RunCalcOnLayer = (layer, vertical, dpi, pFunc)=>{
    while(layer.length > 2){
        if (typeof layer[0] === "object") layer[0] = $fdf494bc63ad927e$var$RunCalcOnLayer(layer[0], vertical, dpi);
        if (typeof layer[2] === "object") layer[2] = $fdf494bc63ad927e$var$RunCalcOnLayer(layer[2], vertical, dpi);
        if (layer[1] === "+") {
            layer[0] = $fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi) + $fdf494bc63ad927e$export$247e7c31c0385b84(layer[2], vertical, dpi);
            layer = [
                layer[0]
            ].concat(layer.slice(3, layer.length));
        }
        if (layer[1] === "-") {
            layer[0] = $fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi) - $fdf494bc63ad927e$export$247e7c31c0385b84(layer[2], vertical, dpi);
            layer = [
                layer[0]
            ].concat(layer.slice(3, layer.length));
        }
        if (layer[1] === "/") {
            layer[0] = $fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi) / $fdf494bc63ad927e$export$247e7c31c0385b84(layer[2], vertical, dpi);
            layer = [
                layer[0]
            ].concat(layer.slice(3, layer.length));
        }
        if (layer[1] === "*") {
            layer[0] = $fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi) * $fdf494bc63ad927e$export$247e7c31c0385b84(layer[2], vertical, dpi);
            layer = [
                layer[0]
            ].concat(layer.slice(3, layer.length));
        }
        //odds are this is because we are currently in a function so lets figure out which function we are in and add this to the calculations
        if (layer[1] === ",") {
            if (pFunc === "min") layer[0] = Math.min($fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi), $fdf494bc63ad927e$export$247e7c31c0385b84(layer[2], vertical, dpi));
            if (pFunc === "max") layer[0] = Math.max($fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi), $fdf494bc63ad927e$export$247e7c31c0385b84(layer[2], vertical, dpi));
            layer = [
                layer[0]
            ].concat(layer.slice(3, layer.length));
        }
    }
    if (layer.length === 2) {
        if (layer[0] === "min") layer[0] = $fdf494bc63ad927e$var$RunCalcOnLayer(layer[1], vertical, dpi, "min");
        else if (layer[0] === "calc") layer[0] = $fdf494bc63ad927e$var$RunCalcOnLayer(layer[1], vertical, dpi);
        else if (layer[0] === "max") layer[0] = $fdf494bc63ad927e$var$RunCalcOnLayer(layer[1], vertical, dpi, "max");
    }
    if (layer.length === 1) {
        if (typeof layer[0] === "string") layer[0] = $fdf494bc63ad927e$export$247e7c31c0385b84(layer[0], vertical, dpi);
    }
    return layer[0];
};
const $fdf494bc63ad927e$var$MulDivSeperation = (layers)=>{
    for(let i = 0; i < layers.length; i++){
        while((layers[i] === "*" || layers[i] === "/") && layers.length > 3){
            const leftSide = layers[i - 1];
            const operation = layers[i];
            if (typeof layers[i + 1] === "object") //@ts-ignore
            layers[i + 1] = $fdf494bc63ad927e$var$MulDivSeperation(layers[i + 1]);
            const rightSide = layers[i + 1];
            layers = layers.slice(0, Math.max(i - 1, 0))// @ts-ignore
            .concat([
                [
                    leftSide,
                    operation,
                    rightSide
                ]
            ]).concat(layers.slice(i + 2, layers.length));
        }
        if (typeof layers[i] === "object") //@ts-ignore
        layers[i] = $fdf494bc63ad927e$var$MulDivSeperation(layers[i]);
    }
    return layers;
};
//create nested arrays for each grouped equation by parenthesis
const $fdf494bc63ad927e$var$Parentheses = (operations)=>{
    let removedIndex = 0;
    //go through all the operations we have found
    for(let i = 0; i < operations.length; i++){
        //if we find a new parenthesis go down into it
        if (operations[i] === ")") return {
            layer: operations.slice(0, i),
            index: i + removedIndex
        };
        if (operations[i] === "(") {
            const { layer: layer, index: index } = $fdf494bc63ad927e$var$Parentheses(operations.slice(i + 1, operations.length));
            //add the layer to the current operations, it will return a nested array
            operations = operations.slice(0, i)//@ts-ignore
            .concat([
                layer
            ]).concat(operations.slice(i + index + 2, operations.length));
            removedIndex += index + 1;
        }
    }
    return {
        layer: operations,
        index: operations.length
    };
};


const $a748815c5903fd7c$var$createLinearGradient = (ctx, grad)=>{
    const gradient = ctx.createLinearGradient(grad.x0, grad.y0, grad.x1, grad.y1);
    for(let i = 0; i < grad.stops.length; i++){
        const stop = grad.stops[i];
        gradient.addColorStop(stop.offset, stop.color);
    }
    return gradient;
};
const $a748815c5903fd7c$var$createConicGradient = (ctx, grad)=>{
    const gradient = ctx.createConicGradient(grad.startAngle, grad.x, grad.y);
    for(let i = 0; i < grad.stops.length; i++){
        const stop = grad.stops[i];
        gradient.addColorStop(stop.offset, stop.color);
    }
    return gradient;
};
const $a748815c5903fd7c$var$createPattern = (ctx, pattern)=>{
    if (pattern.image) {
        const canvasPattern = ctx.createPattern(pattern.image, pattern.repetition);
        if (canvasPattern) ctx.fillStyle = canvasPattern;
    }
};
const $a748815c5903fd7c$var$createRadialGradient = (ctx, grad)=>{
    const gradient = ctx.createRadialGradient(grad.x0, grad.y0, grad.r0, grad.x1, grad.y1, grad.r1);
    for(let i = 0; i < grad.stops.length; i++){
        const stop = grad.stops[i];
        gradient.addColorStop(stop.offset, stop.color);
    }
    return gradient;
};
const $a748815c5903fd7c$var$getFillStyle = (ctx, input)=>{
    if (input.color?.image) $a748815c5903fd7c$var$createPattern(ctx, input.color);
    else if (input?.color?.stops) {
        if (input?.color?.r0 !== undefined) ctx.fillStyle = $a748815c5903fd7c$var$createRadialGradient(ctx, input.color);
        else if (input?.color?.startAngle !== undefined) ctx.fillStyle = $a748815c5903fd7c$var$createConicGradient(ctx, input.color);
        else ctx.fillStyle = $a748815c5903fd7c$var$createLinearGradient(ctx, input.color);
    } else if (typeof input.color === "string") ctx.fillStyle = input.color;
    else ctx.fillStyle = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.random() * 0.25 + 0.75})`;
};
const $a748815c5903fd7c$var$getRenderPos = (input, ww, wh, dpi, ihw, ihh)=>{
    const xOffset = (0, $fdf494bc63ad927e$export$9e98694894af2b6c)(input?.xPos ?? "50%", false, dpi) - (ihw ?? 0);
    const yOffset = (0, $fdf494bc63ad927e$export$9e98694894af2b6c)(input?.yPos ?? "50%", true, dpi) - (ihh ?? 0);
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
    return {
        xOffset: xOffset,
        yOffset: yOffset
    };
};
const $a748815c5903fd7c$var$adjustRenderPosition = (ctx, input, ww, wh, dpi, ihw, ihh)=>{
    const { xOffset: xOffset, yOffset: yOffset } = $a748815c5903fd7c$var$getRenderPos(input, ww, wh, dpi, ihw, ihh);
    ctx.translate(xOffset, yOffset);
    if (input.rotDeg) ctx.rotate(input.rotDeg * Math.PI / 180);
};
const $a748815c5903fd7c$export$9568c1ca27873c43 = (input, ctx, ww, wh, dpi)=>{
    ctx.save();
    //apply the font and style of text we want
    ctx.font = `${input?.fontWeight ?? "bold"} ${input?.fontSize ? (0, $fdf494bc63ad927e$export$247e7c31c0385b84)(input?.fontSize, false, dpi) + "px" : `${70 * dpi}px`} ${input?.font ?? "sans-serif"}`;
    ctx.textAlign = input?.align ?? "center";
    if (input.filter) ctx.filter = input.filter;
    $a748815c5903fd7c$var$getFillStyle(ctx, input);
    $a748815c5903fd7c$var$adjustRenderPosition(ctx, input, ww, wh, dpi);
    //move the render position, so if you have a fill gradient or image it can move the position of the fillstyle
    ctx.translate(input.fillOffset?.x ?? 0, input.fillOffset?.y ?? 0);
    // stamp the text onto the canvas
    ctx.fillText(input.text, -(input.fillOffset?.x ?? 0), -(input.fillOffset?.y ?? 0));
    ctx.restore();
};
const $a748815c5903fd7c$export$cfd4ebe24ed1762d = (input, ctx, ww, wh, dpi)=>{
    ctx.save();
    //prep up the stamp with data we passed through, scaling, positioning, rotation.
    const { image: image, xPos: xPos, yPos: yPos, scaleX: scaleX, scaleY: scaleY } = input;
    const aspectRatio = image.height / image.width;
    let iw = (input?.width ?? 200) * dpi;
    let ih = (input?.height ?? 200) * dpi;
    if (aspectRatio < 1) {
        iw = iw * (scaleX ?? 1);
        ih = ih * aspectRatio * (scaleY ?? 1);
    } else {
        iw = iw / aspectRatio * (scaleX ?? 1);
        ih = ih * (scaleY ?? 1);
    }
    const ihw = iw / 2;
    const ihh = ih / 2;
    if (input.filter) ctx.filter = input.filter;
    $a748815c5903fd7c$var$adjustRenderPosition(ctx, input, ww, wh, dpi, ihw, ihh);
    //stamp the image onto the canvas
    ctx.drawImage(image, 0, 0, iw, ih);
    ctx.restore();
};


const $9d8afc01b3046417$export$80c6a6d5389972de = (canvasEl)=>{
    //intialize the ctx context for rendering images and other things to the canvas
    const Ctx = canvasEl.getContext("2d", {
        willReadFrequently: true
    });
    particles.readerCE = canvasEl;
    particles.readerCE.width = particles.glSize.width * particles.dpi;
    particles.readerCE.height = particles.glSize.height * particles.dpi;
    particles.readerSize.width = canvasEl.width;
    particles.readerSize.height = canvasEl.height;
    //set up the actual ctx on our global object
    if (Ctx) particles.ctx = Ctx;
    //create the functions for the canvas reader
    const updateCTXForProcessing = (inputs)=>{
        let renderedToCanvas = false;
        if (particles.ctx) {
            particles.ctx.clearRect(0, 0, particles.readerSize.width, particles.readerSize.height);
            for(let l = 0; l < inputs.length; l++){
                const renderTask = inputs[l];
                //if the user wants text to be the thing that particles show then get the positions from text
                if (renderTask?.text) {
                    const input = renderTask;
                    (0, $a748815c5903fd7c$export$9568c1ca27873c43)(input, particles.ctx, particles.readerSize.width, particles.readerSize.height, particles.dpi);
                    renderedToCanvas = true;
                //if the user wants an image to be the thing we render
                } else if (renderTask?.image) {
                    const input = renderTask;
                    (0, $a748815c5903fd7c$export$cfd4ebe24ed1762d)(input, particles.ctx, particles.readerSize.width, particles.readerSize.height, particles.dpi);
                    renderedToCanvas = true;
                }
            }
        }
        return renderedToCanvas;
    };
    const addInputs = (gInput)=>{
        if (particles.ctx) {
            const { inputs: inputs } = gInput;
            if (inputs.length > 0) {
                //iterate through all of the inputs passed in and render them to the canvas
                const renderedToCanvas = updateCTXForProcessing(inputs);
                if (renderedToCanvas) {
                    // console.log(sizeRef.current.width);
                    const image = particles.ctx.getImageData(0, 0, particles.readerSize.width, particles.readerSize.height).data;
                    const pointData = (0, $0a3286db3d5a9a1c$export$4ba62d411387299b)(image, particles.readerSize.width, particles.readerSize.height, particles.dpi, Math.min(Math.max(gInput?.resPerc ?? particles.options.resolutionPercent, 5), 100), gInput?.removeWhite ?? false);
                    particles.ctx.clearRect(0, 0, particles.readerSize.width, particles.readerSize.height);
                    if (gInput.shufflePoints) pointData.points = (0, $fd76de704c8e1ed8$export$448332262467e042)(pointData.points);
                    particles.addFromPoints(pointData, gInput);
                }
            }
        }
    };
    console.log("adding canvas reader input group function");
    particles.addInputGroup = addInputs;
    return true;
};


const $387d0f7e7e285f95$export$ae13f218d77f4aa5 = ()=>{
    const setDPI = (dpi)=>{
        const parentElement = particles.glCE.parentElement;
        if (parentElement) {
            particles.glSize.width = parentElement.clientWidth;
            particles.glSize.height = parentElement.clientHeight;
        }
        if (particles.gl && particles.glCE) {
            particles.glCE.width = particles.glSize.width * dpi;
            particles.glCE.height = particles.glSize.height * dpi;
            particles.gl.viewport(0, 0, particles.glSize.width * dpi, particles.glSize.height * dpi);
            if (dpi !== particles.dpi) {
                particles.dpi = dpi;
                particles.lastDPIUpdate = new Date().getTime();
            }
        }
    };
    particles.setDpi = setDPI;
};


const $a094ea4bc3babe6e$export$7d59a95b08a31ddb = (groups, amountOfParticles, prtcleCnt, groupID, settings)=>{
    let ranges = [];
    let startRange = settings.backgroundParticleCount;
    //go through all the current groups and get all the unassigned particle ranges
    const keys = Object.keys(groups).sort((a, b)=>{
        return groups[Number(a)]?.startIndx > groups[Number(b)]?.startIndx ? 1 : -1;
    });
    for(const i in keys){
        const key = keys[i];
        const group = groups[Number(key)];
        if (Number(key) === groupID) {
            ranges = [
                {
                    startIndx: group.startIndx,
                    endIndx: group.endIndx
                }
            ];
            startRange = prtcleCnt - 1;
            break;
        }
        ranges.push({
            startIndx: startRange,
            endIndx: group.startIndx
        });
        startRange = group.endIndx;
    }
    //just add the open space from the last groups ending index to the end of the total particles that we have.
    ranges.push({
        startIndx: startRange,
        endIndx: prtcleCnt - 1
    });
    ranges = ranges.filter((v)=>v.endIndx - v.startIndx !== 0 && v.endIndx + 1 - v.startIndx >= amountOfParticles);
    //if we couldn't find an open spot then we can't add in the new group
    if (ranges.length === 0) return null;
    return {
        startIndx: ranges[0].startIndx,
        endIndx: ranges[0].startIndx + amountOfParticles - 1
    };
};
const $a094ea4bc3babe6e$export$5756766be247d04a = (groupIds, groups)=>{
    let ranges = [];
    let startIndx = -1;
    let endIndx = -1;
    for(const i in groupIds)if (groups[groupIds[i]]) {
        const group = groups[groupIds[i]];
        if (startIndx === -1) {
            startIndx = group.startIndx;
            endIndx = group.endIndx;
        } else if (endIndx === group.startIndx) endIndx = group.endIndx;
        else {
            ranges.push({
                startIndx: startIndx,
                endIndx: endIndx
            });
            startIndx = group.startIndx;
            endIndx = group.endIndx;
        }
    }
    ranges.push({
        startIndx: startIndx,
        endIndx: endIndx
    });
    return ranges;
};
const $a094ea4bc3babe6e$export$b43e6018b4251d8 = (data, name, updatedBuffer, numComponents)=>{
    const { gl: gl, deps: deps, startIndx: indx, amountOfParticles: amountOfParticles } = data;
    //bind a buffer
    const startIndx = Math.max(0, indx);
    gl.bindBuffer(gl.ARRAY_BUFFER, deps.buffers[`${name}0`].buffer);
    //update the buffer partially
    gl.bufferSubData(gl.ARRAY_BUFFER, numComponents * 4 * startIndx, updatedBuffer, 0, amountOfParticles * numComponents);
    //repeat for the other buffer, (since we are doing transform feedback buffers we need to of each buffer, mainly the transform feedback ones but yeah)
    gl.bindBuffer(gl.ARRAY_BUFFER, deps.buffers[`${name}1`].buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, numComponents * 4 * startIndx, updatedBuffer, 0, amountOfParticles * numComponents);
};


const $50aeaa6f03058fc7$export$79681a703695403c = (val, range)=>{
    if (val.includes("%")) return $50aeaa6f03058fc7$export$3e0fb0d8b73ffa72(val, range ?? 1);
    else if (val.includes("px")) return $50aeaa6f03058fc7$var$convertPx(val);
    else return $50aeaa6f03058fc7$var$stringToNum(val);
};
const $50aeaa6f03058fc7$var$convertPx = (i)=>{
    const num = Number(i?.split("px")?.[0]);
    if (!isNaN(num)) return num;
    return 0;
};
const $50aeaa6f03058fc7$var$stringToNum = (i)=>{
    const num = Number(i);
    if (!isNaN(num)) return num;
    return 0;
};
const $50aeaa6f03058fc7$export$3e0fb0d8b73ffa72 = (i, range)=>{
    const num = Number(i.split("%")?.[0]);
    if (!isNaN(num)) return num / 100 * range;
    return 0;
};
const $50aeaa6f03058fc7$export$34e7c61dc139093c = (i, range)=>{
    const num = Number(i.split("%")?.[0]);
    if (!isNaN(num)) return {
        percent: num,
        number: num / 100 * range
    };
    return {
        percent: 0,
        number: 0
    };
};
const $50aeaa6f03058fc7$export$7f975da9ac28e521 = (i, j, range)=>{
    if (i.includes("%")) {
        const { percent: percent } = $50aeaa6f03058fc7$export$34e7c61dc139093c(i, range);
        if (j.includes("%")) {
            const { percent: pj } = $50aeaa6f03058fc7$export$34e7c61dc139093c(j, range);
            return `${percent + pj}%`;
        } else if (j.includes("px")) {
            const num = $50aeaa6f03058fc7$var$convertPx(j);
            return `${percent + num / range * 100}%`;
        } else return `${percent}%`;
    } else if (i.includes("px")) {
        const num = $50aeaa6f03058fc7$var$convertPx(i);
        if (j.includes("%")) {
            const jnum = $50aeaa6f03058fc7$export$3e0fb0d8b73ffa72(j, range);
            return `${num + jnum}px`;
        } else if (j.includes("px")) {
            const jnum = $50aeaa6f03058fc7$var$convertPx(j);
            return `${num + jnum}px`;
        } else return `${num}px`;
    } else return `0px`;
};
const $50aeaa6f03058fc7$export$68a8a9dfa699b192 = (inputs)=>{
    let xPos = inputs[0].xPos;
    let yPos = inputs[0].yPos;
    let scaleX = "100%";
    let scaleY = "100%";
    let rot = 0;
    for(const i in inputs){
        const input = inputs[i];
    }
};


const $97d1bb167d3a10d8$export$98a5a3f45f7b7cf2 = ()=>{
    const disableGroups = (groupIds)=>{
        for(const indx in groupIds){
            const groupId = groupIds[indx];
            if (particles.pGroups[groupId]) particles.pGroups[groupId].enabled = false;
        }
    };
    const enableGroups = (groupIds)=>{
        for(const indx in groupIds){
            const groupId = groupIds[indx];
            if (particles.pGroups[groupId]) particles.pGroups[groupId].enabled = true;
        }
    };
    const setGroupLifetime = (groupIds, lifetime, offset)=>{
        if (particles.gl && particles.glDeps) {
            const ranges = (0, $a094ea4bc3babe6e$export$5756766be247d04a)(groupIds, particles.pGroups);
            const rOffset = offset ?? particles.options.lifetimeOffsetRng;
            for(const i in ranges){
                const range = ranges[i];
                const lifetimeBuffer = new Float32Array(range.endIndx - range.startIndx).map(()=>{
                    return lifetime + (Math.random() * (rOffset * 2) - rOffset);
                });
                const gsbdp = {
                    gl: particles.gl,
                    deps: particles.glDeps,
                    startIndx: range.startIndx,
                    amountOfParticles: range.endIndx - range.startIndx
                };
                (0, $a094ea4bc3babe6e$export$b43e6018b4251d8)(gsbdp, "lifetime", lifetimeBuffer, 1);
            }
            particles.gl.bindBuffer(particles.gl.ARRAY_BUFFER, null);
            for(const i in groupIds){
                const id = groupIds[i];
                if (particles.pGroups[id]) particles.pGroups[id].lifetime = lifetime + rOffset * 2;
            }
        }
    };
    const deleteAllGroups = (useLifetime)=>{
        if (useLifetime) //just set every possible group's lifetime to 0 so they fade away
        setGroupLifetime(new Array(particles.options.maxGroups).map((v, i)=>i), 0);
    };
    const addFromPoints = (pointData, gInput)=>{
        if (particles.gl && particles.glDeps && particles.pGroups) {
            const { points: points } = pointData;
            const centerX = (0, $50aeaa6f03058fc7$export$79681a703695403c)("50%", (particles.glCE?.width ?? particles.glSize.width * particles.dpi) / particles.dpi);
            const centerY = (0, $50aeaa6f03058fc7$export$79681a703695403c)("50%", (particles.glCE?.height ?? particles.glSize.height * particles.dpi) / particles.dpi);
            const amountOfParticles = gInput?.allocatedParticles ?? 1000;
            const group = gInput.group;
            //find an unassigned group
            group;
            const gl = particles.gl;
            const deps = particles.glDeps;
            const groups = particles.pGroups;
            const range = (0, $a094ea4bc3babe6e$export$7d59a95b08a31ddb)(groups, amountOfParticles, particles.options.prtcleCnt, group, particles.options);
            if (range) {
                const { startIndx: startIndx } = range;
                //iteration amount
                const ia = points.length / amountOfParticles;
                const getRandIa = (indx)=>{
                    const newIdx = Math.floor(Math.random() * ia + indx);
                    return Math.floor(newIdx >= points.length ? indx : newIdx);
                };
                const updatedBuffer = new Float32Array(amountOfParticles * 3);
                //updated color buffer - ubc
                const ucb = new Float32Array(amountOfParticles * 4);
                //update lifetime (in case the previous group owner deleted them and they now have a lifetime of 0)
                const lifetimeBuffer = new Float32Array(amountOfParticles).fill(-1);
                //assign the new buffer data based off of the point data we get from the canvas render.
                const pdr = gInput.prtclDstRng ?? particles.options.prtclDstRng;
                for(let i = 0; i < amountOfParticles; i++){
                    const point = points[getRandIa(Math.floor(i * ia))];
                    const bfi1 = i * 3;
                    const bfi2 = i * 4;
                    const offsetX = Math.random() * pdr * 2 - pdr;
                    const offsetY = Math.random() * pdr * 2 - pdr;
                    updatedBuffer[bfi1] = (point?.pos?.x ?? 0) - centerX + offsetX;
                    updatedBuffer[bfi1 + 1] = (point?.pos?.y ?? 0) - centerY + offsetY;
                    updatedBuffer[bfi1 + 2] = group;
                    ucb[bfi2] = (point?.color?.R ?? 0) / 255;
                    ucb[bfi2 + 1] = (point?.color?.G ?? 0) / 255;
                    ucb[bfi2 + 2] = (point?.color?.B ?? 0) / 255;
                    ucb[bfi2 + 3] = 1;
                }
                const gsbdp = {
                    gl: gl,
                    deps: deps,
                    startIndx: startIndx,
                    amountOfParticles: amountOfParticles
                };
                const hitbox = {
                    offsetX: (pointData.maxX + pointData.minX) / 2 - centerX,
                    offsetY: (pointData.maxY + pointData.minY) / 2 - centerY,
                    width: pointData.maxX - pointData.minX,
                    height: pointData.maxY - pointData.minY
                };
                //update the dest position buffer
                (0, $a094ea4bc3babe6e$export$b43e6018b4251d8)(gsbdp, "dest", updatedBuffer, 3);
                //update the dest color buffer
                (0, $a094ea4bc3babe6e$export$b43e6018b4251d8)(gsbdp, "dest_color", ucb, 4);
                //reset the lifetime on the particles
                (0, $a094ea4bc3babe6e$export$b43e6018b4251d8)(gsbdp, "lifetime", lifetimeBuffer, 1);
                //unbind the buffers
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                particles.pGroups[group] = {
                    startIndx: startIndx,
                    endIndx: amountOfParticles + startIndx,
                    xPos: gInput.xPos ?? "50%",
                    yPos: gInput.yPos ?? "50%",
                    scaleX: gInput?.scaleX ?? "100%",
                    scaleY: gInput?.scaleY ?? "100%",
                    rot: (gInput?.rot ?? 0) / 180 * 3.14,
                    action: gInput?.action,
                    enabled: gInput?.enabled ?? true,
                    radius: gInput?.radius ?? 6,
                    hitbox: hitbox,
                    clickCallback: gInput.clickCallback
                };
            }
        }
    };
    particles.addFromPoints = addFromPoints;
    particles.deleteAllGroups = deleteAllGroups;
    particles.setGroupLifetime = setGroupLifetime;
    particles.enableGroups = enableGroups;
    particles.disableGroups = disableGroups;
    particles.groupAction = (action, group)=>{
        if (particles.pGroups[group]) particles.pGroups[group].action = action;
    };
    return true;
};


const $a133016631cbb846$var$adjustSize = ()=>{
    //TODO adjust the particles.glSize.width and particles.glSize.height to be the new size of the canvas by using the parent element
    const parentElement = particles.glCE.parentElement;
    if (parentElement) {
        particles.glSize.width = parentElement.clientWidth;
        particles.glSize.height = parentElement.clientHeight;
    }
    if (particles.gl && particles.glCE) {
        particles.glCE.width = particles.glSize.width * particles.dpi;
        particles.glCE.height = particles.glSize.height * particles.dpi;
        particles.gl.viewport(0, 0, particles.glSize.width * particles.dpi, particles.glSize.height * particles.dpi);
    }
    if (particles.ctx && particles.readerCE) {
        particles.readerCE.width = particles.glSize.width * particles.dpi;
        particles.readerCE.height = particles.glSize.height * particles.dpi;
        particles.readerSize.width = particles.readerCE.width;
        particles.readerSize.height = particles.readerCE.height;
    }
};
const $a133016631cbb846$var$handleWindowVisibility = (e)=>{
    if (particles.enabled) {
        if (document.visibilityState === "visible") {
            if (particles.glDeps) {
                //update the last render time, that way it isn't like 20 seconds since last render and it doesn't move the particles all around the screen trying to compensate
                particles.glDeps.lastRenderTime = performance.now();
                particles.loop();
            }
        } else cancelAnimationFrame(particles.animFrameCBNum);
    }
};
const $a133016631cbb846$export$67fe4b7c347780bf = ()=>{
    window.addEventListener("visibilitychange", $a133016631cbb846$var$handleWindowVisibility);
    window.addEventListener("resize", $a133016631cbb846$var$adjustSize);
};
const $a133016631cbb846$export$8b60ad1407aa78d4 = ()=>{
    window.removeEventListener("resize", $a133016631cbb846$var$adjustSize);
    window.removeEventListener("visibilitychange", $a133016631cbb846$var$handleWindowVisibility);
};


const $e10e7b025c1e1c92$export$4436b5a83ca0ea9a = (gl, deps)=>{
    // gl.deleteBuffer(deps.buffers)
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    console.log(deps);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    for(const name in deps.tfbs){
        const tfb = deps.tfbs[name].tfb;
        gl.deleteTransformFeedback(tfb);
    }
    for(const name in deps.buffers){
        const buffer = deps.buffers[name];
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, 1, buffer.drawType);
        gl.deleteBuffer(buffer.buffer);
    }
    gl.bindVertexArray(null);
    for(const name in deps.vaos){
        const vao = deps.vaos[name];
        gl.deleteVertexArray(vao.vao);
    }
    gl.useProgram(null);
    for(const name in deps.programs){
        const program = deps.vaos[name];
        gl.deleteProgram(program);
    }
    for(const name in deps.data){
        const data = deps.data[name];
        delete deps.data[name];
    }
};


const $1b7019f4d50ff473$export$d7038d569a79a421 = (canvas)=>{
    const gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl");
    if (gl) //this sets up the clip space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    return gl;
};


const $526aebb0064f0b4d$export$6a8b948c2f92957b = (options)=>{
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


const $4e85daa4cd17398a$var$drag = 0.985;
const $4e85daa4cd17398a$var$destDrag = 0.93;
const $4e85daa4cd17398a$var$destIntensity = 200.1;
const $4e85daa4cd17398a$export$e053446e67b15e98 = (options)=>{
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
      new_vel.x *= ${$4e85daa4cd17398a$var$drag};
      new_vel.y *= ${$4e85daa4cd17398a$var$drag};
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
          toDest /= ${$4e85daa4cd17398a$var$destIntensity};
          new_vel.x = (new_vel.x + toDest.x * clamp(dt,0.0,2.0)) * ${$4e85daa4cd17398a$var$destDrag};
          new_vel.y = (new_vel.y + toDest.y * clamp(dt,0.0,2.0)) * ${$4e85daa4cd17398a$var$destDrag};

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


const $a13f2a0380a874c9$export$ec5db564352962b = (gl, buffers, data, VAO, nameExtension)=>{
    let vertexAttribArray = 0;
    //create buffer function
    const createBuffer = (name, numComponents, drawType, divisor)=>{
        //create and bind the buffer with it's data and attribs
        //TODO make sure we can create the buffer when a vbo is bound.
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data[name].data, drawType);
        gl.vertexAttribPointer(vertexAttribArray, numComponents, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexAttribArray);
        //enable a divisor for instanced geometry
        if (divisor) gl.vertexAttribDivisor(vertexAttribArray, divisor);
        if (buffer) {
            buffers[name + nameExtension] = {
                buffer: buffer,
                numComponents: numComponents,
                attribLoc: vertexAttribArray,
                divisor: divisor,
                drawType: drawType,
                type: "Float32Array",
                associatedProgram: "particles",
                associatedVAO: VAO.name
            };
            //add the buffer into the current vao
            VAO.buffers.push(name + nameExtension);
        }
        vertexAttribArray++;
    };
    //create the buffers
    createBuffer("verts", 2, gl.STATIC_DRAW);
    createBuffer("offset_vels", 4, gl.DYNAMIC_COPY, 1);
    createBuffer("dest", 3, gl.DYNAMIC_COPY, 1);
    createBuffer("color", 4, gl.DYNAMIC_COPY, 1);
    createBuffer("dest_color", 4, gl.DYNAMIC_COPY, 1);
    createBuffer("radius", 1, gl.DYNAMIC_COPY, 1);
    createBuffer("lifetime", 1, gl.DYNAMIC_COPY, 1);
    //unbind the buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};


const $ac19ccdde9fcfd46$export$719578037a5e3556 = (width, height, options)=>{
    const data = {};
    $ac19ccdde9fcfd46$var$createVertexData(data);
    $ac19ccdde9fcfd46$var$createOffsetVelocities(data, width, height, options.prtcleCnt);
    $ac19ccdde9fcfd46$var$createDestData(data, options.prtcleCnt);
    $ac19ccdde9fcfd46$var$createColorDataWDest(data, options.prtcleCnt);
    $ac19ccdde9fcfd46$var$createRadiusData(data, options.prtcleCnt);
    $ac19ccdde9fcfd46$var$createLifetimeData(data, options.prtcleCnt);
    return data;
};
const $ac19ccdde9fcfd46$var$createVertexData = (dataObj)=>{
    const verts = new Float32Array([
        0,
        -0.01
    ]);
    //dividing by 2 because that's the kind of vec it is a vec2
    dataObj["verts"] = {
        instances: verts.length / 2,
        data: verts
    };
};
const $ac19ccdde9fcfd46$var$createDestData = (dataObj, instances)=>{
    const dest = new Float32Array(3 * instances);
    for(let i = 0; i < instances * 3; i += 3){
        dest[i] = 0;
        dest[i + 1] = 0;
        dest[i + 2] = -1; //the third index defines what group the particle belongs to
    }
    dataObj.dest = {
        instances: instances,
        data: dest
    };
};
const $ac19ccdde9fcfd46$var$createColorDataWDest = (dataObj, instances)=>{
    const color = new Float32Array(4 * instances);
    const colorDest = new Float32Array(4 * instances);
    for(let i = 0; i < instances * 4; i += 4){
        color[i] = 0;
        color[i + 1] = 0;
        color[i + 2] = 0;
        color[i + 3] = 0.9;
        colorDest[i] = 0;
        colorDest[i + 1] = 0;
        colorDest[i + 2] = 0;
        colorDest[i + 3] = 0.4;
    }
    dataObj.color = {
        instances: instances,
        data: color
    };
    dataObj.dest_color = {
        instances: instances,
        data: colorDest
    };
};
const $ac19ccdde9fcfd46$var$createRadiusData = (data, instances)=>{
    const radius = new Float32Array(instances);
    for(let i = 0; i < instances; i++)radius[i] = i / 4 < 1000 ? Math.random() * 2 + 1 : 0; //radius
    data.radius = {
        instances: instances,
        data: radius
    };
};
const $ac19ccdde9fcfd46$var$createLifetimeData = (data, instances)=>{
    const lifetime = new Float32Array(instances);
    for(let i = 0; i < instances; i++)lifetime[i] = -1; //lifetime
    data.lifetime = {
        instances: instances,
        data: lifetime
    };
};
const $ac19ccdde9fcfd46$var$createOffsetVelocities = (dataObj, width, height, instances)=>{
    //technically we don't need to initialize these arrays... but we will for now
    const offset_vels = new Float32Array(4 * instances);
    for(let i = 0; i < instances * 4; i += 4){
        const option = Math.round(Math.random() * 3);
        offset_vels[i] = Math.random() * width; //x-offset
        offset_vels[i + 1] = Math.random() * height; //y-offset
        offset_vels[i + 2] = Math.random() * 0.2 - 0.1;
        offset_vels[i + 3] = Math.random() * 0.2 - 0.1;
    // offset_vels[i] = 0; //x-offset
    // offset_vels[i + 1] = 0; //y-offset
    // offset_vels[i + 2] = 0;
    // offset_vels[i + 3] = 0;
    // if (option === 0) offset_vels[i] = Math.random() * width;
    // if (option === 1) {
    //   offset_vels[i] = width;
    //   offset_vels[i + 1] = Math.random() * height;
    // }
    // if (option === 2) offset_vels[i + 1] = Math.random() * height;
    // if (option === 3) {
    //   offset_vels[i] = Math.random() * width;
    //   offset_vels[i + 1] = height;
    // }
    }
    dataObj.offset_vels = {
        instances: instances,
        data: offset_vels
    };
};


const $8bfbb7faf74e4ca5$export$327d24a04cd0dc17 = (gl, vShader, fShader, transformVaryings)=>{
    const program = gl.createProgram();
    if (program) {
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        if (transformVaryings) gl.transformFeedbackVaryings(program, transformVaryings, gl.SEPARATE_ATTRIBS);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) return program;
    }
    if (program) console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
};


const $9abb1d0f388d3658$export$1750aa77609e1fb = (gl, type, source)=>{
    const shader = gl.createShader(type);
    if (shader) {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) return shader;
    }
    if (shader) console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
};


const $0a7e6fea200da3c4$export$6435946297662bf9 = (gl, tfbs, buffers, vao, nameExtension)=>{
    const tfb = gl.createTransformFeedback();
    let tfbPointer = 0;
    const addBufferToTFB = (name)=>{
        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, tfbPointer, buffers[name].buffer);
        tfbPointer++;
    };
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tfb);
    addBufferToTFB("offset_vels" + nameExtension);
    addBufferToTFB("color" + nameExtension);
    addBufferToTFB("radius" + nameExtension);
    addBufferToTFB("lifetime" + nameExtension);
    if (tfb) {
        tfbs["tfb" + nameExtension] = {
            tfb: tfb,
            associatedProgram: "particles",
            associatedVAO: vao.name
        };
        vao.tfbs.push("tfb" + nameExtension);
    }
};


const $390619b5df586d3a$export$15b5ce5fc6765dda = (gl, program, options)=>{
    const uniforms = {};
    const addUniform = (name, type, initialData)=>{
        const uniformLoc = gl.getUniformLocation(program, name);
        if (uniformLoc) uniforms[name] = {
            loc: uniformLoc,
            type: type,
            associatedProgram: "particles"
        };
    };
    //--------- find uniform locations ------------
    addUniform("mpc", "4f");
    addUniform("md", "4f");
    addUniform("md2", "4f");
    addUniform("scroll", "2f");
    addUniform("interaction_props", "4f");
    addUniform("u_resolution", "2f");
    addUniform("u_resolution", "2f");
    addUniform("dt", "f");
    addUniform("u_matrices", "1fv");
    addUniform("group_actions", "1iv");
    addUniform("group_rads", "1fv");
    addUniform("u_time", "1f");
    addUniform("dpi", "1f");
    return uniforms;
};


const $1599f629567dcdcd$export$4494167e2ac2e123 = (gl, vaos, name, bind = true)=>{
    const vao = gl.createVertexArray();
    if (vao) vaos[name] = {
        vao: vao,
        associatedProgram: "particles",
        tfbs: [],
        buffers: [],
        name: name
    };
    if (bind) gl.bindVertexArray(vao);
};


const $1deaa4109b56ef02$export$7be957360bb71a13 = (gl, options, width, height)=>{
    //initialize the shaders
    const vs = (0, $4e85daa4cd17398a$export$e053446e67b15e98)(options);
    const vShader = (0, $9abb1d0f388d3658$export$1750aa77609e1fb)(gl, gl.VERTEX_SHADER, vs);
    const fs = (0, $526aebb0064f0b4d$export$6a8b948c2f92957b)(options);
    const fShader = (0, $9abb1d0f388d3658$export$1750aa77609e1fb)(gl, gl.FRAGMENT_SHADER, fs);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    if (vShader && fShader) {
        //initialize the program with the shaders
        const program = (0, $8bfbb7faf74e4ca5$export$327d24a04cd0dc17)(gl, vShader, fShader, [
            "v_offset_vel",
            "v_p_color",
            "v_radius",
            "v_lifetime"
        ]);
        if (program) {
            const vaos = {};
            const buffers = {};
            const tfbs = {};
            const data = (0, $ac19ccdde9fcfd46$export$719578037a5e3556)(width, height, options);
            for(let i = 0; i < 2; i++){
                //create vao
                (0, $1599f629567dcdcd$export$4494167e2ac2e123)(gl, vaos, `vao${i}`);
                (0, $a13f2a0380a874c9$export$ec5db564352962b)(gl, buffers, data, vaos[`vao${i}`], `${i}`);
                (0, $0a7e6fea200da3c4$export$6435946297662bf9)(gl, tfbs, buffers, vaos[`vao${i}`], `${i}`);
                //unbind the vertex array object
                gl.bindVertexArray(null);
            }
            const uniforms = (0, $390619b5df586d3a$export$15b5ce5fc6765dda)(gl, program, options);
            const programs = {
                particles: {
                    program: program
                }
            };
            //test for updating some buffer data
            gl.useProgram(program);
            const deps = {
                programs: programs,
                buffers: buffers,
                vaos: vaos,
                tfbs: tfbs,
                data: data,
                uniforms: uniforms,
                currentVAO: 0,
                lastRenderTime: performance.now()
            };
            return deps;
        }
    }
    return null;
};


const $7d2803555b42fd55$export$bcc055cbeafc94cf = (mouse)=>{
    if (new Date().getTime() - mouse.lastRecordedTime.getTime() > 100) mouse = {
        ...mouse,
        dx: 0,
        dy: 0,
        mag: 0,
        magSqr: 0
    };
};
const $7d2803555b42fd55$export$31401a4d76061686 = (mouse)=>{
    if (mouse.leftClick) mouse.leftClick = false;
    if (mouse.rightClick) mouse.rightClick = false;
};


let $5e23346ef23459bd$var$m3 = {
    projection: function(width, height) {
        // Note: This matrix flips the Y axis so that 0 is at the top.
        return [
            2 / width,
            0,
            0,
            0,
            -2 / height,
            0,
            -1,
            1,
            1
        ];
    },
    identity: function() {
        return [
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
        ];
    },
    translation: function(tx, ty) {
        return [
            1,
            0,
            0,
            0,
            1,
            0,
            tx,
            ty,
            1
        ];
    },
    rotation: function(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
        return [
            c,
            -s,
            0,
            s,
            c,
            0,
            0,
            0,
            1
        ];
    },
    scaling: function(sx, sy) {
        return [
            sx,
            0,
            0,
            0,
            sy,
            0,
            0,
            0,
            1
        ];
    },
    multiplyVec3: function(a, b) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        let u = {
            x: 0,
            y: 0,
            z: 0
        };
        u.x = a00 * b.x + a10 * b.y + a20 * b.z;
        u.y = a01 * b.x + a11 * b.y + a21 * b.z;
        u.z = a02 * b.x + a12 * b.y + a22 * b.z;
        return u;
    },
    multiply: function(a, b) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        const b00 = b[0];
        const b01 = b[1];
        const b02 = b[2];
        const b10 = b[3];
        const b11 = b[4];
        const b12 = b[5];
        const b20 = b[6];
        const b21 = b[7];
        const b22 = b[8];
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22
        ];
    },
    translate: function(m, tx, ty) {
        return $5e23346ef23459bd$var$m3.multiply(m, $5e23346ef23459bd$var$m3.translation(tx, ty));
    },
    rotate: function(m, angleInRadians) {
        return $5e23346ef23459bd$var$m3.multiply(m, $5e23346ef23459bd$var$m3.rotation(angleInRadians));
    },
    scale: function(m, sx, sy) {
        return $5e23346ef23459bd$var$m3.multiply(m, $5e23346ef23459bd$var$m3.scaling(sx, sy));
    }
};
var $5e23346ef23459bd$export$2e2bcd8739ae039 = $5e23346ef23459bd$var$m3;


const $79f13c7b5e90507d$export$d8a83fc4206582ff = (matrix, group, mouse, xPos, yPos)=>{
    const u = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).multiplyVec3(matrix, {
        x: mouse.x - xPos,
        y: mouse.y - yPos,
        z: 1
    });
    const boundX = u.x - (group.hitbox?.offsetX + xPos);
    const boundY = u.y - (group.hitbox?.offsetY + yPos);
    if (Math.abs(boundX) < (group.hitbox?.width ?? 0) / 2 && Math.abs(boundY) < (group.hitbox?.height ?? 0) / 2) {
        if (mouse.leftClick) group?.clickCallback?.({
            x: boundX,
            y: boundY
        });
        return true;
    }
    return false;
};




const $012e666248b5ee4f$var$getNewAttribute = (val, groupVal, actionVal, type, mode, range)=>{
    const newVal = (0, $50aeaa6f03058fc7$export$79681a703695403c)(actionVal, range);
    let newGroupVal = groupVal;
    let returnVal = val;
    if (!mode || mode === "shift") {
        returnVal += newVal;
        if (type === "both" || type === "dest" || type === "bothIndividual") newGroupVal = (0, $50aeaa6f03058fc7$export$7f975da9ac28e521)(groupVal, actionVal, range);
    } else {
        returnVal = newVal;
        if (type === "both" || type === "dest" || type === "bothIndividual") newGroupVal = actionVal;
    }
    return {
        returnVal: returnVal,
        newGroupVal: newGroupVal
    };
};
const $012e666248b5ee4f$export$405d30a0f40971da = (group, width, height)=>{
    let xPos = (0, $50aeaa6f03058fc7$export$79681a703695403c)(group.xPos, width);
    let yPos = (0, $50aeaa6f03058fc7$export$79681a703695403c)(group.yPos, height);
    let rot = group.rot;
    let scaleX = (0, $50aeaa6f03058fc7$export$79681a703695403c)(group.scaleX, 1);
    let scaleY = (0, $50aeaa6f03058fc7$export$79681a703695403c)(group.scaleY, 1);
    let radius = group.radius;
    //0 - nothing, 1 - moving pos
    let uniformAction = 0;
    if (group.action) {
        const action = group.action;
        if (action.type === "both" || action.type === "dest" || action.type === "point") {
            const { type: type, mode: mode } = action;
            if (type === "both" || type === "point") uniformAction = 1;
            //any sort of moving translating or that
            if (action?.xPos) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(xPos, group.xPos, action.xPos, action.type, action.mode, width);
                group.xPos = newGroupVal;
                xPos = returnVal;
            }
            if (action?.yPos) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(yPos, group.yPos, action.yPos, action.type, action.mode, height);
                group.yPos = newGroupVal;
                yPos = returnVal;
            }
            if (action?.rot !== undefined && action?.rot !== null) {
                if (!mode || mode === "shift") rot += action.rot / 180 * 3.14;
                else rot = action.rot / 180 * 3.14;
                if (type === "both" || type === "dest") group.rot = rot;
            }
            if (action?.scaleX) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(scaleX, group.scaleX, action.scaleX, action.type, action.mode, 1);
                group.scaleX = newGroupVal;
                scaleX = returnVal;
            }
            if (action?.scaleY) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(scaleY, group.scaleY, action.scaleY, action.type, action.mode, 1);
                group.scaleY = newGroupVal;
                scaleY = returnVal;
            }
            if (action?.radius) {
                if (action.mode === "shift" || !action.mode) {
                    radius += action.radius;
                    if (action.type === "both" || action.type === "dest") group.radius = radius;
                } else {
                    radius = action.radius;
                    if (action.type === "both" || action.type === "dest") group.radius = radius;
                }
                if ((action?.xPos || action?.yPos) && (action.type === "both" || action.type === "point")) uniformAction = 2;
                else uniformAction = 3;
            }
        } else if (action.type === "bothIndividual") {
            uniformAction = 1;
            let xPos2 = xPos + 0;
            if (action.pXPos) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(xPos, group.xPos, action.pXPos, action.type, action.pMode, width);
                xPos = returnVal;
            }
            if (action.dXPos) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(xPos2, group.xPos, action.dXPos, action.type, action.dMode, width);
                group.xPos = newGroupVal;
            }
            let yPos2 = yPos + 0;
            if (action.pYPos) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(yPos, group.yPos, action.pYPos, action.type, action.pMode, height);
                yPos = returnVal;
            }
            if (action.dYPos) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(yPos2, group.yPos, action.dYPos, action.type, action.dMode, height);
                group.yPos = newGroupVal;
            }
            if (action.dRot !== undefined && action.dRot !== null) {
                let rot2 = rot;
                if (!action.dMode || action.dMode === "shift") rot2 += action.dRot / 180 * 3.14;
                else rot2 = action.dRot / 180 * 3.14;
                group.rot = rot2;
            }
            if (action.pRot !== undefined && action.pRot !== null) {
                if (!action.pMode || action.pMode === "shift") rot += action.pRot / 180 * 3.14;
                else rot = action.pRot / 180 * 3.14;
            }
            let scaleX2 = scaleX + 0;
            if (action.pScaleX) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(scaleX, group.scaleX, action.pScaleX, action.type, action.pMode, 1);
                scaleX = returnVal;
            }
            if (action.dScaleX) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(scaleX2, group.scaleX, action.dScaleX, action.type, action.dMode, 1);
                group.scaleX = newGroupVal;
            }
            let scaleY2 = scaleY + 0;
            if (action.pScaleY) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(scaleY, group.scaleY, action.pScaleY, action.type, action.pMode, 1);
                scaleY = returnVal;
            }
            if (action.dScaleY) {
                const { returnVal: returnVal, newGroupVal: newGroupVal } = $012e666248b5ee4f$var$getNewAttribute(scaleY2, group.scaleY, action.dScaleY, action.type, action.dMode, 1);
                group.scaleY = newGroupVal;
            }
        }
    }
    group.action = undefined;
    return {
        xPos: xPos,
        yPos: yPos,
        rot: rot,
        scaleX: scaleX,
        scaleY: scaleY,
        uniformAction: uniformAction,
        radius: radius
    };
};


const $73573f57b9caf103$export$bb02d42927c12121 = (gl, deps, groups, width, height, options, mouse)=>{
    const { uniforms: uniforms } = deps;
    const groupKeys = Object.keys(groups);
    let matrices = new Array(options.maxGroups * 9).fill(0);
    const uniformActions = new Array(options.maxGroups).fill(0);
    const groupRads = new Array(options.maxGroups).fill(0);
    let usedParticles = 0;
    let cursorOverClickable = false;
    for(const key in groupKeys){
        const groupIndx = groupKeys[key];
        const group = groups[groupIndx];
        const { xPos: xPos, yPos: yPos, rot: rot, scaleX: scaleX, scaleY: scaleY, uniformAction: uniformAction, radius: radius } = (0, $012e666248b5ee4f$export$405d30a0f40971da)(group, width, height);
        //basic setting of the group position and offset and rotation and scale
        let translationMatrix = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).translation(xPos, yPos);
        const rotationMatrix = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).rotation(rot);
        const scaleMatrix = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).scaling(scaleX, scaleY);
        // Multiply the matrices.
        let matrix = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).multiply(translationMatrix, rotationMatrix);
        matrix = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).multiply(matrix, scaleMatrix);
        const indx = Number(groupIndx) * 9;
        for(let i = 0; i < 9; i++)matrices[indx + i] = matrix[i];
        uniformActions[Number(groupIndx)] = group.enabled ? uniformAction : -2;
        usedParticles = Math.max(usedParticles, group.endIndx);
        groupRads[Number(groupIndx)] = radius;
        //check if the group was clicked on
        if (group.clickCallback) {
            //do a reverse translation for the mouse cursor
            let translationMatrix2 = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).translation(xPos, yPos);
            const rotationMatrix2 = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).rotation(-rot);
            const scaleMatrix2 = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).scaling(1 / scaleX, 1 / scaleY);
            // Multiply the matrices.
            let matrix2 = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).multiply(translationMatrix2, rotationMatrix2);
            matrix2 = (0, $5e23346ef23459bd$export$2e2bcd8739ae039).multiply(matrix2, scaleMatrix2);
            if ((0, $79f13c7b5e90507d$export$d8a83fc4206582ff)(matrix2, group, mouse, xPos, yPos)) cursorOverClickable = true;
        }
        //group lifetime updates
        if (uniformAction >= 4 && uniformAction <= 7) {
            if (uniformAction >= 6) group.lifetime = radius + options.lifetimeOffsetRng * 1.25;
            else group.lifetime = (radius * 10.0 - Math.floor(radius * 10.0)) * 10000000.0 + options.lifetimeOffsetRng * 1.25;
        }
        if (group.lifetime && group?.lifetime > 0) group.lifetime -= 1;
        else if (group.lifetime !== undefined && group.lifetime <= 0) delete groups[groupIndx];
    }
    if (cursorOverClickable) document.body.style.cursor = "pointer";
    else document.body.style.cursor = "default";
    gl.uniform1fv(uniforms.u_matrices.loc, matrices);
    gl.uniform1iv(uniforms.group_actions.loc, uniformActions);
    gl.uniform1fv(uniforms.group_rads.loc, groupRads);
    return Math.max(usedParticles - options.backgroundParticleCount, 0);
};


const $04c2bc212be41f33$export$2c7c73aa854b0614 = (gl, deps, options, mouse, width, height, groups, dpi)=>{
    const { vaos: vaos, tfbs: tfbs, currentVAO: currentVAO, programs: programs, buffers: buffers, uniforms: uniforms } = deps;
    const curTFB = currentVAO + 1 >= Object.keys(vaos).length ? 0 : currentVAO + 1;
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
    gl.uniform4f(uniforms.md2.loc, mouse.mag, mouse.magSqr, mouse.leftMouseDown ? 1.0 : 0.0, 0.0);
    gl.uniform1f(uniforms.u_time.loc, performance.now());
    gl.uniform1f(uniforms.dpi.loc, dpi);
    gl.uniform2f(uniforms.scroll.loc, mouse.scrollDX, mouse.scrollDY / 7);
    // gl.uniform2f(uniforms.scroll.loc, mouse.scrollDX, mouse.scrollDY);
    gl.uniform4f(uniforms.interaction_props.loc, options.mouseInteractionFieldDistance, options.mouseInteractionFieldIntensity, options.mouseClickInteractionFieldDistance, options.mouseClickInteractionFieldIntensity);
    // console.log(width, height);
    gl.uniform2f(uniforms.u_resolution.loc, width, height);
    gl.uniform1f(uniforms.dt.loc, deltaTime / 10);
    const groupPrtcleCnt = (0, $73573f57b9caf103$export$bb02d42927c12121)(gl, deps, groups, width, height, options, mouse);
    // console.log(gl.canvas.width);
    gl.beginTransformFeedback(gl.POINTS);
    gl.drawArraysInstanced(gl.POINTS, 0, 1, options.backgroundParticleCount + groupPrtcleCnt);
    gl.endTransformFeedback();
    gl.bindVertexArray(null);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    // printResults(gl, buffers[curTFB].offset_vels, "pos");
    deps.currentVAO = currentVAO + 1 >= Object.keys(vaos).length ? 0 : currentVAO + 1;
};


const $52308254850f696a$export$f9ef67375ddc185 = ()=>{
    (0, $7d2803555b42fd55$export$bcc055cbeafc94cf)(particles.mouse);
    const curTime = new Date().getTime();
    //fps stuff
    // const timeSinceStart = curTime - fpsRef.current.timeStart;
    // if (timeSinceStart > 3000 && timeSinceStart < 12000 && controllerRef) {
    //   if (
    //     fpsRef.current.fps < 35 &&
    //     dpiRef.current.dpi > 1 &&
    //     curTime - dpiRef.current.lastUpdate > 1000
    //   ) {
    //     dpiRef.current.dpi = dpiRef.current.dpi - 0.25;
    //     dpiRef.current.lastUpdate = curTime;
    //     setDpi(dpiRef.current.dpi);
    //   }
    //   if (fpsRef.current.fps < 30) {
    //     setEnabled(false);
    //     cancelAnimationFrame(animationRef.current);
    //     if (glRef.current && glDepsRef.current) {
    //       cleanUpGL(glRef.current, glDepsRef.current);
    //     }
    //     return;
    //   }
    // }
    //render and update here
    if (particles.gl && particles.glDeps) (0, $04c2bc212be41f33$export$2c7c73aa854b0614)(particles.gl, particles.glDeps, particles.options, particles.mouse, particles.glCE?.offsetWidth ?? particles.glSize.width, particles.glCE?.offsetHeight ?? particles.glSize.height, particles.pGroups, particles.dpi);
    particles.mouse.scrollDY = 0;
    // updateFPS();
    (0, $7d2803555b42fd55$export$31401a4d76061686)(particles.mouse);
    if (particles.enabled) particles.animFrameCBNum = requestAnimationFrame($52308254850f696a$export$f9ef67375ddc185);
};


const $361f0cbb3fe966eb$export$200c484eadc8a1a7 = (x, y)=>{
    let dx = 0;
    let dy = 0;
    const now = new Date();
    //make sure we aren't recording the user moving the cursor out of the canvas and then to another position on the other side of the canvas making things flip out
    if (now.getTime() - particles.mouse.lastRecordedTime.getTime() < 100) {
        dx = x - particles.mouse.x;
        dy = y - particles.mouse.y;
    }
    const lastX = particles.mouse.x;
    const lastY = particles.mouse.y;
    //get the velocity vector properties
    const magSqr = dx * dx + dy * dy;
    const mag = Math.sqrt(magSqr);
    const nDx = mag === 0 ? mag : dx / mag;
    const nDy = mag === 0 ? mag : dy / mag;
    particles.mouse = {
        ...particles.mouse,
        x: x,
        y: y,
        lastX: lastX,
        lastY: lastY,
        dx: dx,
        dy: dy,
        magSqr: magSqr,
        mag: mag,
        nDx: nDx,
        nDy: nDy,
        lastRecordedTime: now
    };
};
const $361f0cbb3fe966eb$var$handleMouseMove = (e)=>{
    if (particles.glCE) {
        let rect = particles.glCE.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        $361f0cbb3fe966eb$export$200c484eadc8a1a7(x, y);
    }
};
const $361f0cbb3fe966eb$var$handleScrolling = (e)=>{
    particles.mouse.scrollDY = particles.mouse.scrollPosY - window.scrollY;
    particles.mouse.scrollPosY = window.scrollY;
};
const $361f0cbb3fe966eb$var$handleMouseUp = (e)=>{
    if (e.button === 0) particles.mouse = {
        ...particles.mouse,
        leftMouseDown: false
    };
    else if (e.button === 2) particles.mouse = {
        ...particles.mouse,
        rightMouseDown: false
    };
};
const $361f0cbb3fe966eb$var$handleMouseDown = (e)=>{
    if (e.button === 0) particles.mouse = {
        ...particles.mouse,
        leftMouseDown: true,
        leftClick: true
    };
    else if (e.button === 2) particles.mouse = {
        ...particles.mouse,
        rightMouseDown: true,
        rightClick: true
    };
};
const $361f0cbb3fe966eb$var$handleTouchMove = (e)=>{
    e;
    //could do something with multiple touches, like disable scroll if only one tap so the user can interact
    $361f0cbb3fe966eb$export$200c484eadc8a1a7(e.touches[0].clientX, e.touches[0].clientY);
};
const $361f0cbb3fe966eb$export$3f231b944b3a8628 = ()=>{
    window.addEventListener("scroll", $361f0cbb3fe966eb$var$handleScrolling);
    document.addEventListener("mousemove", $361f0cbb3fe966eb$var$handleMouseMove);
    document.addEventListener("mousedown", $361f0cbb3fe966eb$var$handleMouseDown);
    document.addEventListener("mouseup", $361f0cbb3fe966eb$var$handleMouseUp);
    document.addEventListener("touchmove", $361f0cbb3fe966eb$var$handleTouchMove);
};
const $361f0cbb3fe966eb$export$f41068b587f3c406 = ()=>{
    document.removeEventListener("mousemove", $361f0cbb3fe966eb$var$handleMouseMove);
    document.removeEventListener("mousedown", $361f0cbb3fe966eb$var$handleMouseDown);
    document.removeEventListener("mouseup", $361f0cbb3fe966eb$var$handleMouseUp);
    window.removeEventListener("scroll", $361f0cbb3fe966eb$var$handleScrolling);
    document.removeEventListener("touchmove", $361f0cbb3fe966eb$var$handleTouchMove);
};


const $f5cebd077fe4183a$export$dfb9fdde960d9663 = (particleContainer, iOptions)=>{
    particles.options = {
        ...particles.options,
        ...iOptions
    };
    //particle renderer
    const pCElem = document.getElementById(particleContainer);
    if (particleContainer === null) throw new Error(`The particle container element with id: ${particleContainer} was not found.`);
    const pCanvas = document.createElement("canvas");
    pCanvas.style.width = "100%";
    pCanvas.style.height = "100%";
    pCElem.appendChild(pCanvas);
    const rCanvas = document.createElement("canvas");
    rCanvas.style.width = "0px";
    rCanvas.style.height = "0px";
    pCElem.appendChild(rCanvas);
    const gl = (0, $1b7019f4d50ff473$export$d7038d569a79a421)(pCanvas);
    if (gl) {
        particles.gl = gl;
        particles.glCE = pCanvas;
        //TODO make it so it doesn't adjust according to the window size, but accordingly to the parent element size
        const parentElement = particles.glCE.parentElement;
        particles.glSize.width = window.innerWidth;
        particles.glSize.height = window.innerHeight;
        if (parentElement) {
            particles.glSize.width = parentElement.clientWidth;
            particles.glSize.height = parentElement.clientHeight;
        }
        const w = particles.glSize.width;
        const h = particles.glSize.height;
        //adjust the canvas element with the dpi of the device or current dpi set by the user
        const cW = w * particles.dpi;
        const cH = h * particles.dpi;
        particles.glCE.width = cW;
        particles.glCE.height = cH;
        particles.gl.viewport(0, 0, cW, cH);
        const deps = (0, $1deaa4109b56ef02$export$7be957360bb71a13)(gl, particles.options, cW, cH);
        if (deps) {
            particles.glDeps = deps;
            particles.glReady = true;
        } else throw new Error("GLDeps was not able to be created.");
    } else throw new Error("WebGL2RenderingContext was not able to be created from the particleCanvasId provided.");
    //initialize the canvas reader
    const result = (0, $9d8afc01b3046417$export$80c6a6d5389972de)(rCanvas);
    const result2 = (0, $97d1bb167d3a10d8$export$98a5a3f45f7b7cf2)();
    (0, $387d0f7e7e285f95$export$ae13f218d77f4aa5)();
    (0, $361f0cbb3fe966eb$export$3f231b944b3a8628)();
    (0, $a133016631cbb846$export$67fe4b7c347780bf)();
    particles.loop = (0, $52308254850f696a$export$f9ef67375ddc185);
    //TODO add the event listeners for all the needed events, such as window resizing, unmounting, mouse, etc.
    window.addEventListener("beforeunload", ()=>{
        // Clean up the WebGL instance here
        // For example, you can call a cleanup function or reset any resources used by WebGL
        console.log("cleaning");
        cancelAnimationFrame(particles.animFrameCBNum);
        (0, $361f0cbb3fe966eb$export$f41068b587f3c406)();
        (0, $e10e7b025c1e1c92$export$4436b5a83ca0ea9a)(particles.gl, particles.glDeps);
        (0, $a133016631cbb846$export$8b60ad1407aa78d4)();
    });
    particles.ready = true;
    return true;
};


const $175db4fc57104689$export$f3b5caa4a00c3279 = 50;
const $175db4fc57104689$export$51605c39c230c251 = 50000;
const $175db4fc57104689$export$503ac9bfa7c5b1a5 = 500;
const $175db4fc57104689$export$74c9c08f3b99908b = 0.5;
const $175db4fc57104689$export$7d7bb43632a67c08 = false;
const $175db4fc57104689$export$51efc29cf0e38b8e = true;
const $175db4fc57104689$export$487aef396aa81c49 = 10000;
const $175db4fc57104689$export$5cb3add2e48bc41c = 10;
const $175db4fc57104689$export$9d590174a2f0e0cc = "drag";
const $175db4fc57104689$export$e60d2b4fcd97fa8f = "orbit";
const $175db4fc57104689$export$7d2d298d1912af8d = 10000;
const $175db4fc57104689$export$e1b79dea9cd2cacf = 0.003;
const $175db4fc57104689$export$5f1debfa778f9e72 = "teleport";
const $175db4fc57104689$export$f5a0f96f49718453 = 0.8;
const $175db4fc57104689$export$ce10ae0621aa613f = true;
const $175db4fc57104689$export$22786881a418d7e5 = "scrollY";
const $175db4fc57104689$export$6ea01257f58c7a8a = 10;
const $175db4fc57104689$export$9b952a292e69455b = 10;
const $175db4fc57104689$export$93ca5d3f8675ae4c = {
    resolutionPercent: $175db4fc57104689$export$f3b5caa4a00c3279,
    prtcleCnt: $175db4fc57104689$export$51605c39c230c251,
    backgroundParticleCount: $175db4fc57104689$export$503ac9bfa7c5b1a5,
    mapParticlesToClosestPoint: $175db4fc57104689$export$7d7bb43632a67c08,
    prtclDstRng: $175db4fc57104689$export$74c9c08f3b99908b,
    usePreciseMouseDetection: $175db4fc57104689$export$51efc29cf0e38b8e,
    mouseInteractionFieldDistance: $175db4fc57104689$export$487aef396aa81c49,
    mouseInteractionFieldIntensity: $175db4fc57104689$export$5cb3add2e48bc41c,
    edgeInteractionType: $175db4fc57104689$export$5f1debfa778f9e72,
    mouseInteractionType: $175db4fc57104689$export$9d590174a2f0e0cc,
    mouseClickInteractionFieldDistance: $175db4fc57104689$export$7d2d298d1912af8d,
    mouseClickInteractionFieldIntensity: $175db4fc57104689$export$e1b79dea9cd2cacf,
    mouseClickInteractionType: $175db4fc57104689$export$e60d2b4fcd97fa8f,
    edgeRestitution: $175db4fc57104689$export$f5a0f96f49718453,
    useParticleQueue: $175db4fc57104689$export$ce10ae0621aa613f,
    particleScrollType: $175db4fc57104689$export$22786881a418d7e5,
    lifetimeOffsetRng: $175db4fc57104689$export$6ea01257f58c7a8a,
    maxGroups: $175db4fc57104689$export$9b952a292e69455b
};


const $d8b4531136e71e6e$export$b2ea4c4663464735 = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    dx: 0,
    dy: 0,
    magSqr: 0,
    mag: 0,
    nDx: 0,
    nDy: 0,
    scrollDX: 0,
    scrollDY: 0,
    scrollPosY: 0,
    leftMouseDown: false,
    leftClick: false,
    rightMouseDown: false,
    rightClick: false,
    lastRecordedTime: new Date(),
    tx: 0,
    ty: 0
};



const $b4158ee5be6ace45$export$42369a38bcfedcf5 = ()=>{
    particles.enabled = true;
    (0, $52308254850f696a$export$f9ef67375ddc185)();
};


async function $425c7446b2f73f52$export$7c2bbd6fc40874b4(url) {
    return new Promise((resolve, reject)=>{
        const elem = new Image();
        elem.crossOrigin = "Anonymous";
        elem.onload = ()=>resolve(elem);
        elem.onerror = reject;
        elem.src = url;
        return elem;
    });
}


globalThis.particles = {
    deleteAllGroups: (useGroupLifetime)=>console.error("Particles not initialized"),
    setGroupLifetime: (groupIds, lifetime, offset)=>console.error("Particles not initialized"),
    addFromPoints: (points, gInput)=>console.error("Particles not initialized"),
    enableGroups: (groupIds)=>console.error("Particles not initialized"),
    addInputGroup: (gInput)=>console.error("Particles not initialized"),
    disableGroups: (groupIds)=>console.error("Particles not initialized"),
    groupAction: (action, group)=>console.error("Particles not initialized"),
    init: (0, $f5cebd077fe4183a$export$dfb9fdde960d9663),
    start: (0, $b4158ee5be6ace45$export$42369a38bcfedcf5),
    loadImageURL: (0, $425c7446b2f73f52$export$7c2bbd6fc40874b4),
    loop: ()=>console.error("Particles not initialized"),
    enabled: false,
    ready: false,
    gl: null,
    glCE: null,
    glReady: false,
    glSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    readerCE: null,
    ctx: null,
    readerSize: {
        width: 0,
        height: 0
    },
    pGroups: {},
    options: (0, $175db4fc57104689$export$93ca5d3f8675ae4c),
    mouse: (0, $d8b4531136e71e6e$export$b2ea4c4663464735),
    dpi: window.innerWidth < 1000 ? window.devicePixelRatio || 1 : 1,
    lastDPIUpdate: new Date().getTime()
};


