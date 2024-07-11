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
```