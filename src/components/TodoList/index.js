import React, {Fragment} from "react";
import {map, filter} from "lodash";
import TodoItem from "../TodoItem";
const TodoList = ({todos, todoEventHandlers, match={}, catsIdDelimetr})=>{
    if(match.params && match.params.id){
        let idsPattern = new RegExp('^' + match.params.id, 'i');
        todos = filter(todos, item=>{
            return idsPattern.test(item.categoriesId.join(catsIdDelimetr));
        });
    }
    const todoElements = map(todos, item=>{
                            let doneDate = new Date(item.dateToDone),
                                nowDate = new Date();
                            return(<li key={item.id}>
                            <section className={item.done?"todo-done":
                                (doneDate > nowDate ||
                                doneDate.toDateString() === nowDate.toDateString())?
                                        "todo-have-more-times":
                                        "todo-have-not-more-times"}>
                            <TodoItem item={item}
                                      todoEventHandlers={todoEventHandlers}/>
                            </section>
                            </li>)});

    return (<Fragment>
                <header>ToDo List</header>
                {todoElements.length > 0?<ul>{todoElements}</ul>:
                <h3>В этой категории отсутствуют напоминалки</h3>}
            </Fragment>)
};

export default TodoList;