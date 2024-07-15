import "../css/Column.css"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { CategoryContainer } from "./Category";
import {FetchJsonData} from "../utils/dataHandler";
import { useState, useEffect } from "react";

export const List = () => {


  // gets data using dataHandler.js
  const { jsonData, isLoading, error } = FetchJsonData("TodoList");
  const [data, setData] = useState([]); 
  const[activeId, setActiveId] = useState();

  // console.log(jsonData)
  useEffect(() => {
    if (jsonData) { // Update listData only when data is available
      setData(jsonData);
    }
  }, [jsonData]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
    return (
        <DndContext // make handle functions
        sensors={sensors}
        collisionDetection={closestCenter}
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        // onDragOver={handleDragOver}
      >
        <div className="Category">
          <SortableContext
            items={data}
            strategy={verticalListSortingStrategy}
          >
            { isLoading ? (<p></p>):
            data.map((categoryData, index) => {
              return (
                <div className="drop-container" key={categoryData.id}>
                  <CategoryContainer 
                    category={categoryData.category}
                    list={categoryData.items || []}
                    categoryId={categoryData.id}
                    lastMenu={index === data.length - 1}
                    hasSubmenu={categoryData.items && categoryData.items.length > 0}
                  />
                </div>
              )
            })}
          </SortableContext>
        </div>
        {/* <DragOverlay>
          {active ? (
            <div className="navCard navCardDragging">
              <NavItemCard
                name={nav.item.Name}
                isSubMenu={nav.type === "subMenu" ? true : false}
              />
            </div>
          ) : null}
        </DragOverlay> */}
      </DndContext>
    );
   
}

// useDraggable  
// useDroppable

// create a container that can handle data then use methods above to handle the data (eg: splicing data x moving data within the json arrays)