import "../css/Column.css"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { Task } from "./Task";
import { Category } from "./Category";

export const Collumn = ({ data }) => {

    return (
        <div className="category">
          <SortableContext items={data} strategy={verticalListSortingStrategy}>  
            {data.map((category) => (
              <div key={category.id}>
                <h2>{category.category}</h2>
                <SortableContext items={category.items} strategy={verticalListSortingStrategy}>  
                  {category.items.map((item) => (
                    <Task id={item.id} title={item.title} key={item.id} />
                  ))}
                </SortableContext>
              </div>
            ))}
        </SortableContext>
      </div>
        // <div className="category">
        //   <SortableContext items={tasks} strategy={verticalListSortingStrategy}>  
        //     {tasks.map((task) => (
        //       <Task id={task.id} title={task.title} key={task.id} />
        //     ))}
        //   </SortableContext>
        // </div>

    );
}
// trying to figure out why list dosent stay put 