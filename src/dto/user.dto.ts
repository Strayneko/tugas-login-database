import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
