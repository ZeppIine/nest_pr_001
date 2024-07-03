import { IsDate, IsDateString, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(1, 16)
    name: string;
    @IsDateString()
    birth: Date;
}
