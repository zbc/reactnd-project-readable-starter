import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import moment from 'moment';

class PostsDetail extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }
    
    onDeleteClick() {
        const {id} = this.props.match.params;
        
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });

    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/" className="btn btn-primary">Back</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h5>By {post.author} | {moment(post.timestamp).format('LLLL')}</h5>
                <h6>Category: <i className="label label-info">{post.category}</i></h6>
                <p>{post.body}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] }; 
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsDetail);