import { ToDoList } from "./to-do-list";

export interface User {
    _id: string;
    firebaseUid: string;
    username: string;
    todoLists: ToDoList[];
}
