export function getTodoList(owner) {
    return JSON.parse(localStorage.getItem(owner)) || []
}

export function createTodoItem({ owner, name }) {
    let listArray = getTodoList(owner),
        newItem = {
            id: listArray.length ? listArray.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1 : 0,
            name: name,
            done: false,
            owner: owner
        }
    
    listArray.push(newItem);

    localStorage.setItem(owner, JSON.stringify(listArray));

    return newItem;
}

export function switchTodoItemDone({ todoItem }) {
    let listArray = getTodoList(todoItem.owner);
    

    const index = listArray.findIndex(item => item.id === todoItem.id);
    listArray[index].done = !listArray[index].done;

    localStorage.setItem(todoItem.owner, JSON.stringify(listArray));
}

export function deleteTodoItem({ element, todoItem }) {
    if (!confirm('Вы уверены?')) return

    element.remove();

    let listArray = getTodoList(todoItem.owner);
    for (let i = 0; i < listArray.length; i++) {
        if (listArray[i].id === todoItem.id) {
            listArray.splice(i, 1);
        }
    }
    localStorage.setItem(todoItem.owner, JSON.stringify(listArray));
}