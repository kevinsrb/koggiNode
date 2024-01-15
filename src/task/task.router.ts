import { BaseRouter } from "../shared/router/router";
import { Taskontroller } from "./controllers/task.controller";
import { TaskMiddleware } from "./middlewares/task.middleware";
export class TaskRouter extends BaseRouter<
Taskontroller,
TaskMiddleware
> {
  constructor() {
    super(Taskontroller, TaskMiddleware);
  }

  routes(): void {
    this.router.get("/tasks",  this.middleware.passAuth("jwt"), (req, res) =>
      this.controller.getTasks(req, res)
    );
    this.router.get("/tasks/tasks/:id",  this.middleware.passAuth("jwt"), (req, res) =>
      this.controller.getTaskById(req, res)
    );
    this.router.post("/tasks/create",  this.middleware.passAuth("jwt"),  (req, res, next) => [
        this.middleware.taskValidator(req, res, next),
      ],
      (req, res) => this.controller.createTask(req, res)
    );
    this.router.put(
      "/tasks/update/:id",
      this.middleware.passAuth("jwt"),
      (req, res) => this.controller.updateTask(req, res)
    );
    this.router.delete(
      "/tasks/delete/:id", this.middleware.passAuth("jwt"),  (req, res) => this.controller.deleteTask(req, res)
    );
  }
}
