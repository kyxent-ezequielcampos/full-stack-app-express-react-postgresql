import { PrismaClient } from "../generated/prisma";
import { UserInterface } from "../interfaces/User.inteface";

const prisma = new PrismaClient();

export class UserRepository {
  async getAll() {
    try {
      const request = await prisma.users.findMany();
      return request;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async create(data: Partial<UserInterface>) {
    try {
      const request = await prisma.users.create({ data });
      return request;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async updateById(id: string, data: Partial<UserInterface>) {
    try {
      const request = await prisma.users.update({
        where: { id: parseInt(id) },
        data: data,
      });
      return request;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getById(id: string) {
    try {
      const request = await prisma.users.findUnique({
        where: { id: parseInt(id) },
      });

      return request;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async deleteById(id: string) {
    try {
      const request = await prisma.users.delete({
        where: { id: parseInt(id) },
      });

      return request;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
