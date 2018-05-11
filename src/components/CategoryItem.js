import React from "react";
import {NavLink} from 'react-router-dom';
import CategoriesList from "./CategoriesList";
import {Badge} from "react-bootstrap";

const CategoryItem = ({item, parentId,
                          itemsForNextSerch, menuElemNumber,
                          catNumberDelimetr, catsIdDelimetr,
                          countTodosForLink, to})=>{
    if(to){
       to += catsIdDelimetr + item.id;
    }else{
        to = item.id;
    }
    return (<li><NavLink to={`/todo/${to}/`} activeClassName="selected">{menuElemNumber} {item.title} <Badge>{countTodosForLink(to, catsIdDelimetr)}</Badge></NavLink>
        <CategoriesList parentId={item.id}
                        categories={itemsForNextSerch}
                        menuElemNumber = {menuElemNumber+= `${catNumberDelimetr}0`}
                        catNumberDelimetr = {catNumberDelimetr}
                        catsIdDelimetr = {catsIdDelimetr}
                        countTodosForLink={countTodosForLink}
                        to={to}/>
    </li>)

};

export default CategoryItem;