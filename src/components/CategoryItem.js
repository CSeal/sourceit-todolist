/*
Параматром приходит обьект Props.
Чтоб получить доступ к необходимому пропсу  надо делать деструктивное присваевание
 */
import React from "react";
import {NavLink} from 'react-router-dom';
import CategoriesList from "./CategoriesList";

const CategoryItem = ({item, parentId, itemsForNextSerch, menuElemNumber, numberSeporator, to})=>{
    if(to){
       to += `-${item.id}`;
    }else{
        to = item.id;
    }
    return (<li><NavLink to={`/todo/${to}/`} activeClassName="selected">{menuElemNumber} {item.title}</NavLink>
        <CategoriesList parentId={item.id}
                        categories={itemsForNextSerch}
                        menuElemNumber = {menuElemNumber+= `${numberSeporator}0`}
                        to={to}/>
    </li>)

};

export default CategoryItem;