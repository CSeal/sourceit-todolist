import React, {Component, Fragment} from "react";
import propTypes from "prop-types";
import CategoriesList from "../CategoriesList";
import "./style.css";
 class Aside extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {categories, catsIdDelimetr, catNumberDelimetr, countTodosForLink} = this.props;
            return (
                <aside id="leftAside">
                    <nav>
                        <header>Categories</header>
                        <CategoriesList categories={categories}
                                        parentId={null}
                                        catsIdDelimetr={catsIdDelimetr}
                                        catNumberDelimetr={catNumberDelimetr}
                                        countTodosForLink={countTodosForLink}
                        />
                    </nav>
                </aside>
        )
    }
}

/*Aside.propsDefault={
    categories: {}
};*/
Aside.propTypes = (process.env.NODE_ENV !== "production")? {} : {};
export default Aside;