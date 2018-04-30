import React, {Component, Fragment} from "react";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
 class TodoItem extends Component{
    constructor(props){
        super(...props);
        this.state={
            isOpen: false,
            isEdit: false,
            item: undefined
        };

        this.todoToggle = this.todoToggle.bind(this);
        this.todoTitleChange = this.todoTitleChange.bind(this);
        this.todoEditSave = this.todoEditSave.bind(this);
        this.todoChangeRollBack = this.todoChangeRollBack.bind(this);
        this.todoEditMode = this.todoEditMode.bind(this);
        this.todoDelete = this.todoDelete.bind(this);
        this.todoContentChange = this.todoContentChange.bind(this);
        this.todoDone = this.todoDone.bind(this);
    }

   todoToggle() {
       const {isOpen, isEdit} = this.state;
        if (isOpen && isEdit) {
            return;
        }
        this.setState({
            isOpen: !isOpen
        });
    }

    todoTitleChange(ev){
        const {item={}} = this.state;
        const newItem = Object.assign(item, {title: ev.target.value});
        this.setState({
            item: newItem
        })
    }

    todoContentChange(ev){
        const {item={}} = this.state;
        const newItem = Object.assign(item, {text: ev.target.value});
        this.setState({
            item: newItem
        })
    }

    todoDone(ev){
        const {item={}} = this.state;
        if(item.done === undefined){
            item.done = !this.props.item.done;
        }else{
            item.done = !item.done;
        }

        this.setState({
            item
        })
    }

    todoEditMode(ev){
          this.setState({
            isOpen: true,
            isEdit: true
        })
    }

    todoDelete(ev){

    }

    todoEditSave(){
        const {todoListSaveChange} = this.props.todoEventHandlers;
        const item = Object.assign({}, {id: this.props.item.id}, this.state.item);
        this.setState({
            item: undefined,
            isEdit: false
        });
        todoListSaveChange(item);
    }

    todoChangeRollBack(){
        this.setState({
            item: undefined,
            isEdit: false
        });
    }

     getHead(item){
         const {isOpen, isEdit} = this.state;
            return <header className={'todo-header'}>
                <div className={'todo-title'}>
               {isEdit?<input type="text" value={item.title} onChange={this.todoTitleChange}/>:item.title}
                </div>
             <div className={"todo-status"}>
                 <button onClick={this.todoToggle}>{isOpen?"Свернуть":"Развернуть"}
                     <i className={'toggle-icon ' + (isOpen?"fa fa-chevron-circle-up": "fa fa-chevron-circle-down")} aria-hidden={"true"}></i>
                 </button>
                 <span className={'done-date'}>Дата окончания: <i>{item.dateToDone}</i></span>
                 <label className={'done-info'}>{this.props.item.done?"Сделано! Супер!!!" : "Не сделано?!!!"}
                 {isEdit?<input type="checkbox" checked={item.done} onChange={this.todoDone}/>:null}</label>
             </div>
         </header>
     }

     getBody(item){
        const {isOpen, isEdit} = this.state;
          if(isOpen){
             return (<div className={"todo-content"}>
                 {isEdit?<div><textarea value={item.text} onChange={this.todoContentChange}></textarea></div>:
                 <div>{item.text}</div>}
                 <DayPicker/>
                 </div>)

             }
     }
     getActionButton() {
         const {isEdit} = this.state;
         return (<div className={"todo-action"}>{isEdit?
                    <Fragment>
                        <button onClick={this.todoEditSave} className={"todo-action-save"}>Сохранить изменения</button>
                        <button onClick={this.todoChangeRollBack} className={"todo-action-rollback"}>Отменить изменения</button>
                    </Fragment>:
                    <Fragment>
                        <button onClick={this.todoEditMode} className={"todo-action-edit"}>Редактировать запись</button>
                        <button onClick={this.todoDelete} className={"todo-action-delete"}>Удалить запись</button>
                    </Fragment>}
             </div>)
     }
     render(){
        const {item:itemProps} = this.props;
        const {item:itemState={}} = this.state;
        const item = Object.assign({},itemProps, itemState);
        return(
            <Fragment>
                {this.getHead(item)}
                {this.getBody(item)}
                {this.getActionButton()}
            </Fragment>
        )
    }
}

export default TodoItem