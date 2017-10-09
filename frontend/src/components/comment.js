import React from 'react';
import moment from 'moment';

const Comment = (props) => {
    const { author, body, timestamp, voteScore } = props;

    return (
        <div className="row comment">
            <div className="col-md-1"></div>
            <div className="col-md-9">
                <div>
                    <div>
                        <strong>{author}</strong> <span className="text-muted">{moment(timestamp).format('LLLL')}</span>
                        <span>VoteScore: {voteScore}</span>
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

export default Comment;