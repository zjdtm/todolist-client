import Todo from "./Todo";
import "./App.css";
import React, { Component } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/AppService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      /* (1) 로딩 중이라는 상태를 표현할 변수
      생성자에 상태 변수를 추가한다. */
      loading: true,
    };
  }

  componentDidMount() {
    /* (2) componentDidMount에서 Todo 리스트를 가져오는
    GET 요청이 성공적으로 리턴하는 경우 loading을 false로 고친다.
    더 이상 로딩 중이 아니라는 뜻이다. */
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    /* 로딩 중이 아닐 때 렌더링할 부분 */
    var todoListPage = (
      <div className="App">
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    /* 로딩 중일 때 렌더링할 부분 */
    var loadingPage = <h1>로딩중..</h1>;
    var content = loadingPage;
    if (!this.state.loading) {
      /*로딩 중이 아니면 todoListPage를 선택 */
      content = todoListPage;
    }

    /* 선택한 content 렌더링 */
    return <div className="App">{content}</div>;
  }
}

export default App;
