import React, {Component, Fragment} from "react";
import {map, compact} from "lodash";
import CategoryItem from "../CategoryItem";
class CategoriesList extends Component{

    createListNumber(str, numberDelimetr){

        str = str.split(numberDelimetr);
        if(str.length === 0) return;
        str[str.length - 1] = +str[str.length - 1] + 1;
        return str.join(numberDelimetr);
    }

    render(){
        const {parentId, categories, catNumberDelimetr ='.', catsIdDelimetr, countTodosForLink} = this.props;
        let {menuElemNumber = '0', to = ""} = this.props;
        let categoryElements = compact(map(categories, item=>{
            if(parentId === item.parent){
                menuElemNumber = this.createListNumber(menuElemNumber, catNumberDelimetr);

                return(<CategoryItem key={item.id}
                                     item={item}
                                     parentId={parentId}
                                     itemsForNextSerch={categories}
                                     menuElemNumber={menuElemNumber}
                                     catNumberDelimetr={catNumberDelimetr}
                                     catsIdDelimetr={catsIdDelimetr}
                                     countTodosForLink={countTodosForLink}
                                        to={to}/>)
            }
         }));
       return categoryElements.length > 0? <ul>{categoryElements}</ul>: null;
    }
}
export default CategoriesList;
