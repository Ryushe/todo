import "../css/Column.css"
import {SortableContext, verticalListSortingStrategy, useSortable} from "@dnd-kit/sortable";
import { Task } from "./Task";

export const Category = ({id, tasks }) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <div className="category">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((category) => (
            <div key={category.id}>
              <h2>{category.category}</h2>
              <SortableContext items={category.items} strategy={verticalListSortingStrategy}>  {/* Nested SortableContext for items */}
                {category.items.map((item) => (
                  <Task id={item.id} title={item.title} key={item.id} />
                ))}
              </SortableContext>
            </div>
          ))}
        </SortableContext>
      </div>
    );
}