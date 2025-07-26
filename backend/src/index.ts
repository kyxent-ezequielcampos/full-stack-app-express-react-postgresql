import express, { json, Router } from "express";
import { Enviroments } from "./plugins/Enviroments.service";
import { UserRepository } from "./repository/User.repository";
import { UserControllerService } from "./controller/User.controller.service";
import { UserRoutes } from "./routes/User.routes";
import cors from "cors";
interface serverAbstract {
  initService(): void;
  initAllServices(): void;
}

export class Server implements serverAbstract {
  constructor(
    private port: typeof Enviroments.PORT,
    private server: express.Application
  ) {
    (this.port = port), (this.server = server);
  }

  initService(): void {
    try {
      this.initAllServices()
      this.server.listen(this.port, () => {
        console.log(`running service in http://localhost:${this.port}`);
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  initAllServices(): void {
    try {
      this.server.use(json());

      this.server.use(
        cors({
          origin: "http://localhost:5173",
        })
      );

      this.server.use("/api", this.initUserService());
    } catch (error) {
      throw new Error(error as string);
    }
  }

  initUserService() {
    try {
      const repository = new UserRepository();

      const controller = new UserControllerService(repository);

      const routes = new UserRoutes(controller, Router());

      return routes.initRoutes();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

const server = new Server(Enviroments.PORT, express());

server.initService();
