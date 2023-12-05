import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {LinkContainer} from "react-router-bootstrap";

function DonateStatus() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/*<Button variant="primary" onClick={handleShow}>*/}
            {/*  Launch static backdrop modal*/}
            {/*</Button>*/}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <Modal.Title className="mb-1">Donation Success!</Modal.Title>
                    Thank you for your support.
                </Modal.Body>
                <Modal.Footer>
                    <LinkContainer to={`/explore/animals/`}>
                        <Button variant="primary px-5 py-2">Back to Animals</Button>
                    </LinkContainer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DonateStatus;