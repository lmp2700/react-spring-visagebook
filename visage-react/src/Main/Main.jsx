import React, {Component} from 'react';
import NewPost from './NewPost/NewPost';
import PostsList from './PostsList/PostsList';

class Main extends Component{
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }
    getPosts = async () => {
        const posts = await fetch("http://localhost:8080/posts", {
            credentials: 'include'
        })
        const postResponse = await posts.json();
        console.log(postResponse);
        return postResponse;
    }
    componentDidMount(){
        this.getPosts().then((posts)=>{
            this.setState({
                posts: posts
            })
        })
    }
    editPost = async (id, text) => {
        console.log("EDITING PPOST " + id + "TO HAVE NEW TEXT " + text);
        const response = await fetch('http://localhost:8080/posts/' + id, {
            method: "PUT",
            credentials: 'include',
            body: JSON.stringify({"text": text}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        this.setState({
            posts: this.state.posts.map((post)=>{
                if(post.id === id){
                    return parsedResponse
                }else{
                    return post
                }
            })
        })
    }
    createPost = async (formData) =>{
        const response = await fetch('http://localhost:8080/posts', {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await response.json();
        this.setState({
            posts: [...this.state.posts, parsedResponse]
        })
    }
    render(){
        return(
            <div>
                <PostsList editPost={this.editPost} posts={this.state.posts}/>
                <NewPost createPost={this.createPost} />
            </div>
        )
    }
}

export default Main;