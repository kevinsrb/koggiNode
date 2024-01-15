import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { TaskService } from "../services/task.service";

export class Taskontroller {
  constructor(
    private readonly taskService: TaskService = new TaskService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getTasks(req: Request, res: Response) {
    try {
      const data = await this.taskService.findAllTasks();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.taskService.findTaskyId(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  
  async createTask(req: Request, res: Response) {
    try {
      const data = await this.taskService.createTask(req.body);
      console.log({data})
    
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.taskService.updateTask(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.taskService.deleteTask(id);
      res.status(200).json(data);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en borrar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
