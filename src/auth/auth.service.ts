import { Injectable } from '@nestjs/common';
import userInterface from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUsersByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
