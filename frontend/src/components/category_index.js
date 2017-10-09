import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { fetchCategories } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class CategoryIndex extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    renderCategories() {
        return _.map(this.props.categories, category => {
            return (
                <li key={category.name} className="nav-item">
                    <Link to={`/${category.path}/posts`} className="nav-link">
                        {category.name}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
                <div>
                    <ul className="nav nav-pills justify-content-center">
                        {this.renderCategories()}
                    </ul>
                </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}

export default connect(mapStateToProps, { fetchCategories })(CategoryIndex);