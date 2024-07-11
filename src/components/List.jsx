import "../css/Column.css"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { Category } from "./Category";

export const List = ({ tasks }) => {

    return (
        <div className="list">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((category) => (
                <Category id={category.id} category={category.category} key={category.id} />
            ))}
            </SortableContext>
        </div>
    );
}

// useDraggable  
// useDroppable

// create a container that can handle data then use methods above to handle the data (eg: splicing data x moving data within the json arrays)