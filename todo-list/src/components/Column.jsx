import "../css/Column.css"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { Task } from "./Task";

export const Column = ({ tasks }) => {
    if (tasks){
        tasks.map((task) => (
            console.log(task.id)
        ))
}
    return (
        <div className="column">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <Task id={task.id} title={task.items} key={task.id} />
                    ))}
            </SortableContext>
        </div>
    );
};