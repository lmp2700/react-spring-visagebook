
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      text: props.post.text
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChange = (e) => {
    this.setState({
        [e.currentTarget.name] : e.currentTarget.value
    })
    }
  editPost = (e) => {
      e.preventDefault();
      this.props.editPost(this.props.post.id, this.state.text)
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Edit this post</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <form onSubmit={this.editPost}>
          <ModalBody>
            
            text: <input type="text" placeholder={this.props.post.text} name="text" onChange={this.handleChange}/>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} type="submit">Edit</Button>{' '}
            
            <Button color="secondary" onClick={this.toggle}>Nevermind</Button>
          </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default EditPost;