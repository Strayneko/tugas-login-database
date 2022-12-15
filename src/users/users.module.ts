import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entities';
import { Pet } from 'src/Entities/pet.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
