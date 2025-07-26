import { Request, Response } from "express";
import { UserRepository } from "../repository/User.repository";

export class UserControllerService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await this.repository.getAll();

      res.status(200).json({
        msj: "users get all sucessfully",
        data: response.map((item) => item),
      });
    } catch (error) {
      res.status(500).json({
        msj: "server error",
        error: error as string,
      });
      throw new Error(error as string);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const response = await this.repository.create(req.body);

      res.status(201).json({
        msj: "usuario creado exitosamente",
        data: response,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.repository.updateById(id, req.body);

      res.status(200).json({
        msj: "Usuario actualizado exitosamente",
        data: response,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.repository.deleteById(id);

      res.status(200).json({
        msj: "usuario eliminado exitosamente",
        data: response,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const response = await this.repository.getById(id);

      res.status(200).json({
        msj: "User get by id succss 200 OK",
        data: response,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
