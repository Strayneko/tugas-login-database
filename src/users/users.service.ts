import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUsersByUsername(username: string) {
    // return this.userRepository.find(id);
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['pet'],
    });
  }
}
