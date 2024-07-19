import "../css/Column.css"
import { Task } from "./Task"
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { FetchJsonData } from "../utils/dataHandler";
import { insertAtIndex } from "../utils/indexHandler";


export const CategoryContainer = ({...props}) => {
  // console.log(`props = ${props.category}`);
  const { category, lastMenu, hasSubmenu, list, categoryId, data} = props; 
  // console.log(`category: ${category}`)
  // console.log(`id: ${categoryId}`)

  const {
    attributes, 
    listeners, 
    setNodeRef: setDraggableNodeRef, 
    isDragging,
  } = useSortable({
    id: categoryId,
    data: {
      item: category,
      lastMenu,
      hasSubmenu,
      type: "category"
    }
  })

  const {isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: categoryId,
    data: {
      type: "category",
      item: category,
    },
  })

  const dropStyle = {
    borderLeft: isOver ? "4px solid #a6b6cc" : undefined,
  };

  const dragStyle = { opacity: isDragging ? "0.5" : 1 };
  //list items styles

  const {isOver: subIsOver, setDraggableNodeRef: setSubDroppableNodeRef} = useSortable({
    id: `item${categoryId}`
  })

  const subDropStyle = {
    height: "4px",
    backgroundColor: subIsOver ? "#a6b6cc" : "transparent",
    width: "180px",
    margin: "2px 0px 2px 15px",
    borderRadius: "8px",
  };


  return (
    <div
    className="navItemsContainer"
    style={isDragging ? dragStyle : dropStyle}
  >
    <div className="navCardMenu" ref={setDroppableNodeRef}>
      <div className="mainMenu">
        <div className="navCard" ref={setDraggableNodeRef}>
          <Task
            name={category}
            listeners={listeners}
            attributes={attributes}
          />
        </div>
        <span className={`${!lastMenu && "hidePlus"} addMenuIcon`}>
          {/* <BigPlusIcon /> */}
        </span>
      </div>
    </div>
    <div className={`navCardSubMenu ${!hasSubmenu && "increase"}`}>
      <SortableContext
        id={`item${categoryId}`}
        items={list}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={`subMenu ${!hasSubmenu ? "hide" : ""}`}
          ref={setSubDroppableNodeRef}
        >
          {list?.length > 0 &&
            list.map((subMenu, index) => {
              return (
                <div key={subMenu.id}>
                  <div style={subDropStyle}></div>
                  <div className="navSubMenuCard">
                    <Task
                      id={subMenu.id}
                      name={subMenu.title}
                      item={subMenu}
                      isSubMenu
                    />
                    {addItemButton(index)}
                  </div>
                </div>
              );
            })}
        </div>
      </SortableContext>
    </div>
  </div>
  );

  function addItemButton(subMenuIndex){
    if(subMenuIndex === list.length-1 || list.length === 0) {
      return (
        <div className="addSubMenu">
          <span className="addSubMenuIcon">
            {/* <PlusIcon /> */}
          </span>
          <button 
            className="addItemButton"
            onClick={() => addItem(subMenuIndex)}
            >
            Add Item
          </button>
        </div>
    )
  }
}

  function addItem(listId) {
    // const updatedList = {
    //   ...data, 
    //   items: insertAtIndex(
    //     data[index]["items"]
    //   )
    // }    
  }
}
