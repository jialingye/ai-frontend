import React, {useState} from 'react';
import { Col, Container , Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const NewProject = () => {
    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [tagState, setTagState] = useState([]);
    const [taskState, setTaskState] = useState([]);

    //status handler
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const newProject = {
            title: titleState,
            description: descriptionState,
            tags: tagState,
            taskState: taskState,
        }
        try{
            const options = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProject),
            };

            const responseData = await fetch(
                "http://localhost:4002/listing", options
                )
            const newProjectObj = await responseData.json();
        } catch(error){
            console.log(error)
        }
    }
  return (
    <Container >
    <Row>
    <Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Title</Form.Label>
          <Form.Control 
            type="text" 
            value ={titleState} 
            placeholder="Project Title" 
            onChange={(e) => onChangeHandler(e, setTitleState)}
            required
            style ={{marginTop:'70px'}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <InputGroup>
                <InputGroup.Text>Ask</InputGroup.Text>
                <Form.Control 
                    as="textarea" 
                    aria-label="Ask AI"
                    value ={descriptionState} 
                    onChange={(e) => onChangeHandler(e, setDescriptionState)}
                    required 
                />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Tags</Form.Label>
          <Form.Control 
          type="text"
          min = "1"
          value ={tagState}
          onChange={(e) => onChangeHandler(e, setTagState)}
          required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create A Project
        </Button>
      </Form>
      </Col>
      <Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ask ChatGPT</Form.Label>
          <InputGroup>
                <InputGroup.Text>Ask</InputGroup.Text>
                <Form.Control 
                    as="textarea" 
                    aria-label="Ask AI"
                    value ={descriptionState} 
                    onChange={(e) => onChangeHandler(e, setDescriptionState)}
                    required 
                />
            </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create A Project
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  )
}

export default NewProject