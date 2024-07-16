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
  const[active, setActive] = useState();
  const[nav, setNav] = useState(null);

  // console.log(jsonData)
  useEffect(() => {
    if (jsonData) { // Update listData only when data is available
      setData(jsonData);
    }
  }, [jsonData]);

  function findContainer(id, type = "") {
    let result = null;

    if (id) {
      if (id in data) {
        return id;
      }
      if (type === "category") {
        result = data.find((nav) => nav.id === id);
      } else if (type === "item") {
        result = data.find((nav) => {
          if (nav.items && nav.items.length > 0) {
            return nav.items.find((sub) => {
              return sub.id === id;
            });
          }
        return result;
        })
      }
    }
    return result;
  }

  function handleDragStart(event) {
    setActive(event.active.id);
    setNav(event.active.data.current);
    console.log(`starting the movement of ${event.active.data.current}`)
  }

  function handleDragEnd(event) {
    const {active, over} = event;
    const {id} = active;
    const activeType = active.data.current.type;
    let overId = null;
    let overType = null;
    if (over) {
      overId = over.id;
      overType = over.data.current.type;
    }

    const activeContainer = findContainer(id, activeType)
    
  }

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
        onDragStart={handleDragStart}
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