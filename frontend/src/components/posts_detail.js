import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPost,
  deletePost,
  fetchComments,
  deleteComment
} from "../actions";
import Post from "./post";
import Comment from "./comment";
import CommentBox from "./comment_box";
import _ from "lodash";
import sortBy from "sort-by";
import NotFound from "../components/NotFound";

class PostsDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    this.props.fetchComments(id);
  }

  renderComments(category) {
    let commentsSorted = _.values(this.props.comments);
    commentsSorted.sort(sortBy("-voteScore"));

    return _.map(commentsSorted, comment => {
      const { id, timestamp, author, body, voteScore, parentId } = comment;

      return (
        <div key={id}>
          <Comment
            id={id}
            timestamp={timestamp}
            author={author}
            body={body}
            voteScore={voteScore}
            post_id={parentId}
            category={category}
          />
        </div>
      );
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <NotFound />;
    }

    const { id, title, body, author, timestamp, category, voteScore } = post;

    return (
      <div className="container">
        <div className="row">
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-1" />
        <div className="col-md-10">
          <Post
            id={id}
            title={title}
            body={body}
            author={author}
            timestamp={timestamp}
            category={category}
            voteScore={voteScore}
            isDetail={true}
            commentsNo={_.size(this.props.comments)}
          />
          <div>
            <CommentBox post_id={id} history={this.props.history} />
          </div>
          <div>{this.renderComments(category)}</div>
        </div>
        <div className="col-md-1" />
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    comments
  };
}

export default connect(mapStateToProps, {
  fetchPost,
  deletePost,
  fetchComments,
  deleteComment
})(PostsDetail);
