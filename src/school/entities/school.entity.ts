import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('school')
export class School {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @OneToOne(() => User, (user) => user.school)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
