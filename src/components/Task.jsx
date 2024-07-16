import React from "react";
import "../css/Task.css"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ({...props}) => {
    const { name, isSubMenu, item, id, listeners, attributes } = props;

    const {
      attributes: subAttributes,
      listeners: subListeners,
      setNodeRef,
      transition,
      transform,
      isDragging
    } = useSortable({
      id: id,
      data: {
        item,
        name,
        type: "subMenu"
      }
    });

    const dragStyle = { 
      opacity: isDragging && isSubMenu ? "0.5" : 1,
    };


    return ( 
        <div className="task" ref={setNodeRef} style={dragStyle}>
        <span className="navInputIcon">
          {isSubMenu ? ( // can change div to ex: DragDropIcon, for the icon beside moving item
            <div
              className="subMenuIcon"
              {...subListeners}
              {...subAttributes}
            >
            {name}
            </div>
          ) : (
            <div
              className="mainMenuIcon"
              {...listeners}
              {...attributes}
            >
            {name}
            </div>
          )}
        </span>
        {isSubMenu ? <input type="checkbox" className="checkbox"></input>: null} {/* Can totally make this checkbox be on right */}
      </div>
    );
};


