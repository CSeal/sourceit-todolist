import React from "react";
import {map} from "lodash";
import TodoItem from "../TodoItem";
const TodoList = ({todos, todoEventHandlers})=>{
    const todoElements = map(todos, item=><li key={item.id}>
                            <section className={item.done?"todo-done":""}>
                            <TodoItem item={item}
                                      todoEventHandlers={todoEventHandlers}/>
                            </section></li>);

    return (<ul>{todoElements}</ul>)
};

export default TodoList;