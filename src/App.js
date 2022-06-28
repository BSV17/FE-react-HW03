import React from "react";
import "./App.css"
import PostForm from "./components/PostForm/PostForm";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => this.setState({posts: data}))
    }

    handleDeletePost(id) {
        let updatedPostsList = this.state.posts.filter((post) => post.id !== id);
        this.setState({posts: updatedPostsList})
    }

    handleAdd = (event, title, textContent, id) => {
        event.preventDefault();

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: textContent,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                let newData = this.state.posts
                newData.unshift(json);
                this.setState({posts: newData})
            });
    };

    handleEdit = (event, title, textContent, id) => {
        event.preventDefault();

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                body: textContent,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                let updatedPosts =  this.state.posts.map(item => item.id === id ? json : item);

                this.setState({posts: updatedPosts})
            });
    };

    render() {
        return (
            <>
                <PostForm handleSubmit={this.handleAdd}/>
                <ul className="list">
                    {this.state.posts.map((item) =>
                        <li key={item.id} className="list-item">
                            <h2>{item.id}. {item.title}</h2>
                            <p>{item.body}</p>
                            <button className="list-item-button"
                                    onClick={() => this.handleDeletePost(item.id)}>Delete
                            </button>
                            <PostForm handleSubmit={this.handleEdit} item={item}/>
                        </li>)}
                </ul>
            </>
        )
    }
}

export default App;
