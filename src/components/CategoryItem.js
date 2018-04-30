/*
Параматром приходит обьект Props.
Чтоб получить доступ к необходимому пропсу  надо делать деструктивное присваевание
 */
import React from "react";
import CategoriesList from "./CategoriesList";

const CategoryItem = ({item, parentId, itemsForNextSerch, menuElemNumber, numberSeporator})=>{
    return (<li id={item.id}>{menuElemNumber} {item.title}
        <CategoriesList parentId={item.id}
                        categories={itemsForNextSerch}
                        menuElemNumber = {menuElemNumber+= `${numberSeporator}0`}/>
    </li>)

};

export default CategoryItem;