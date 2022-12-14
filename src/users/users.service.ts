import { Injectable } from '@nestjs/common';
import userInterface from './user.interface';

@Injectable()
export class UsersService {
  private readonly users: Array<userInterface>;

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        pet: {
          name: 'alfred',
          picId:
            'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        },
      },
      {
        userId: 2,
        username: 'maria',
        password: 'secret',
        pet: { name: 'gopher', picId: 2 },
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        pet: { name: 'jenny', picId: 3 },
      },
    ];
  }

  async findOne(username: string): Promise<any> {
    return this.users.find((user: userInterface) => user.username === username);
  }
}
