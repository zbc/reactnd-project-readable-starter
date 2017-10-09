import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import moment from 'moment';
import uuidv1 from 'uuid/v1';

class PostsNew extends Component {
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

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }
    
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />

                <Field
                    label="Author"
                    name="author"
                    component={this.renderField}
                />
                <Field
                    label="Category"
                    name="category"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="body"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.author) {
        errors.author = "Enter your name";
    }
    if (!values.category) {
        errors.category = 'Enter some categories';
    }
    if (!values.body) {
        errors.body = 'Enter some content please';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);