import React, {Fragment} from 'react';
import {ProgressBar} from "react-bootstrap";
import propTypes from "prop-types";
function TodosProgressStatus({categoriTitle, statusForTodos={complit:0, haveTimeToComplit:0, timeIsOut:0, total:0}}){
    const  {complit, haveTimeToComplit, timeIsOut, total} = statusForTodos;
    const todoLenFromProgBar = total !== 0? (100 / total).toFixed() : 0;
    return (<Fragment>
        <h3>Progress for <i>{categoriTitle? categoriTitle : `ALL`}</i> :</h3>
        {total === 0? <h4>Nothing to view!</h4>:
            <ProgressBar>
                <ProgressBar now={todoLenFromProgBar * complit} bsStyle={'warning'}
                             label={`Complit ${complit}`}/>
                <ProgressBar now={todoLenFromProgBar * haveTimeToComplit} bsStyle={'success'}
                             label={`Have time ${haveTimeToComplit}`}/>
                <ProgressBar now={todoLenFromProgBar * timeIsOut} bsStyle={'danger'}
                             label={`Time is out ${timeIsOut}`}/>
            </ProgressBar>}
        </Fragment>)
}
export default TodosProgressStatus;