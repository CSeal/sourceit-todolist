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
        this.todoDateSet = this.todoDateSet.bind(this);
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

    todoDateSet(day){
        if(day > (new Date()) || day.toLocaleDateString() === new Date().toLocaleDateString()){
            const {item={}} = this.state;
            const newItem = Object.assign({}, item, {dateToDone: day.toDateString()});
            this.setState({
                item: newItem
            });
        }
    }

    todoDone(ev){
        const {item={}} = this.state;
        if(item.done === undefined){
            item.done = !this.props.item.done;
        }else{
            item.done = !item.done;
        }
            item.dateToDone = new Date().toDateString();
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
    reservDaysTitleReplace(str){
        return str.replace(/-?(\d*(\d))/, (match, allNumb, lastNumb)=>{
            const lastTowNumb = allNumb.substr(-2);
            if(allNumb.length > 1 && ['11', '12', '13', '14'].find(value =>
                value === lastTowNumb
            )){
                return `${match} дней`;
            }
            switch (lastNumb) {
                case '1':
                    return `${match} день`;
                case '2':
                case '3':
                case '4':
                    return `${match} дня`;
                default:
                    return `${match} дней`;
            }
        });
    }
     getHead(item){
        const doneDate = new Date(item.dateToDone), nowDate = new Date();
         let  reserveDays = (doneDate.getTime()- nowDate.getTime())/(1000*60*60*24);
         reserveDays = (reserveDays > 0? Math.ceil(reserveDays) : Math.floor(reserveDays)) + 1;
        const {isOpen, isEdit} = this.state;
            return <header className={'todo-header'}>
                <div className={'todo-title'}>
               {isEdit?<input type="text" value={item.title} onChange={this.todoTitleChange}/>:item.title}
                </div>
             <div className={"todo-status"}>
                 <button onClick={this.todoToggle}>{isOpen?"Свернуть":"Развернуть"}
                     <i className={'toggle-icon ' + (isOpen?"fa fa-chevron-circle-up": "fa fa-chevron-circle-down")} aria-hidden={"true"}/>
                 </button>
                 <span className={'done-date'}>Дата окончания: <i>{item.dateToDone}</i></span>
                 {item.done ? null : <span className={`reserve-days ${reserveDays >= 0 ? 'reserve-days-up' : 'reserve-days-down'}`}>
                     {reserveDays === 0? 'Сегодня' : `${reserveDays > 0 ? '+' : ""} ${this.reservDaysTitleReplace(reserveDays.toString())}`}</span>}
                 <label className={'done-info'}>{this.props.item.done?"Сделано! Супер!!!" : "Не сделано?!!!"}
                 {isEdit?<input type="checkbox" checked={item.done} onChange={this.todoDone}/>:null}</label>
             </div>
         </header>
     }

     getBody(item){
        const {isOpen, isEdit} = this.state, myRange = {};
        const doneDate = new Date(item.dateToDone), nowDate = new Date();
          if(isOpen){
              if(!item.done){
                  if(doneDate > nowDate || doneDate.toLocaleDateString() === nowDate.toLocaleDateString()){
                      myRange['have-time']={
                          from: doneDate,
                          to: nowDate
                      }
                  }else{
                      myRange['have-not-time']={
                          from: nowDate,
                          to: doneDate
                      }
                  }
              }else{
                  myRange['todo-done']= doneDate;
              }
              return (<div className={"todo-content"}>
                 {isEdit?<div><textarea value={item.text} onChange={this.todoContentChange}/></div>:
                 <div>{item.text}</div>}
                 <DayPicker modifiers={myRange} onDayClick={isEdit? this.todoDateSet : null} month={item.done?doneDate:nowDate}/>
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