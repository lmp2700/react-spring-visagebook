package visageBook;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users/{userId}/posts")
    public Iterable<Post> getPostsByUser(@PathVariable Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.get();
        return postRepository.findAllByUser(user);
    }

    @GetMapping("/posts")
    public Iterable<Post> getPosts(){
        return postRepository.findAll();
    }

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post, HttpSession session) throws Exception {
        if(session.getAttribute("username") == null){
            throw new Exception("you must be logged in to post");
        }
        String currentUsername = session.getAttribute("username").toString();
        User author = userRepository.findByUsername(currentUsername);
        post.setUser(author);
        return postRepository.save(post);
    }

    @GetMapping("/posts/{id}")
    public Post getPost(@PathVariable Long id) throws Exception {
        Optional<Post> postOptional =  postRepository.findById(id);
        if(postOptional.isPresent()){
            Post post = postOptional.get();
            return post;
        }else{
            throw new Exception("no such post");
        }
    }

    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable Long id){
        postRepository.deleteById(id);
        return "Deleting post number " + id.toString();
    }

    @PutMapping("/posts/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post postBody){
        Optional<Post> postOptional =  postRepository.findById(id);
        Post post = postOptional.get();
        post.setText(postBody.getText());
        Post updatedPost = postRepository.save(post);
        return updatedPost;
    }
}
