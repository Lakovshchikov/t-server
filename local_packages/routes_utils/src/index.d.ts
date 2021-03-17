import { NextFunction, Request, Response } from "express";

export function getSerializedArray(array: {serialize: () => Record<string, any>}[]): Record<string, any>[];
