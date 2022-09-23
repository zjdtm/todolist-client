import Todo from './Todo';
import './App.css';
import React, { Component } from 'react';
import { Container, List, Paper } from '@mui/material';
import AddTodo from './AddTodo';
import { call } from "./service/AppService";

class App extends Component {

  componentDidMount() {
    call("/todo", "GET", null).then((response) => 
      this.setState({ items : response.data })
    );
  }

  constructor(props){
    super(props);
    this.state = {
        items : [ ],
      };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) => 
      this.setState({ items : response.data })
    )
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => 
      this.setState({ items : response.data})
    )
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin : 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete}/>
          ))}
        </List>
      </Paper>
    );
    return (
      <div className='App'>
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
