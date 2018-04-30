import React, {Component, Fragment} from "react";
import propTypes from "prop-types";
import "./style.css";
 class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <header>
                    <span>Header</span>
                </header>
        )
    }
}

Header.propTypes = (process.env.NODE_ENV !== "production")? {} : {};
export default Header;