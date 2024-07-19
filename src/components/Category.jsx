import "../css/Column.css"
import { ListItem } from "./ListItem"
import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";


export const CategoryContainer = ({...props}) => {
  // console.log(`props = ${props.category}`);
  const { item, lastMenu, hasSubmenu, list, data} = props; 
  // console.log(`category: ${category}`)
  // console.log(`id: ${categoryId}`)

  const {
    attributes, 
    listeners, 
    setNodeRef: setDraggableNodeRef, 
    isDragging,
  } = useDraggable({
    id: item.id,
    data: {
      item: item,
      lastMenu,
      hasSubmenu,
      type: "category"
    }
  })

  const {isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: item.id,
    data: {
      type: "category",
      item: item,
    },
  })

  const dropStyle = {
    borderLeft: isOver ? "4px solid #a6b6cc" : undefined,
  };

  const dragStyle = { opacity: isDragging ? "0.5" : 1 };
  //list items styles

  const {isOver: subIsOver, setDraggableNodeRef: setSubDroppableNodeRef} = useSortable({
    id: `item${item.id}`
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
          <ListItem
            name={item.category}
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
        id={`item${item.id}`}
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
                    <ListItem
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

  function addItemButton(arg=""){

    if(arg === list.length-1) {
      return (
        <div className="addSubMenu">
          <span className="addSubMenuIcon">
            {/* <PlusIcon /> */}
          </span>
          <button 
            className="addItemButton"
            onClick={() => addItem()} // replace the class name when clicked to show different box
            >
            Add Item
          </button>
        </div>
    )
  }
    if(arg === "empty category") {
      return (
        <div className="addSubMenu">
          <span className="addSubMenuIcon">
            {/* <PlusIcon /> */}
          </span>
          <button 
            className="addItemButton"
            onClick={() => addItem()} // replace the class name when clicked to show different box
            >
            Add Item
          </button>
        </div>
    )
    }
}

  function addItem(subMenuIndex) {
    // console.log(categoryId)
    // updatedData[categoryId]["items"].append()
  }
}
