import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { upVoteComment, downVoteComment, fetchComments } from '../actions';

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

    render() {
        const { id, author, body, timestamp, voteScore } = this.props;

        return (
            <div className="row comment">
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

export default connect(null, {upVoteComment, downVoteComment, fetchComments})(Comment);