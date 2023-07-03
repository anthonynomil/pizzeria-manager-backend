import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

export const get = catchAsync(async (req: Request, res: Response) => {
  res.send("get");
});
