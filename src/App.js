import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { actionCreators } from './student';
import { connect } from 'react-redux';
import axios from 'axios';
import {Table, Form, FormControl, Button} from 'react-bootstrap';

const mapStateToProps = (state) => ({
  todos: state.todos,
  ranks: state.ranks
})

class App extends Component {
    constructor(props){
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      const {dispatch} = this.props
      axios.get('https://my.api.mockaroo.com/students.json?key=5dde5e00')
      .then((response) =>{
        dispatch(actionCreators.list(response.data));
        dispatch(actionCreators.rank(response.data));
      })
    }

    handleSubmit(){
      const {dispatch} = this.props;
      dispatch(actionCreators.add({"name":this.state.name,"marks":this.state.marks}))
    }

    handleChange(e){
      this.setState({[e.target.name]:e.target.value})
    }

  render() {
    const {todos,ranks} = this.props;
    const rank = ranks.slice();
    rank.sort(function(obj1,obj2){
      return obj2.marks - obj1.marks
    })
     return(
        <div>
            <Form  inline>
                <FormControl
                    type="text"
                    placeholder="Enter Student Name"
                    onBlur={this.handleChange}
                    name="name"
                />{" "}
                <FormControl
                    type="text"
                    placeholder="Enter Student Marks"
                    onBlur={this.handleChange}
                    name="marks"
                />{" "}
                <Button onClick={this.handleSubmit} bsStyle="primary">Add</Button>
            </Form>
            <Table responsive>
              <thead>
                <tr>
                    <th>STUDENT-NAME</th>
                    <th>MARKS</th>
                </tr>
              </thead>
            <tbody>
                { 
                    Object.keys(todos).map(function(key, index) {
                      return (
                      <tr key={key}>
                        <td>{todos[key]['name']}</td>
                        <td>{todos[key]['marks']}</td>
                      </tr>
                      );
                    },this)
                }
            </tbody>
          </Table>
          <Table responsive>
            <thead>
              <tr>
                  <th>RANK</th>
                  <th>STUDENT-NAME</th>
              </tr>
            </thead>
            <tbody>
                { 
                    Object.keys(rank).map(function(key, index) {
                    {/* if(Object.keys(rank).length > 1 && key != '0'){ */}
                      return (
                          <tr key={key}>
                            <td>{parseInt(key)+1}</td>
                            <td>{rank[key]['name']}</td>
                          </tr>
                      );
                    {/* } */}
                    },this)
                }
            </tbody>
          </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
