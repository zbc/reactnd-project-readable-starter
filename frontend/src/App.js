import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsDetail from "./components/posts_detail";
import PostsEdit from "./components/posts_edit";
import CategoryIndex from "./components/category_index";
import CategoryPosts from "./components/category_posts";
import CommentEdit from "./components/comment_edit";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <div className="container-fluid main">
        <div className="row">
          <CategoryIndex />
        </div>
        <hr />
        <Switch>
          <Route exact path="/" component={PostsIndex} />
          <Route
            exact
            path="/:category/:id/comments/:commentid/edit"
            component={CommentEdit}
          />
          <Route exact path="/:category/:id/edit" component={PostsEdit} />
          <Route exact path="/:category/:id" component={PostsDetail} />
          <Route exact path="/posts" component={PostsNew} />
          <Route exact path="/:category" component={CategoryPosts} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
