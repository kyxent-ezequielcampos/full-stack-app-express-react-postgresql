export interface UserInterface {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserRepositoryInterface {
  getAll(): Promise<UserInterface[] | null>;
  create(data: Partial<UserInterface>): Promise<UserInterface>;
  updateById(id: string, data: Partial<UserInterface>): Promise<UserInterface>;
  getById(id: string): Promise<UserInterface>;
  deleteById(id: string): Promise<UserInterface>;
}
