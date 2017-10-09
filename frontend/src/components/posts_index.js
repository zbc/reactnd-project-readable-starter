import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import Posts from './posts';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            const { id, title, body, author, timestamp, category, voteScore } = post;

            return (
                <Posts 
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