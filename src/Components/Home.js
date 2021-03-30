import React, { Component } from "react";
import { connect } from "react-redux";
import List from "./List";
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  INITIAL_LOAD
} from "../Actions/actions";
import { fetchTodos } from "../Actions/fetchTodos";
import "../styles/index.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    //bind methods to the constructor
    this.addTodo = this.addTodo.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount() {
    const { firstLoad } = this.props;
    if (firstLoad) {
    } else {
      this.props.dispatch(fetchTodos());
      this.props.dispatch({
        type: INITIAL_LOAD
      });
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.state.value.length > 0) {
      this.props.dispatch({
        type: ADD_TODO,
        title: this.state.value,
        id: new Date(),
        completed: false
      });
      this.setState({ value: "" }); //clean input after add
    }
  }

  // method to handle form input
  handleOnChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  //method to remove a todo item from todos array
  removeTodo(todo) {
    this.props.dispatch({
      type: REMOVE_TODO,
      id: todo.item.id
    });
  }

  toggleTodo(todo) {
    console.log(todo);
    this.props.dispatch({
      type: TOGGLE_TODO,
      id: todo.id
    });
  }

  render() {
    const { error, loading } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="md:mt-20 max-w-screen-lg mx-auto">
          <div>
            <div className="space-y-6">
              <h4 className="text-2xl">Todo List</h4>
              <form onSubmit={this.addTodo}>
                <div className="flex mt-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-2 mr-2 text-grey-darker"
                    type="text"
                    placeholder="What do you need to do?"
                    value={this.state.value}
                    onChange={this.handleOnChange}
                  />
                  <button className="border-2 text-blue-600 border-blue-300 p-2 rounded hover:text-white hover:bg-blue-300">
                    Add
                  </button>
                </div>
              </form>
              <List
                items={this.props.todos}
                removeTodo={this.removeTodo}
                toggleTodo={this.toggleTodo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    firstLoad: state.firstLoad
  };
}

export default connect(mapStatetoProps)(Home);
