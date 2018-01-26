import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchCategoryPosts } from "../actions";
import { Link } from "react-router-dom";
import Post from "./post";

class CategoryPosts extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchCategoryPosts(category);
  }

  componentWillReceiveProps(nextProps) {
    //call your api and update state with new props

    if (this.props.match.params.category !== nextProps.match.params.category) {
      this.props.fetchCategoryPosts(nextProps.match.params.category);
    }
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      const { id, title, body, author, timestamp, category, voteScore } = post;

      return (
        <Post
          key={id}
          id={id}
          title={title}
          body={body}
          author={author}
          timestamp={timestamp}
          category={category}
          voteScore={voteScore}
          isDetail={false}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts">
            Add a Post
          </Link>
        </div>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">{this.renderPosts()}</div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(mapStateToProps, { fetchCategoryPosts })(CategoryPosts);
