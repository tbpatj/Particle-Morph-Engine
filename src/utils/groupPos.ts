import { ParticleInput } from "../types/particleReader";

export const convertStringValue = (val: string, range?: number) => {
  if (val.includes("%")) {
    return convertPercentToNumber(val, range ?? 1);
  } else if (val.includes("px")) {
    return convertPx(val);
  } else {
    return stringToNum(val);
  }
};

const convertPx = (i: string) => {
  const num = Number(i?.split("px")?.[0]);
  if (!isNaN(num)) {
    return num;
  }
  return 0;
};

const stringToNum = (i: string) => {
  const num = Number(i);
  if (!isNaN(num)) return num;
  return 0;
};

export const convertPercentToNumber = (i: string, range: number) => {
  const num = Number(i.split("%")?.[0]);
  if (!isNaN(num)) {
    return (num / 100) * range;
  }
  return 0;
};

export const convertPercentToNumberAndPercent = (i: string, range: number) => {
  const num = Number(i.split("%")?.[0]);
  if (!isNaN(num)) {
    return { percent: num, number: (num / 100) * range };
  }
  return { percent: 0, number: 0 };
};

export const addStringValues: (
  i: string,
  j: string,
  range: number
) => string = (i: string, j: string, range: number) => {
  if (i.includes("%")) {
    const { percent } = convertPercentToNumberAndPercent(i, range);
    if (j.includes("%")) {
      const { percent: pj } = convertPercentToNumberAndPercent(j, range);
      return `${percent + pj}%`;
    } else if (j.includes("px")) {
      const num = convertPx(j);
      return `${percent + (num / range) * 100}%`;
    } else {
      return `${percent}%`;
    }
  } else if (i.includes("px")) {
    const num = convertPx(i);
    if (j.includes("%")) {
      const jnum = convertPercentToNumber(j, range);
      return `${num + jnum}px`;
    } else if (j.includes("px")) {
      const jnum = convertPx(j);
      return `${num + jnum}px`;
    } else {
      return `${num}px`;
    }
  } else {
    return `0px`;
  }
};

export const getGroupPropsFromInputs = (inputs: ParticleInput[]) => {
  let xPos = inputs[0].xPos;
  let yPos = inputs[0].yPos;
  let scaleX = "100%";
  let scaleY = "100%";
  let rot = 0;
  for (const i in inputs) {
    const input = inputs[i];
  }
};
