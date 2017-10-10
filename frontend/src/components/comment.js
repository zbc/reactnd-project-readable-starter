import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { upVoteComment, downVoteComment, fetchComments, deleteComment } from '../actions';
import { Link } from 'react-router-dom';

class Comment extends Component {
    onUpVoteComment(id) {
        this.props.upVoteComment(id, () => {
            this.props.fetchComments(this.props.post_id);
        });
    }

    onDownVoteComment(id) {
        this.props.downVoteComment(id, () => {
            this.props.fetchComments(this.props.post_id);
        });
    }

    onDeleteCommentClick(id) {
        this.props.deleteComment(id, () => {
            
        });
    }

    render() {
        const { id, author, body, timestamp, voteScore, post_id, category } = this.props;

        return (

            <div className="row comment">
                   <button 
                        onClick={this.onDeleteCommentClick.bind(this, id)}
                        className="btn btn-danger marginBtn pull-md-right">
                        Delete Comment 
                    </button>
                    <Link
                        to={`/${category}/${post_id}/comments/${id}/edit`}
                        className="btn btn-primary marginBtn pull-md-right">
                        Edit Post 
                    </Link>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div>
                        <div>
                            <strong>{author}</strong> | <span className="text-muted">{moment(timestamp).format('LLLL')}</span> |
                                <span>VoteScore: {voteScore}</span>
                            <button className="btn btn-default voteBtn" onClick={this.onUpVoteComment.bind(this, id)} >
                                ↑
                                </button>
                            <button className="btn btn-default voteBtn" onClick={this.onDownVoteComment.bind(this, id)} >
                                ↓
                                </button>
                        </div>
                        <div>
                            {body}
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

export default connect(null, {upVoteComment, downVoteComment, fetchComments, deleteComment})(Comment);