import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

import { TaskDTO } from "../dto/task.dto";

export class TaskMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  taskValidator(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;

    const valid = new TaskDTO();
    valid.name = name;
    valid.description = description;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
