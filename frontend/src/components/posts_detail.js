import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost, fetchComments, deleteComment } from '../actions';
import Post from './post';
import Comment from './comment';
import CommentBox from './comment_box';
import _ from 'lodash';

class PostsDetail extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
        this.props.fetchComments(id);
    }
    
    onDeleteClick() {
        const {id} = this.props.match.params;
        
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    onDeleteCommentClick(id) {
        this.props.deleteComment(id, () => {
            
        });
    }

    renderComments() {
        return _.map(this.props.comments, comment => {
            const {id, timestamp, author, body, voteScore, parentId } = comment;

            return (
                <div key={id}>
                    <div className="row">
                        <button
                            className="btn btn-danger pull-xs-right"
                            onClick={this.onDeleteCommentClick.bind(this, id)}
                        >
                            Delete Comment 
                        </button>
                    </div>
                    <Comment
                        id={id}
                        timestamp={timestamp}
                        author={author}
                        body={body}
                        voteScore={voteScore}
                        post_id={parentId}
                    />
                </div>
            ); 
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        const { id, title, body, author, timestamp, category, voteScore } = post;

        return (
            <div className="container">
                <div className="row">
                    <Link to="/" className="btn btn-primary">Back</Link>
                    <button
                        className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete Post
                </button>
                </div>
                <div className="col-md-1"></div>
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
                        comments={_.size(this.props.comments)}
                    />
                    <div>
                        <CommentBox post_id={id} history={this.props.history}/>                        
                    </div>
                    <div>
                        { this.renderComments() }
                    </div> 
                </div>
                <div className="col-md-1"></div>
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

export default connect(mapStateToProps, { fetchPost, deletePost, fetchComments, deleteComment })(PostsDetail);