import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entities/user.entities';
import { UserDto } from 'src/dto/user.dto';
import { Pet } from 'src/Entities/pet.entities';

@Injectable()
export class UsersService {
  constructor(
    // intializing user repository & pet repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  findUsersByUsername(username: string) {
    // find user by username
    return this.userRepository.findOne({
      where: {
        username,
      },
      // add relation to Pet entity
      relations: ['pet'],
    });
  }

  /*
   * ==========================================
   * TODO: save user to database with their pet
   * ==========================================
   */
  async createUser(request: UserDto): Promise<User> {
    // insert pet data
    const pet = await this.petRepository.save({
      name: request.petName,
      picture: request.picture,
    });
    // inserting user
    const user: User = this.userRepository.create({
      username: request.username,
      password: request.password,
      pet, // relation: insert petId to user entity
    });

    return this.userRepository.save(user);
  }
}
