// MailFormModal.js
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const MailFormModal = ({ isOpen, closeModal, teacherEmail, email, token }) => {
    // const [email, setEmail] = useState('');

    const [subject, setSubject] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [body, setBody] = useState('');

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleAttachmentChange = (e) => {
        // Assuming a single file attachment
        const file = e.target.files[0];
        setAttachment(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add logic to handle form submission (e.g., send email)
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
        console.log(`Attachment:`, attachment);
        // https://api.rmutsv.ac.th/mcas/mail/sittichok.a:olE9MCH1B5QsWZEY81KJfoR851KSurY6W6akH9TkjZBioZGbvxO8ru00t7BVukKm
        const apiEndpoint = `${import.meta.env.VITE_API_URL}/mcas/mail/${token}`;
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: subject,
                body: body,
            }),
        });
        const data = await response.json();
        if (data.status === 'ok') {
            console.log('Email sent successfully');
            Swal.fire({
                title: 'Email sent successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
            })

            setBody('');
            setSubject('');
        } else {
            console.log('Failed to send email');
            Swal.fire({
                title: 'Failed to send email',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }




        // Additional logic to handle file upload (you may want to use FormData here)

        // Close modal
        closeModal();
    };

    return (
        <Modal show={isOpen} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Mail Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter recipient's email"
                            value={email}
                            onChange={handleEmailChange}
                        // readOnly
                        />
                    </Form.Group>
                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the email subject"
                            value={subject}
                            onChange={handleSubjectChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='formBody'>
                        <Form.Label>Body:</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={5}
                            placeholder='Enter the email body'
                            required
                            value={body}
                            onChange={handleBodyChange}
                        />
                    </Form.Group>
                    {/* <Form.Group controlId="formAttachment">
                        <Form.Label>Attachment:</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleAttachmentChange}
                        />
                    </Form.Group> */}
                    <Button variant="primary" type="submit" className='mt-2'>
                        Send Email <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default MailFormModal;
