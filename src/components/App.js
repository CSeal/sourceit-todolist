import React, {Component, Fragment} from "react";

import Header from "./Header";
import Aside from "./Aside";
import Content from "./Content";
//import SourceData from "../staticSourceData";

class App extends Component {
    constructor(){
        super();
        this.state = {
            activeCatId: null
        };
        this.todoListSaveChange = this.todoListSaveChange.bind(this);
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

    todoListSaveChange(item){
        const{toDoList}=this.state;
        const updatedTodoItem = Object.assign(toDoList[item.id], item);
        toDoList[item.id] = updatedTodoItem;
        this.setState({toDoList});
        return true;
    }
    render(){
        const {activeCatId, categories, toDoList} = this.state;
        const todoEventHandlers ={todoListSaveChange: this.todoListSaveChange};
        return (
            <Fragment>
                <Header/>
                <Aside categories={categories}
                       activeCatId={activeCatId}
                       toDoList={toDoList}/>
                <Content todos={toDoList}
                         todoEventHandlers={todoEventHandlers}/>
            </Fragment>
        )
    }
}
/*App.propsDefault = {
    sourceData:{
        Categories: null,
        ToDoList: null
    }
};*/
export default App;