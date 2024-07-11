import "../css/Column.css"
import { Task } from "./Task"
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";


export const Category = ({id, tasks }) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef} 
          {...attributes} 
          {...listeners} 
          style={style}
          className="category"
        ></div>
        
      </SortableContext>

    );
}
