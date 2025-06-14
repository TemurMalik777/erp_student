import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  hashed_password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ default: 0 })
  is_creater: boolean;

  @Column({ default: 0 })
  is_active: boolean;
}
