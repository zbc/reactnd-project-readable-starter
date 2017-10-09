import React, { Component } from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsDetail from './components/posts_detail'

class App extends Component {
  render() {
    return (
      <div className="container-fluid main">
        <Switch>
          <Route path="/posts/:id" component={PostsDetail}></Route>
          <Route path="/posts" component={PostsNew} ></Route>
          <Route path="/" component={PostsIndex}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
