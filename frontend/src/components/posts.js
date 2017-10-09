import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Posts = (props) => {
    const { id, title, body, author, timestamp, category, voteScore, isDetail} = props;

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
                    | <i className="icon-tags">Categories : <span className="label label-info">{category}</span></i>
                    | <i className="icon-comment">3 Comments</i>
                </p>
            </div>
            <hr />
        </div>
    );
}

export default Posts;