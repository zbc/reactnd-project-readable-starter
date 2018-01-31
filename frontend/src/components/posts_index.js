import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchPosts, deleteComment } from "../actions";
import { Link } from "react-router-dom";
import Post from "./post";
import sortBy from "sort-by";

class PostsIndex extends Component {
  state = {
    sort: "voteScore"
  };
  componentWillMount() {
    this.props.fetchPosts();
  }
  componentDidMount() {
    this.props.fetchPosts();
  }

  onSortByVote() {
    this.setState({ sort: "voteScore" });
  }

  onSortByTime() {
    this.setState({ sort: "timestamp" });
  }

  renderPosts() {
    let postsSorted = _.values(this.props.posts);
    postsSorted.sort(sortBy(`-${this.state.sort}`));

    return _.map(postsSorted, post => {
      const {
        id,
        title,
        body,
        author,
        timestamp,
        category,
        voteScore,
        commentCount
      } = post;

      return (
        <div key={id} className="section">
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
            commentsNo={commentCount}
          />
        </div>
      );
    });
  }

  render() {
    let btnClassNameForVote = "";
    let btnClassNameForTime = "";

    if (this.state.sort === "voteScore") {
      btnClassNameForVote = `btn btn-primary sortBtn active`;
      btnClassNameForTime = `btn btn-primary sortBtn`;
    } else {
      btnClassNameForVote = `btn btn-primary sortBtn`;
      btnClassNameForTime = `btn btn-primary sortBtn active`;
    }

    return (
      <div>
        <div className="row">
          <div className="pull-xs-left">
            <span>Sort By:</span>
            <button
              className={btnClassNameForVote}
              onClick={this.onSortByVote.bind(this)}
            >
              VoteScore
            </button>
            <button
              className={btnClassNameForTime}
              onClick={this.onSortByTime.bind(this)}
            >
              Time
            </button>
          </div>
          <div className="pull-xs-right">
            <Link className="btn btn-primary" to="/posts">
              Add a Post
            </Link>
          </div>
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

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    commentsNo: _.values(comments).length
  };
}

export default connect(mapStateToProps, { fetchPosts, deleteComment })(
  PostsIndex
);
