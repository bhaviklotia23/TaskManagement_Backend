import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { User } from "./user.entities";
  
  export enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
  }
  
  export enum TaskStatus {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
  }
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column("text")
    description: string;
  
    @Column({
      type: "enum",
      enum: TaskPriority,
      default: TaskPriority.LOW,
    })
    priority: TaskPriority;
  
    @Column({
      type: "enum",
      enum: TaskStatus,
      default: TaskStatus.TODO,
    })
    status: TaskStatus;
  
    @Column({ type: "timestamp" })
    dueDate: Date;
  
    @Column()
    assignedToId: number;
  
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "assignedToId" })
    assignedTo: User;
  
    @Column()
    createdById: number;
  
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "createdById" })
    createdBy: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  