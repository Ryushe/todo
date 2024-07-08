import React from "react";
import "../css/Task.css"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({id, title}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
    console.log(`id: ${id}\n title: ${title}`)

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return ( 
    <div 
        ref={setNodeRef} 
        {...attributes} 
        {...listeners} 
        style={style}
        className="task"
    >
        <input type="checkbox" className="checkbox"></input>
        {title}</div>
    );
};