import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  TEACHER = 'teacher',
  DIRECTOR = 'director',
}

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role })
  role: string;

  @Column({ default: false })
  is_creater: boolean;

  @Column({ default: false })
  is_active: boolean;

  @Column({ nullable: true })
  refresh_token: string;
}
