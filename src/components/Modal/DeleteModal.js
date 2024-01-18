import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, setShow, handleDelete }) => {
  return (
    <Modal show={show} onHide={()=>setShow(!show)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete movie?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShow(!show)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => { handleDelete(); setShow(false) }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
