import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
@Entity("user_session")
@Unique(["id"])
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  uuid: string;
  @Column()
  token: string;
  @Column()
  expiresAt: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  active: boolean;
  @Column({ nullable: true })
  uuid_parent: string;
}
