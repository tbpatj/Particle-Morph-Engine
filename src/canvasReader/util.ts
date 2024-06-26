export const stringToPXPerc = (
  string: string | number,
  vertical: boolean,
  dpi: number
) => {
  if (!string) return 0;
  if (typeof string === "number") return string;
  string.trim();
  if (string.includes("px")) return parseFloat(string.split("px")[0]) * dpi;
  //return percentage
  if (string.includes("%"))
    return (
      (parseFloat(string.split("%")[0]) / 100) *
      (vertical ? window.innerHeight * dpi : window.innerWidth * dpi)
    );
  return parseFloat(string);
};

export const PxPercStringToNumber = (
  string: string,
  vertical: boolean,
  dpi?: number
) => {
  let operations: any[] = stringToOperations(string);
  const calcIncluded = operations.includes("calc");
  operations = Parentheses(operations).layer;
  operations = AdjustFunctions(operations);
  if (calcIncluded) {
    console.log("seperating div");
    operations = MulDivSeperation(operations);
  }
  const result = RunCalcOnLayer(operations, vertical, dpi ?? 1);
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

export const AdjustFunctions = (operations: any[]) => {
  for (let i = 0; i < operations.length; i++) {
    if (typeof operations[i] === "object") {
      operations[i] = AdjustFunctions(operations[i]);
    }
    if (operations[i] === "calc" || operations[i] === "min") {
      if (typeof operations[i + 1] === "object") {
        operations[i + 1] = AdjustFunctions(operations[i + 1]);
      }
      if (operations.length > 2) {
        operations[i] = [operations[i], operations[i + 1]];
        operations = operations
          .slice(0, i)
          .concat([operations[i]])
          .concat(operations.slice(i + 2, operations.length));
      }
    }
  }
  return operations;
};

export const stringToOperations = (string: string) => {
  if (!string) return [];
  const operations = string
    .trim()
    .replaceAll(" ", "")
    .split(/(-)|(\+)|(\/)|(\*)|(\()|(\))|(\,)/)
    .filter((s) => s !== undefined && s !== "");
  return operations;
};

const RunCalcOnLayer = (
  layer: any[],
  vertical: boolean,
  dpi: number,
  pFunc?: string
) => {
  while (layer.length > 2) {
    if (typeof layer[0] === "object") {
      layer[0] = RunCalcOnLayer(layer[0], vertical, dpi);
    }
    if (typeof layer[2] === "object") {
      layer[2] = RunCalcOnLayer(layer[2], vertical, dpi);
    }
    if (layer[1] === "+") {
      layer[0] =
        stringToPXPerc(layer[0], vertical, dpi) +
        stringToPXPerc(layer[2], vertical, dpi);
      layer = [layer[0]].concat(layer.slice(3, layer.length));
    }
    if (layer[1] === "-") {
      layer[0] =
        stringToPXPerc(layer[0], vertical, dpi) -
        stringToPXPerc(layer[2], vertical, dpi);
      layer = [layer[0]].concat(layer.slice(3, layer.length));
    }
    if (layer[1] === "/") {
      layer[0] =
        stringToPXPerc(layer[0], vertical, dpi) /
        stringToPXPerc(layer[2], vertical, dpi);
      layer = [layer[0]].concat(layer.slice(3, layer.length));
    }
    if (layer[1] === "*") {
      layer[0] =
        stringToPXPerc(layer[0], vertical, dpi) *
        stringToPXPerc(layer[2], vertical, dpi);
      layer = [layer[0]].concat(layer.slice(3, layer.length));
    }
    //odds are this is because we are currently in a function so lets figure out which function we are in and add this to the calculations
    if (layer[1] === ",") {
      if (pFunc === "min") {
        layer[0] = Math.min(
          stringToPXPerc(layer[0], vertical, dpi),
          stringToPXPerc(layer[2], vertical, dpi)
        );
      }
      if (pFunc === "max") {
        layer[0] = Math.max(
          stringToPXPerc(layer[0], vertical, dpi),
          stringToPXPerc(layer[2], vertical, dpi)
        );
      }
      layer = [layer[0]].concat(layer.slice(3, layer.length));
    }
  }
  if (layer.length === 2) {
    if (layer[0] === "min") {
      layer[0] = RunCalcOnLayer(layer[1], vertical, dpi, "min");
    } else if (layer[0] === "calc") {
      layer[0] = RunCalcOnLayer(layer[1], vertical, dpi);
    } else if (layer[0] === "max") {
      layer[0] = RunCalcOnLayer(layer[1], vertical, dpi, "max");
    }
  }
  if (layer.length === 1) {
    if (typeof layer[0] === "string") {
      layer[0] = stringToPXPerc(layer[0], vertical, dpi);
    }
  }
  return layer[0];
};

const MulDivSeperation = (layers: string[]) => {
  for (let i = 0; i < layers.length; i++) {
    while ((layers[i] === "*" || layers[i] === "/") && layers.length > 3) {
      const leftSide = layers[i - 1];
      const operation = layers[i];

      if (typeof layers[i + 1] === "object") {
        //@ts-ignore
        layers[i + 1] = MulDivSeperation(layers[i + 1]);
      }
      const rightSide = layers[i + 1];
      layers = layers
        .slice(0, Math.max(i - 1, 0))
        // @ts-ignore
        .concat([[leftSide, operation, rightSide]])
        .concat(layers.slice(i + 2, layers.length));
    }
    if (typeof layers[i] === "object") {
      //@ts-ignore
      layers[i] = MulDivSeperation(layers[i]);
    }
  }
  return layers;
};

//create nested arrays for each grouped equation by parenthesis
const Parentheses = (operations: string[]) => {
  let removedIndex = 0;
  //go through all the operations we have found
  for (let i = 0; i < operations.length; i++) {
    //if we find a new parenthesis go down into it
    if (operations[i] === ")") {
      return { layer: operations.slice(0, i), index: i + removedIndex };
    }
    if (operations[i] === "(") {
      const { layer, index } = Parentheses(
        operations.slice(i + 1, operations.length)
      );
      //add the layer to the current operations, it will return a nested array

      operations = operations
        .slice(0, i)
        //@ts-ignore
        .concat([layer])
        .concat(operations.slice(i + index + 2, operations.length));
      removedIndex += index + 1;
    }
  }
  return { layer: operations, index: operations.length };
};
