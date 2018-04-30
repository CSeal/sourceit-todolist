import React, {Component, Fragment} from "react";
import {map, compact} from "lodash";
import CategoryItem from "../CategoryItem";
class CategoriesList extends Component{

    createListNumber(str, numberSeporator){

        str = str.split(numberSeporator);
        if(str.length === 0) return;
        str[str.length - 1] = +str[str.length - 1] + 1;
        return str.join('.');
    }

    render(){
        const {parentId, categories, numberSeporator ='.'} = this.props;
        let {menuElemNumber = '0', to = ""} = this.props;
        let categoryElements = compact(map(categories, item=>{
            if(parentId === item.parent){
                menuElemNumber = this.createListNumber(menuElemNumber, numberSeporator);

                return(<CategoryItem key={item.id}
                                     item={item}
                                     parentId={parentId}
                                     itemsForNextSerch={categories}
                                     menuElemNumber={menuElemNumber}
                                     numberSeporator={numberSeporator}
                                        to={to}/>)
            }
         }));
       return categoryElements.length > 0? <ul>{categoryElements}</ul>: null;
    }
}
export default CategoriesList;
