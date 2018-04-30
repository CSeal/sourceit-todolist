import React, {Component, Fragment} from "react";
import propTypes from "prop-types";
import TodoList from "../TodoList";
import "./style.css";
import {Route, Switch} from 'react-router-dom';
import Action404 from "../Action404";
 class Content extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <section id="content">
                    <Switch>
                        <Route exact path='/' render={props =>(
                            <TodoList {...this.props} {...props}/>
                        )}/>
                        <Route path='/todo/:id*'  render={props =>{
                            return (<TodoList {...this.props} {...props}/>
                        )}}/>
                        <Route path='/' component={Action404}/>
                    </Switch>
                </section>
        )
    }
}

Content.propTypes = (process.env.NODE_ENV !== "production")? {} : {};
export default Content;