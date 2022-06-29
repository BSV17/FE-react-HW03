import React from "react";
import './Postform.css';

class PostForm extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            textContent: "",
            isValid: false,
            errors: {
                title: false,
                textContent: false
            }
        }
    }

    componentDidMount() {
        if (this.props.item) {
            this.setState({title: this.props.item.title, textContent: this.props.item.body});
        }
    }

    validateData = (e) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,7}$/;
        if (regex.test(e.target.value) || e.target.value === "") {
            this.setState({errors: {...this.state.errors, [e.target.name]: false}});
            return true;
        } else {
            this.setState({errors: {...this.state.errors, [e.target.name]: true}});
        }
        return false;
    }


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if (this.validateData(event)) {
            this.setState({isValid: true});
        } else {
            this.setState({isValid: false});
        }
    }

    handlePost = (event) => {
        event.preventDefault();
        this.props.handleSubmit(event, this.state.title, this.state.textContent, this.props.item?.id);
        this.setState({title: "", textContent: ""});
    }


    render() {
        return (
            <form className="post-form" onSubmit={(event) => this.handlePost(event)}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter post title..."
                    value={this.state.title}
                    onChange={this.handleChange}
                    className={this.state.errors.title ? "error" : ""}
                />
                <textarea
                    type="text"
                    name="textContent"
                    placeholder="Enter post content..."
                    value={this.state.textContent}
                    onChange={this.handleChange}
                    className={this.state.errors.textContent ? "error" : ""}
                />
                <button type="submit" className="submit-button"
                        disabled={!this.state.isValid}>
                    {this.props.item ? "Edit" : "Add"}
                </button>
            </form>
        )
    }
}

export default PostForm;
