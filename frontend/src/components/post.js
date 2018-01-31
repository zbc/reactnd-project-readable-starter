import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import {
  upVote,
  downVote,
  fetchPosts,
  deletePost,
  fetchComments,
  fetchPost
} from "../actions";
import _ from "lodash";

class Post extends Component {
  componentWillMount() {
    // console.log(this.props.id);
    this.props.fetchComments(this.props.id);
  }

  componentDidMount() {
    // console.log(this.props.comments);
  }

  onUpVote(id) {
    this.props.upVote(id, () => {
      this.props.fetchPosts();
    });
  }

  onDownVote(id) {
    this.props.downVote(id, () => {
      this.props.fetchPosts();
    });
  }

  onDeletePost(id) {
    this.props.deletePost(id, () => {
      this.props.fetchPosts();
    });
  }

  render() {
    const {
      id,
      title,
      body,
      author,
      timestamp,
      category,
      voteScore,
      isDetail,
      commentsNo
    } = this.props;
    return (
      <div className="text-left">
        <div className="row">
          <button
            onClick={this.onDeletePost.bind(this, id)}
            className="btn btn-danger marginBtn pull-md-right"
          >
            Delete Post
          </button>
          <Link
            to={`/${category}/${id}/edit`}
            className="btn btn-primary marginBtn pull-md-right"
          >
            Edit Post
          </Link>
          <h4>
            <strong>
              {isDetail ? (
                title
              ) : (
                <Link to={`/${category}/${id}`}>{title}</Link>
              )}
            </strong>
          </h4>
        </div>
        <div className="row">
          <p>{body}</p>
        </div>
        <div className="row">
          <p>
            <i className="icon-user">by {author} </i>
            |{" "}
            <i className="icon-calendar">{moment(timestamp).format("LLLL")} </i>
            | <i className="icon-share"> VoteScore: {voteScore} </i>
            <button
              className="btn btn-primary voteBtn"
              onClick={this.onUpVote.bind(this, id)}
            >
              ↑
            </button>
            <button
              className="btn btn-primary voteBtn"
              onClick={this.onDownVote.bind(this, id)}
            >
              ↓
            </button>
            |{" "}
            <i className="icon-tags">
              Category : <span className="label label-info">{category}</span>
            </i>
            |{" "}
            {commentsNo === 0 ? (
              <i className="icon-comment">{commentsNo} Comment</i>
            ) : (
              <i className="icon-comment">{commentsNo} Comments</i>
            )}
          </p>
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => {
  // console.log(comments);
  return {
    comments: comments
  };
};

export default connect(mapStateToProps, {
  upVote,
  downVote,
  fetchPosts,
  deletePost,
  fetchComments,
  fetchPost
})(Post);
