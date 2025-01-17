import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from "typeorm";
  import { Task } from "./task.entities";
  
  @Entity()
  export class TaskHistory {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Task, { onDelete: "CASCADE" })
    @JoinColumn({ name: "task_id" })
    task: Task;
  
    @Column()
    taskId: number;
  
    @Column()
    changeType: string;
  
    @Column("jsonb")
    previousValue: Record<string, any>;
  
    @Column("jsonb")
    newValue: Record<string, any>;
  
    @CreateDateColumn()
    timestamp: Date;
  }
  