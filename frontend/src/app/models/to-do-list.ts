import { Task } from "./task";

export interface ToDoList {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    tasks: Task[];
}
