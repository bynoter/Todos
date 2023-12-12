import { Todo } from "../todos/models/todo.model";

export const Filters={
   All:'all',
   Completed: 'Completed',
   Pending:'Pending'

}

const state ={
    todos:[
        new Todo('Pieda del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}
const initStore=()=>{

   // console.log(state);
    loadStore();
    console.log('InitStore 🥑');
}


const loadStore=()=>{
   // console.log("estorage"+localStorage.getItem('state'));
    if(!localStorage.getItem('state')) return;
    //vamos a destructurar el state
    const {todos=[],filter=Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos=todos;
    state.filter=filter;
}
/**
 * Esta funcion es para almaccenar informacion en el LocalStorage
 */
const saveStateToLocalStorage =()=>{
    //localStorage.setItem('holaMundoStorage','Hola Mundo');
    localStorage.setItem('state',JSON.stringify(state));
}

const getTodos=(filter = Filters.All)=>{
    switch(filter){
        case Filters.All:
            return [...state.todos];

        case  Filters.Completed:
            return state.todos.filter(todo=>todo.done);

        case Filters.Pending:
            return state.todos.filter(todo=>!todo.done);

        default:
            throw new Error (`Option ${filter} is not valid.`);

    }

}


const addTodo=(description)=>{
    if(!description) throw new Error('Description is required.');
    state.todos.push(new Todo(description));


    saveStateToLocalStorage();

}

const toggleTodo=(todoId)=>{
//    throw new Error ('Not implemeted');
     state.todos=state.todos.map(todo=>{
        if(todo.id===todoId){
            todo.done=!todo.done;
        }
        return todo;
     });

    saveStateToLocalStorage();

}

const deleteTodo=(todoId)=>{
    state.todos=state.todos.filter(todo =>todo.id !==todoId);

    saveStateToLocalStorage();
    
}

const deleteCompleted=()=>{
    state.todos=state.todos.filter(todo =>!todo.done);

    saveStateToLocalStorage();

}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter=(newFilter = Filters.All)=>{

    state.filter=newFilter;
    
    saveStateToLocalStorage();

}

const getCurrentFilter=()=>{
    //throw new Error ('Not implemeted');
    return state.filter;
}

export default{
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}