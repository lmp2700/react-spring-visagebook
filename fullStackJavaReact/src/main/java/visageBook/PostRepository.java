package visageBook;

import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {
    Iterable<Post> findAllByUser(User user);
}
