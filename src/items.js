import React from 'react';
import Item from './item';


class Items extends React.Component{
  constructor(props){
    super(props);
    this.createTodosHtml=this.createTodosHtml.bind(this);
  }
  createTodosHtml(){
    var keys=Object.keys(this.props.todos);
    var todosObject=this.props.todos;
    var that=this;
    if(this.props.doneTaskFilter){
      return keys.map(function(current,index,array){
        if(todosObject[current].done==true){
          return (<Item  isDone={todosObject[current].done} title={todosObject[current].title}  key={current}  id={current} removeTodo={that.props.removeTodo} updateTodo={that.props.updateTodo}></Item>);
        }
        else{
          return "";
        }
      });
    }

    if(this.props.notDoneTaskFilter){
      return keys.map(function(current,index,array){
        if(todosObject[current].done==false){
          return (<Item  isDone={todosObject[current].done} title={todosObject[current].title} onClick={that.onClicking} key={current}  id={current} removeTodo={that.props.removeTodo} updateTodo={that.props.updateTodo}></Item>);
        }
        else{
          return "";
        }
      });
    }
    return keys.map(function(current,index,array){
      return (<Item  isDone={todosObject[current].done} title={todosObject[current].title} onClick={that.onClicking} key={current}  id={current} removeTodo={that.props.removeTodo} updateTodo={that.props.updateTodo}></Item>);
    });
  }
  render(){
    return (
      <div>
      {this.createTodosHtml()}
      </div>
    );
  }
}


export default Items;