import React from 'react';
import EditPost from './EditPost/EditPost';

const PostsList = (props) =>{
    const posts = props.posts.map((post)=>{
        return(
            <div key={post.id}>
                <p>{post.user.username} says {post.text}</p>
                <EditPost post={post} editPost={props.editPost} />
            </div>
        )
    })
    return(
        <div>
            {posts}
        </div>
    )
}

export default PostsList;