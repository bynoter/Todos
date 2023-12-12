import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending} from './use-cases';

const ElementIDs={
    ClearCompletedButton: '.clear-completed',
    TodoList:'.todo-list', //este es la referencia al elemnto html
    NewTodoImput:'#new-todo-input',
    TodoFilters:'.filtro',
    PendingCountLabel:'#pending-count',
}



/**
 * 
 * @param {String} elementId 
 */
export const App=(elementId)=>{
    
    const displayTodos=()=>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList,todos);
        updatePendingCount();
    }
    const updatePendingCount =()=>{
        renderPending(ElementIDs.PendingCountLabel);
    }
    (()=>{
        const app= document.createElement('div');
        app.innerHTML=html;
        document.querySelector(elementId).append(app);
        displayTodos();
        
    })();

    //referencias HTML

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoImput)
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const ClearCompletedButton=document.querySelector(ElementIDs.ClearCompletedButton);
    const filtersLis=document.querySelectorAll(ElementIDs.TodoFilters);
    
    //Listeners
    newDescriptionInput.addEventListener('keyup',(event)=>{
        console.log(event);//la funcion de arriba escuchara la tecla precionada
        console.log(event.target.value); //target es el elemnto html
        if(event.keyCode !==13) return;
        if(event.target.value.trim().length ===0)return;//aqui extraigo el valor del input, con el trim()elimino lo sespaciosn al inicio y fin del value y con el length extraigo lo largo del value.

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value='';
    })

    todoListUL.addEventListener('click',(event)=>{
        const element=event.target.closest('[data-id]')//esto busca a el elemento padre mas cercano que contenga e data-id
        console.log(element.getAttribute('data-id'));
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click',(event)=>{
        console.log(event.target.className);// es para saber el nombre de la clase donde se dio click
        const isDestroyElement = event.target.className ==='destroy';//si la clase se llama destroy sera true
        console.warn(isDestroyElement);
        const element=event.target.closest('[data-id]')//esto busca a el elemento padre mas cercano que contenga e data-id
        if(!element || !isDestroyElement)return; //esto no arian nada y termina la funcion;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

    });


    ClearCompletedButton.addEventListener('click',()=>{
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLis.forEach(element=>{
        element.addEventListener('click',(element)=>{
            filtersLis.forEach(el=>el.classList.remove('selected'));//elimina las classes selected
            element.target.classList.add('selected');
            console.log(element.target.text);// para extraer el texto del <li>
            switch(element.target.text){
               case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;

            }
            displayTodos();
        })
    })
}