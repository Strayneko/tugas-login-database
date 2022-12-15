import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entities/user.entities';
import { UserDto } from 'src/dto/user.dto';
import { Pet } from 'src/Entities/pet.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
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

  async createUser(request: UserDto): Promise<User> {
    const pet = await this.petRepository.save({
      name: request.petName,
      picture: request.picture,
    });
    const user: User = this.userRepository.create({
      username: request.username,
      password: request.password,
      pet,
    });

    return this.userRepository.save(user);
  }
}
