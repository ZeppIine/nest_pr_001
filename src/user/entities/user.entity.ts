import { Lecture } from 'src/lecture/entities/lecture.entity';
import { School } from 'src/school/entities/school.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 16, type: 'varchar' })
  name: string;
  @Column()
  birth: Date;
  @OneToMany(() => Lecture, (lecture) => lecture.user)
  lecture: Lecture[];
  @OneToOne(() => School, (school) => school.user)
  school: School;
}
