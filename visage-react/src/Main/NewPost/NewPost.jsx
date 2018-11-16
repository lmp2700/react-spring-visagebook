import React, {Component} from 'react'

export default class NewPost extends Component{
    constructor(){
        super()
        this.state = {
            text: ""
        }
    }
    createPost = (e) => {
        e.preventDefault();
        document.getElementById("newPostForm").reset()
        this.props.createPost(this.state);
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        })
    }
    render(){
        return(
            <form onSubmit={this.createPost} id="newPostForm">
                text: <input type="text" name="text" onChange={this.handleChange}/>
                <input type="submit"/>
            </form>
        )
    }
}