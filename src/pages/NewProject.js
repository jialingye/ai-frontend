import React, {useState} from 'react';
import { Col, Container , Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const NewProject = () => {
    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [newTag, setNewTag] = useState("");
    const [tagState, setTagState] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskState, setTaskState] = useState([]);
    const [questionState, setQuestionState] = useState("");
    const [answerState, setAnswerState] = useState("");

    //status handler
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    }
    const handleTagSubmit = (event) => {
        event.preventDefault();

        const newData = newTag;

        setTagState((prevState => [...prevState, newData]));
        //console.log(tagState)
        
        setNewTag('')
    }
    const onChangeTaskHandler = (e, index) => {
        const newTasks = [...taskState];
        newTasks[index] = e.target.value;
        setTaskState(newTasks)
    }
    const handleTaskAdd = (event) => {
        event.preventDefault();

        const newData = newTask;

        setTaskState((prevState => [...prevState, newData]));
        
        setNewTask('')
    }
    const handleTaskAI = (event) => {
        event.preventDefault();
        const tasks = answerState.split('\n\n')
        tasks.map(task => setTaskState((prevState => [...prevState, task.trim()])))
    }
    const handleRemoveTag = (event, index, setValue) => {
        event.preventDefault();

        setValue((prevTags) => prevTags.filter((_, i)=> i !== index))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const newProject = {
            title: titleState,
            description: descriptionState,
            tags: tagState,
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
                "http://localhost:4002/project", options
                )
            const newProjectObj = await responseData.json();

        } catch(error){
            console.log(error)
        }
    }

    const handleTaskSubmit = async (projectId) => {
        const newTask = {
            projectId: projectId,
            tasks: taskState
        }
        try{
            const options = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            };

            const responseData = await fetch(
                "http://localhost:4002/task", options
                )
            const taskData= await responseData.json();
            console.log(taskData)
        }catch(error){
            console.log(error);
        }
    }

    const handleAISubmit = async(event) => {
        event.preventDefault();
        const newQuestion = {
            instruction: questionState,
        }
        try{
            const options = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newQuestion),
            };

            const responseData = await fetch(
                "http://localhost:4002/ai", options
                )
            const newAnswerObj = await responseData.json();
            setAnswerState(newAnswerObj)
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
                <Form.Control 
                    as="textarea" 
                    aria-label="Ask AI"
                    value ={descriptionState} 
                    onChange={(e) => onChangeHandler(e, setDescriptionState)}
                    required 
                />
            </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox" >
          <Form.Label>Tags</Form.Label>
          <span style={{display:'flex'}}>
          <Form.Control 
          type="text"
          min = "1"
          value ={newTag}
          onChange={(e) => onChangeHandler(e, setNewTag)}
          />
        <Button variant="primary" type="button" onClick={handleTagSubmit} >
          Add
        </Button>
          </span>
       
        {tagState && tagState.map((tag, index)=>(
                <span key={index} >
                    {tag}
                    <Button 
                    type="button"
                    className="btn-close"
                    aria-label='remove'
                    onClick={(event)=> handleRemoveTag(event,index,setTagState)}>
                    </Button>
                </span>
                ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Project
        </Button>
        
      </Form>
      </Col>
      <Col>
      <Form onSubmit={handleAISubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Ask ChatGPT</Form.Label>
          <InputGroup>
                <InputGroup.Text>Ask</InputGroup.Text>
                <Form.Control 
                    as="textarea" 
                    aria-label="Ask AI"
                    value ={questionState} 
                    onChange={(e) => onChangeHandler(e, setQuestionState)}
                    required
                />
            </InputGroup>
            {answerState && <div>

                <p style={{whiteSpace: 'pre-line', textAlign:'left'}}>{answerState}</p>
                <Button type = "submit" variant="secondary" onClick = {handleTaskAI}>Create Tasks</Button>
            </div>
            }
            
        </Form.Group>
        <Button variant="primary" type="submit">
          Give Suggestion
        </Button>
      </Form>
      <Form onSubmit={handleTaskSubmit}>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Tasks</Form.Label>
          <span style={{display:'flex'}}>
          <Form.Control 
          type="text"
          min = "1"
          value ={newTask}
          onChange={(e) => onChangeHandler(e, setNewTask)}
          required/>
             <Button variant="primary" type="button" onClick = {handleTaskAdd}>
          Add
        </Button>
        </span>
        {taskState && taskState.map((task, index)=>(
            <div style={{display:'flex', flexDirection:'column', textAlign:'left'}}>
          <span key={index} style={{display:'flex', marginTop:'10px'}} >
                    <Form.Check aria-label="option 1" />
                    <Form.Control 
                        type="text"
                        min = "1"
                        value ={task}
                        onChange={(e) => onChangeTaskHandler(e, index)}
                        />
                    <Button 
                    type="button"
                    className="btn-close"
                    aria-label='remove'
                    onClick={(event)=> handleRemoveTag(event,index, setTaskState)}>
                    </Button>
                </span>
            </div>
                ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Tasks
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  )
}

export default NewProject