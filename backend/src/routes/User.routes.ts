import { Request, Response, Router } from "express";
import { UserControllerService } from "../controller/User.controller.service";

export class UserRoutes {
  constructor(
    private controller: UserControllerService,
    private router: Router
  ) {
    (this.controller = controller), (this.router = router);
  }

  initRoutes(): Router {
    try {
      this.router.get("/users", (req: Request, res: Response) =>
        this.controller.getAll(req, res)
      );

      this.router.post("/users", (req: Request, res: Response) =>
        this.controller.createUser(req, res)
      );

      this.router.get("/users/:id", (req: Request, res: Response) =>
        this.controller.getById(req, res)
      );
      this.router.put("/users/:id", (req: Request, res: Response) =>
        this.controller.updateById(req, res)
      );
      this.router.delete("/users/:id", (req: Request, res: Response) =>
        this.controller.deleteById(req, res)
      );

      return this.router;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
