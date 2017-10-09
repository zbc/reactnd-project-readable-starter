import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { upVote, downVote, fetchPosts } from '../actions';

class Post extends Component {

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
    
    render() {
        const { id, title, body, author, timestamp, category, voteScore, isDetail, comments } = this.props;
        return (
            <div className="text-left" >
                <div className="row">
                    <h4>
                        <strong>
                            {isDetail
                                ? title
                                : <Link to={`/posts/${id}`}>
                                    {title}
                                </Link>
                            }

                        </strong>
                    </h4>
                </div>
                <div className="row">
                    <p>
                        {body}
                    </p>
                </div>
                <div className="row">
                    <p>
                        <i className="icon-user">by {author} </i>
                        | <i className="icon-calendar">{moment(timestamp).format('LLLL')} </i>
                        | <i className="icon-share"> VoteScore: {voteScore} </i>
                        <button className="btn btn-default voteBtn" onClick={this.onUpVote.bind(this, id)} >
                          ↑ 
                        </button>
                        <button className="btn btn-default voteBtn" onClick={this.onDownVote.bind(this, id)} >
                          ↓
                        </button>
                    | <i className="icon-tags">Category : <span className="label label-info">{category}</span></i>
                        | {comments ? (<i className="icon-comment">{comments} Comments</i>) : <span></span>}
                    </p>
                </div>
                <hr />
            </div>
        );
    }
}
export default connect(null, { upVote, downVote, fetchPosts })(Post);