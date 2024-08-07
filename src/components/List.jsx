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
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { CategoryContainer } from "./Category";
import {FetchJsonData} from "../utils/dataHandler";
import { useState, useEffect } from "react";
import { Task } from "./Task";
import { insertAtIndex, removeAtIndex } from "../utils/indexHandler";

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
      } else if (type === "subMenu") {
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

    const activeContainer = findContainer(id, activeType);
    const overContainer = findContainer(overId, overType);
    console.log("test "+ activeContainer.items.title);

    if (!activeContainer || !overContainer) {
      return;
    }

    if (overType === "category") {
      if (active.id !== over.id) {
        if (activeType === "category") {
          setData((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        } else if (
          (activeType === "subMenu" && !over.data.current.item["items"]) ||
          !over.data.current.item["items"].length > 0
        ) {

          //add SubMenu
          let newItems;
          const subList = activeContainer.items;
          const activeIndex = subList.findIndex((sub) => sub.id === active.id);
          const overIndex = data.findIndex((item) => item.id === over.id);
          const activeContainerIndex = data.findIndex(
            (container) => container.id === activeContainer.id
          );
          newItems = moveBetweenContainers(
            data,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active,
            activeContainerIndex,
            overIndex
          );
          setData(Object.values(newItems));
        } else {
          return;
        }
      }
    } else if (overType === "subMenu" && activeType === "subMenu") {
      if (active.id !== over.id) {
        if (activeContainer.id === overContainer.id) {
          console.log("same container move");
          const subList = activeContainer.items;
          const oldIndex = subList.findIndex((sub) => sub.id === active.id);
          const newIndex = subList.findIndex((sub) => sub.id === over.id);

          const updatedSubList = arrayMove(subList, oldIndex, newIndex);
          const updatedData = data.map((nav) => {
            if (nav.id === activeContainer.id) {
              nav["items"] = updatedSubList;
            }
            return nav;
          });

          setData(updatedData);
        } else {
          console.log("different container move");
          let newItems;
          const activeSubList = activeContainer.items;
          const overSubList = overContainer.items;
          const activeContainerIndex = data.findIndex(
            (container) => container.id === activeContainer.id
          );
          const overContainerIndex = data.findIndex(
            (container) => container.id === overContainer.id
          );
          const activeIndex = activeSubList.findIndex(
            (sub) => sub.id === active.id
          );
          const overIndex = overSubList.findIndex((sub) => sub.id === over.id);
          newItems = moveBetweenContainers(
            data,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active,
            activeContainerIndex,
            overContainerIndex
          );
          setData(Object.values(newItems));
        }
      }
    }
    setActive(null);
    setNav(null);
    
  }


  const moveBetweenContainers = (
    dataItems,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item,
    activeContainerIndex,
    overContainerIndex
  ) => {
   const updatedList = {
    ...dataItems,
    [activeContainerIndex]: {
      ...activeContainer,
      items: removeAtIndex(
        dataItems[activeContainerIndex]["items"],
        activeIndex
      ),
    },
      [overContainerIndex]: {
      ...overContainer,
      items: insertAtIndex(
        dataItems[overContainerIndex]["items"],
        overIndex,
        item.data.current.item
      ),
    },
   };
   return updatedList;
  };
   

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const activeType = active.data.current.type;
    let overId = null;
    let overType = null;
    if (over) {
      overId = over.id;
      overType = over.data.current.type;
    }
    // Find the containers
    const activeContainer = findContainer(id, activeType);
    const overContainer = findContainer(overId, overType);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer?.id === overContainer?.id
    ) {
      return;
    }
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
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
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
        <DragOverlay> {/* when click and drag */}
          {active ? (
            <div className="navCard navCardDragging"> {/* make look better */}
              <Task
                name={nav.item.Name}
                isSubMenu={nav.type === "subMenu" ? true : false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
   
}

// useDraggable  
// useDroppable

// create a container that can handle data then use methods above to handle the data (eg: splicing data x moving data within the json arrays)