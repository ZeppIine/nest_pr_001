import { IsDateString, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 16)
  name: string;
  @IsDateString()
  birth: Date;
  @IsString()
  @Length(8, 15)
  username: string;
  @IsString()
  @Length(4, 20)
  password: string;
}
