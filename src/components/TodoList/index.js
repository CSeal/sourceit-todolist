import React, {Fragment} from "react";
import {map, filter} from "lodash";
import TodoItem from "../TodoItem";
const TodoList = ({todos, todoEventHandlers, match={}})=>{
    if(match.params && match.params.id){
        let idsPattern = new RegExp('^' + match.params.id, 'i');
        todos = filter(todos, item=>{
            return idsPattern.test(item.categoriesId);
        });
    }
    const todoElements = map(todos, item=><li key={item.id}>
                            <section className={item.done?"todo-done":""}>
                            <TodoItem item={item}
                                      todoEventHandlers={todoEventHandlers}/>
                            </section></li>);

    return (<Fragment>
                <header>ToDo List</header>
                <ul>{todoElements}</ul>
            </Fragment>)
};

export default TodoList;