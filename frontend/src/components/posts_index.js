import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <div key={post.id} className="text-left" >
                    <div className="row">
                        <h4>
                            <strong>
                                <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </strong>
                        </h4>
                    </div>
                    <div className="row">
                        <p>
                            {post.body}
                        </p>
                    </div>
                    <div className="row">
                        <p>
                            <i className="icon-user">by {post.author} </i> 
                            | <i className="icon-calendar">{moment(post.timestamp).format('LLLL')} </i>  
                                | <i className="icon-share"> VoteScore: {post.voteScore} </i> 
                                | <i className="icon-tags">Categories : <span className="label label-info">{post.category}</span></i> 
                                | <i className="icon-comment">3 Comments</i> 
                        </p>
                    </div>
                    <hr/>
                </div>
               
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
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {this.renderPosts()}
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        posts
    }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);