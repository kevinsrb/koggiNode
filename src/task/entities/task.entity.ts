import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: "task" })
export class TaskEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

 
}
