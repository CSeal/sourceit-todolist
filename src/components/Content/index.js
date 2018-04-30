import React, {Component, Fragment} from "react";
import propTypes from "prop-types";
import TodoList from "../TodoList";
import "./style.css";
 class Content extends Component{
    constructor(props){
        super(props);
    }
    render(){
        //console.log(this.props.todos);
        return (
                <section id="content">
                    <header>ToDo List</header>
                    <TodoList {...this.props}/>
                </section>
        )
    }
}

Content.propTypes = (process.env.NODE_ENV !== "production")? {} : {};
export default Content;