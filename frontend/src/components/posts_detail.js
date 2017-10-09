import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import Posts from './posts';

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
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <Posts 
                        id={id} 
                        title={title} 
                        body={body} 
                        author={author} 
                        timestamp={timestamp} 
                        category={category} 
                        voteScore={voteScore} 
                        isDetail={true}
                    />
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] }; 
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsDetail);