import React, {Component, Fragment} from "react";
import propTypes from "prop-types";
import CategoriesList from "../CategoriesList";
import "./style.css";
 class Aside extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {categories} = this.props;
        const toDoList = Object.assign({}, this.props.toDoList);
            return (
                <aside id="leftAside">
                    <nav>
                        <header>Categories</header>
                        <CategoriesList categories={categories} parentId={null} />
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