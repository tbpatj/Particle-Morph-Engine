import { CanvasPointData } from "../canvasReader/canvasReading";
import { GroupInput } from "./particleReader";

export type AddFromPoints = (
  points: CanvasPointData,
  gInput: GroupInput
) => void;

export type DisableGroups = (groupIds: number[]) => void;

export type EnableGroups = (groupIds: number[]) => void;

export type SetGroupLifetime = (
  groupIds: number[],
  lifetime: number,
  offset?: number
) => void;

export type DeleteAllGroups = (useGroupLifetime?: boolean) => void;
