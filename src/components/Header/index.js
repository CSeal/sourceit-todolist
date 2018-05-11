import React, {Component, Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {forEach} from "lodash";
import TodosProgressStatus from "../TodosProgressStatus";
import propTypes from "prop-types";
import "./style.css";
 function Header ({categories, todos, catsIdDelimetr}){
        return (
                <header id={'head'}>
                    <Switch>
                        <Route exact path='/' render={props=>{
                            const statusForTodos = {
                                complit: 0,
                                haveTimeToComplit: 0,
                                timeIsOut: 0,
                                total: 0
                            };
                            const today = new Date();
                            forEach(todos, item=>{
                                if(item.done){
                                    statusForTodos.complit++;
                                }else if(today < new Date(item.dateToDone) || today.toDateString() === item.dateToDone){
                                    statusForTodos.haveTimeToComplit++;
                                }else{
                                    statusForTodos.timeIsOut++;
                                }
                                statusForTodos.total++
                            });
                            return <TodosProgressStatus {...props} statusForTodos={statusForTodos}/>;
                        }}/>
                        <Route path='/todo/:id*' render={props=>{
                            const categoriIds = props.match.params.id.split(catsIdDelimetr);
                            const categoriesId = categoriIds[categoriIds.length -1];
                            const statusForTodos = {
                              complit: 0,
                              haveTimeToComplit: 0,
                              timeIsOut: 0,
                              total: 0
                            };
                            const today = new Date();
                            const todoIdRegExp = new RegExp('^'+ props.match.params.id);
                            forEach(todos, item=>{
                                const itemCatIdForMatch = item.categoriesId.join(catsIdDelimetr);
                                if(!todoIdRegExp.test(itemCatIdForMatch)) return;
                                if(item.done){
                                    statusForTodos.complit++;
                                }else if(today < new Date(item.dateToDone) || today.toDateString() === item.dateToDone){
                                    statusForTodos.haveTimeToComplit++;
                                }else{
                                    statusForTodos.timeIsOut++;
                                }
                                statusForTodos.total++
                            });
                            return <TodosProgressStatus {...props} categoriTitle={categories[categoriesId].title}
                                                        statusForTodos={statusForTodos}/>;
                        }}/>
                        <Route path='/' component={TodosProgressStatus}/>
                    </Switch>
                </header>
        )
}

Header.propTypes = (process.env.NODE_ENV !== "production")? {} : {};
export default Header;