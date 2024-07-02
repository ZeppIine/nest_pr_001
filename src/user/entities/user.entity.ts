import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 16, type: "varchar"})
    name: string;
    @Column()
    birth: Date;
}