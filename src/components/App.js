import React, {Component, Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import Content from "./Content";

class App extends Component {
    constructor(){
        super();
        this.state = {
            catNumberDelimetr: '.',
            catsIdDelimetr: '-'
        };
        this.todoListSaveChange = this.todoListSaveChange.bind(this);
        this.countTodosForLink = this.countTodosForLink.bind(this);
    }
    initCatData(data){
         if(data.Categories) return data.Categories;
    }
    initToDoData(data){
        if(data.ToDoList) return data.ToDoList;
    }
    componentWillMount(){
    this.setState({
        categories: this.initCatData(this.props.sourceData),
        toDoList: this.initToDoData(this.props.sourceData)
        });
    }

    countTodosForLink(catsId, catsIdDelimetr){
        let count = 0, catsIdRegExp = new RegExp(`^${catsId}`, 'i');
        const {toDoList} = this.state;
        for(let key in toDoList){
            if(catsIdRegExp.test(toDoList[key].categoriesId.join(catsIdDelimetr))){
                ++count;
            }
        }
        return count;
    }

    todoListSaveChange(item){
        const{toDoList}=this.state;
        const updatedTodoItem = Object.assign(toDoList[item.id], item);
        toDoList[item.id] = updatedTodoItem;
        this.setState({toDoList});
        return true;
    }
    render(){
        const {activeCatId, categories, toDoList, catsIdDelimetr, catNumberDelimetr} = this.state;
        const todoEventHandlers ={todoListSaveChange: this.todoListSaveChange};
        return (
            <Fragment>
                <Header categories={categories}
                        todos={toDoList}
                        catsIdDelimetr={catsIdDelimetr}/>
                <Aside categories={categories}
                       catsIdDelimetr={catsIdDelimetr}
                       catNumberDelimetr={catNumberDelimetr}
                       countTodosForLink={this.countTodosForLink}/>
                <Content todos={toDoList}
                         todoEventHandlers={todoEventHandlers}
                         catsIdDelimetr={catsIdDelimetr}/>
            </Fragment>
        )
    }
}

export default App;