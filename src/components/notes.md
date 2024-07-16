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


no handlers yet in list.jsx
  also uncomment dragoverlay at end


issues:
  could rename <task/> -> ListItem, or something because naming a little confusing 
  issue with moving categories, if item moved to top item doesnt move

todo:
  list.jsx:
    - add dnd context fns
    - create navitemcard
  category.jsx:
    - why is catedory of props undefined
  task.jsx:
    - fix placement of checkbox -> left
    - make the box around the items draggable

doing:
  list.jsx:
    - fixing moving subitems (issue with null items)
    - dragover
