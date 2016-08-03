import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Items from './items';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      todos:{},
      doneTaskFilter : false,
      notDoneTaskFilter : false
    }
  }

  componentDidMount(){
    var that=this;
    firebase.database().ref('/todos').once('value').then(function(snapshot){
      that.setState({
        todos : snapshot.val()
      });
      }).catch(function(error){
        console.log(error);
    });
  }
  addTask(){
    var newTask=this.refs.input.value;
    this.refs.input.value="";
    if(newTask.trim()=="")
      return;
    var time=(new Date()).toISOString();
    var postData={
      "title" : newTask,
      "time" : time,
      "done" : false
    }
    var newPostKey = firebase.database().ref().child('todos').push().key;
    var updates={};
    updates['/todos/' + newPostKey] = postData;
    var that=this;
    firebase.database().ref().update(updates).then(function(snapshot){
      var todos=that.state.todos;
      todos[newPostKey]=postData;
      that.setState({
        todos : todos
      });
    });


  }
  updateTodo(id,value){
    var updates={};
    updates['/todos/' + id + "/done"]=value;
    var that=this;
    firebase.database().ref().update(updates).then(function(snapshot){
      var todos=that.state.todos;
      todos[id].done=value;
      that.setState({
        todos : todos
      })
    })
  }
  removeTodo(id){
    var that=this;
    firebase.database().ref('/todos/' + id ).remove().then(function(){
      var todos=that.state.todos;
      delete todos[id];
      that.setState({
        todos : todos
      });

    });
  }
  onClickDoneTask(){
    if(this.refs.donetask.checked==true){
      this.refs.notdonetask.checked=false;
      this.setState({
        doneTaskFilter : true,
        notDoneTaskFilter : false
      });
    }
    if(this.refs.donetask.checked==false){
      this.setState({
        doneTaskFilter : false,
        notDoneTaskFilter : false
      });
    }


  }
  onClickNotDoneTask(){
    if(this.refs.notdonetask.checked== true){
        this.refs.donetask.checked=false;
        this.setState({
        notDoneTaskFilter : true,
        doneTaskFilter : false
      });
    }
    if(this.refs.notdonetask.checked== false){
        this.setState({
        notDoneTaskFilter : false,
        doneTaskFilter : false
      });
    }

  }
  render() {
    return (
      <div className="page-header">
      <h1>My TodosList</h1>
      <div className="App">
        <input ref="input"className="input" type="text" placeholder="Add your todo"/>
        <button onClick={this.addTask.bind(this)}className="addtask">Add Task</button>
        <div className="checkbox">
        Done Task :<input ref="donetask" onClick={this.onClickDoneTask.bind(this)} type="checkbox"/>
        Not Done Task : <input onClick={this.onClickNotDoneTask.bind(this)} ref="notdonetask" type="checkbox"/>
        </div>

        <Items updateTodo={this.updateTodo.bind(this)} removeTodo={this.removeTodo.bind(this)} doneTaskFilter={this.state.doneTaskFilter} notDoneTaskFilter={this.state.notDoneTaskFilter} todos={this.state.todos}/>
      </div>
      </div>
    );
  }
}

export default App;
