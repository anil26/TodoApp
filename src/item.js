import {  ListGroup, ListGroupItem } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component{
  constructor(props){
    super(props);
    this.remove=this.remove.bind(this);
    this.state={
      isDone : false
    }
  }
  remove(event){
    event.stopPropagation();
    this.props.removeTodo(this.props.id);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      isDone: nextProps.isDone
    })
  }
  onClickTodo(event){
    var element=event.target;
    var currentState=element.style.textDecoration;
    var referenceToTodo=ReactDOM.findDOMNode(this.refs.todo);
    if(currentState ==""){
      event.target.style.textDecoration="line-through";
      referenceToTodo.style.backgroundColor="green"
      this.props.updateTodo(this.props.id,true);
    }
    else{

      referenceToTodo.style.backgroundColor="cornflowerblue";
      event.target.style.textDecoration="initial";
      this.props.updateTodo(this.props.id,false);

    }
  }
  render(){
    var doneClass;
    if(this.props.isDone){
      doneClass="donetaskcss";
    }
    else{
      doneClass="";
    }
    return (

      <ListGroup className={doneClass}>
        <ListGroupItem ref="todo" onClick={this.onClickTodo.bind(this)} className="list" style={this.props.isDone? {backgroundColor : "green"} : {}}>
        <h3>{this.props.title}</h3>
        <button onClick={this.remove.bind(this)} className="cancelbutton">x</button>
        </ListGroupItem>
      </ListGroup>
    );
  }
}


export default Item;