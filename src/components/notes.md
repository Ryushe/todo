todo:
1. sortable item DONE




this is why it doesnt work (keep position)
```js
  const handleDragEnd = event => {
    const {active, over} = event

    if(active.id === over.id) return;

    setTaskData(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos)

    })
  };
```
```json
[
  {
    "id": "Menu001",
    "Name": "Product management"
  },
  {
    "id": "Menu002",
    "Name": "User research",
    "SubMenus": [
      {
        "id": "SubMenu001",
        "Name": "Quantitative Research"
      },
      {
        "id": "SubMenu002",
        "Name": "Qualitative Research"
      },
      {
        "id": "SubMenu003",
        "Name": "Stakeholders interview"
      },
      {
        "id": "SubMenu004",
        "Name": "Numbers data source"
      }
    ]
  }
]

[
  {
    "category": "readablesList",
    "id": "task-1", 
    "items": [
      { "id": "Item1", "title": "Medium Post" },
      { "id": "Item2", "title": "Blog Read" }
    ]
  },
  {
    "category": "todos",
    "id": "task-2",
    "items": [
      { "id": "Item3", "title": "Twitter 15 mins" },
      { "id": "Item4", "title": "Lolicon" },
      { "id": "Item5", "title": "Booze" }
    ]
  }
]
```
key:  
  nav == category data(mine)
    - nav is the first layer data
  navitemscontainer == Category
  navitemcard == task
  type category == menu
  type categoryitem == submenu
  isCategoryItem == isSubMenu


doesnt update data into json, so data is not persistant

issues:
  - could rename <task/> -> ListItem, or something because naming a little confusing 
  - need to add if task is over category it adds to it as well

  - issue with moving categories, item doesnt always move
    - think I can look at the list ex where it checks if above / below and updates accord
    - SOLUTION: whin the top cat is over the bottom cat 


todo:
  general:
    - make css area draggable on the obj 
    - add to json {checked: true/false}
    - now passing data to category container, could only pass the 

  list.jsx:
  category.jsx:
  task.jsx:
    - fix placement of checkbox -> left
    - make the box around the items draggable
  server.js:
    - getNote(if no note, create note)
    - make server display ex content if no content

doing:
  addbutton -> list.jsx
