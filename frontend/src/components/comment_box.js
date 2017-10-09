import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchComments, createComment } from '../actions';
import moment from 'moment';
import uuidv1 from 'uuid/v1';

class CommentBox extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger':'' }`;

        return (
            <div className={className} >
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        values["id"] = uuidv1(); 
        values["timestamp"] = moment().format();
        values["parentId"] = this.props.post_id;

        this.props.createComment(values, () => {
            this.props.fetchComments(this.props.post_id);
        });
    }
    
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Author"
                    name="author"
                    component={this.renderField}
                />
                <Field
                    label="Comment Content"
                    name="body"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Comment</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.author) {
        errors.author = "Enter your name";
    }
    if (!values.body) {
        errors.body = 'Enter some content please';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'CommentsNewForm'
})(
    connect(null, { fetchComments, createComment })(CommentBox)
);