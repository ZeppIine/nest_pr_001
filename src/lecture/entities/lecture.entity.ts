import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('lecture')
export class Lecture {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'name', type: "varchar"})
    name: string;
    @Column({name: 'time'})
    time: number;
    @ManyToOne(() => User, (user) => user.lecture)
    @JoinColumn({name: 'user_id'})
    user: User; 
}
