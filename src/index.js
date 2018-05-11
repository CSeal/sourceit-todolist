import React from "react";
import {render} from "react-dom";
import App from "./components/App";
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import SourceData from "./staticSourceData";
render((<BrowserRouter>
            <App sourceData={SourceData} />
        </BrowserRouter>
    ),document.getElementById('container'));

/*----------------------------CALCULYATOR-------------------------------------------*/
const NUMBER_ADD = 'NUMBER_ADD', MATH_OP_ADD = 'MATH_OP_ADD',
    RESULT_OUTPUT = 'RESULT_OUTPUT', DISPLAY_CLEAR = 'DISPLAY_CLEAR', NUMBER_REMOVE = 'NUMBER_REMOVE';
const MATH_OPERATION = {
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE'
};
const initialState = {
    display: {
        value: '0',
        math_operation: null,
        must_clearing: false
    },
    buffer: null

};
const maxDisplaySize = 14;
const input_point = document.querySelector('#calculator .calculator');

const numberResultDisplay = input_point.querySelector('.number-result');
const mathOpDisplay = input_point.querySelector('.operation > span');
const createAction = (type)=>(payload)=>{
    return {type, payload}
};
const addNumber = createAction(NUMBER_ADD);
const addMathOperation = createAction(MATH_OP_ADD);
const clearDisplay = createAction(DISPLAY_CLEAR);
const removeLastNumber = createAction(NUMBER_REMOVE);
const printResult =createAction(RESULT_OUTPUT);
const reduser = (state = initialState, action)=>{
    const previousValue = Object.assign({}, state);
    switch(action.type){
      case NUMBER_ADD:{
          const {payload} = action;
          if(previousValue.display.value.length >= maxDisplaySize ||
            (payload.value === '.' && previousValue.display.value.indexOf('.') !== -1)){
                return state;
          }
          const display = Object.assign({}, previousValue.display, {value: (previousValue.display.must_clearing ||
                                                (previousValue.display.value === '0' && payload.value !== '.'))?
                  payload.value :  previousValue.display.value + payload.value,
                                                                    must_clearing: false});
          return Object.assign({}, state, {display});
      }

      case MATH_OP_ADD:{
        const {payload} = action;
        if(previousValue.display.math_operation !== null){
            return state;
        }
        return Object.assign({}, state, {
                                    display: {
                                        value: '0',
                                        math_operation: payload.math_op,
                                        must_clearing: previousValue.display.must_clearing
                                    },
                                    buffer: previousValue.display.value
                                                                        })
      }

      case RESULT_OUTPUT:{
          let result;
          switch(previousValue.display.math_operation){
                case MATH_OPERATION.PLUS:{
                    result= +previousValue.buffer + +previousValue.display.value;
                    break;
                }
                case MATH_OPERATION.MINUS:{
                    result= +previousValue.buffer - +previousValue.display.value;
                    break;
                }
                case MATH_OPERATION.MULTIPLY:{
                    result= +previousValue.buffer * +previousValue.display.value;
                    break;
                }
                case MATH_OPERATION.DIVIDE:{
                    if(+previousValue.display.value === 0){
                        return state;
                    }
                    result = +previousValue.buffer / +previousValue.display.value;
                    break;
                }
                default:
                    return state;
            }
            if(result.toString().length >= maxDisplaySize){
            result = result.toExponential(5);
           }
          return Object.assign({}, state, {
                                          display: {
                                              value: result,
                                              math_operation: null,
                                              must_clearing: true
                                          },
                                          buffer:null
                                                        })
      }
      case DISPLAY_CLEAR:
            return initialState;
      case NUMBER_REMOVE: {
          if (previousValue.display.value.length === 0) {
              return state;
          }
          if (previousValue.display.value.length === 1) {
              const display = Object.assign({}, previousValue.display, {value: '0'});
              return Object.assign({}, state, {display})
          }
          previousValue.display.value = previousValue.display.value.substring(0, previousValue.display.value.length - 1);
          const display = Object.assign({}, previousValue.display, {value: previousValue.display.value});
          return Object.assign({}, state, {display});
      }
      default:
          return state;
  }
};
const store = createStore(reduser);
const unsetSubscribe = store.subscribe(()=>{
    const {display} = store.getState();
    numberResultDisplay.textContent = display.value;
    switch (display.math_operation){
        case MATH_OPERATION.PLUS:
            mathOpDisplay.textContent = '\u002B';
            break;
        case MATH_OPERATION.MINUS:
            mathOpDisplay.textContent = '\u2212';
            break;
        case MATH_OPERATION.MULTIPLY:
            mathOpDisplay.textContent = '\u00D7';
            break;
        case MATH_OPERATION.DIVIDE:
            mathOpDisplay.textContent = '\u00F7';
            break;
        default:
            mathOpDisplay.textContent = "";
    }
});
input_point.querySelectorAll('.btn.number').forEach((value, index)=>{
    value.addEventListener('click', ev=>{
        store.dispatch(addNumber({value: ev.target.textContent}));
    })
});
input_point.querySelector('.plus').addEventListener('click', ()=>{
        store.dispatch(addMathOperation({math_op: MATH_OPERATION.PLUS}))
});
input_point.querySelector('.minus').addEventListener('click', ()=>{
    store.dispatch(addMathOperation({math_op: MATH_OPERATION.MINUS}))
});
input_point.querySelector('.multiply').addEventListener('click', ()=>{
    store.dispatch(addMathOperation({math_op: MATH_OPERATION.MULTIPLY}))
});
input_point.querySelector('.divide').addEventListener('click', ()=>{
    store.dispatch(addMathOperation({math_op: MATH_OPERATION.DIVIDE}))
});
input_point.querySelector('.result').addEventListener('click', ()=>{
    store.dispatch(printResult())
});
input_point.querySelector('.clear').addEventListener('click', ()=>{
    store.dispatch(clearDisplay());
});
input_point.querySelector('.backspace').addEventListener('click', ()=>{
    store.dispatch(removeLastNumber());
});