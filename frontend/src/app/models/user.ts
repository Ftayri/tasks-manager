import { ToDoList } from "./to-do-list";

export interface User {
    _id: string;
    firebaseId: string;
    username: string;
    todoLists: ToDoList[];
}
