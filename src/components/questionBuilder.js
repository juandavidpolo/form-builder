import React, {useState, useEffect} from "react";

import {
    Button,
    Input,
    Label
} from 'reactstrap';

/**
 * A React component that renders a question builder for creating and managing form questions.
 *
 * @component
 * @param {Object} props - The props for the QuestionBuilder component.
 * @param {Array} props.questions_arr - An array of existing questions to initialize the question builder.
 * @param {Function} props.addQuestion - A function to add a new question. It accepts an object representing the question.
 * @returns {React.ReactNode} A React element that renders the question builder interface.
 */
const QuestionBuilder = ({questions_arr, addQuestion}) => {

    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        type:{
            value:"text",
            name:"type",
            label:"Question Type",
            type:"select",
            options:[
                {value:"text", label:"Short Text"},
                {value:"textarea", label:"Long Text"},
                {value:"select", label:"Select"},
                {value:"radio", label:"Radio Buttons"},
                {value:"checkbox", label:"Checkbox"},
            ]
        },
        label:{
            value:"",
            name:"label",
            type:"text",
            placeholder:"Question Label",
            label:"label"
        },
        placeholder:{
            value:"",
            name:"placeholder",
            type:"text",
            placeholder:"Question placeholder",
            label:"placeholder"
        },
        isRequired:{
            value: true,
            name:"isRequired",
            type:"checkbox",
            label:"isRequired"
        },
        options:[
            {label:"Option 1"},
            {label:"Option 2"}
        ]
    });

    useEffect(() => {
        setQuestions(questions_arr);
    },[questions_arr])

    const onChangeValue = (ev, isOptions=false) => {
        const {name, value} = ev.target;
        if(isOptions){
            let nameParts = name.split("-");
            const object_name = nameParts[0];
            const index = parseInt(nameParts[1]);
            setNewQuestion(prevNewQuestion => {
                const updatedArray = [...prevNewQuestion[object_name]];
                updatedArray[index] = {
                    ...updatedArray[index],
                    label: value,
                };
                return {
                    ...prevNewQuestion,
                    [object_name]: updatedArray,
                };
            });
        }else{
            setNewQuestion(prevNewQuestion => ({
                ...prevNewQuestion,
                [name]:{
                    ...prevNewQuestion[name],
                    value:value
                }
            }))
        }
    }

    const addNewQuestion = (question) => {
        const newQuestion = {}
        const keys = Object.keys(question)
        keys.forEach(key => {
            if(question[key].value !== undefined){
                newQuestion[key] = question[key].value
            }else if(question[key].options !== undefined){
                newQuestion[key] = question[key].options
            }
        });
        addQuestion(newQuestion)
    }

    const renderField = (questionAttributes) => {
        const constructor = Object.entries(questionAttributes).map(([name, attributeValues], i) => {
            const regex = /text/;
            if (name === "options"){
                const options = attributeValues.map((option, j) => (
                    <div key={j}>
                        <Input
                            className="custom--form"
                            type="text"
                            name={`${name}-${j}`}
                            value={option.label}
                            onChange={ev => onChangeValue(ev, true)}/>
                        <Button>Delete</Button>
                    </div>
                ))
                if(!regex.test(questionAttributes.type.value)){
                    return(
                        <div className="answer--options" key={i}>
                            <h4>Answer Options</h4>
                            {options}
                        </div>
                    )
                }
            }else{
                if(attributeValues.type === "select"){
                    return(
                        <div key={i}>
                            <Label className="custom--label">
                                {attributeValues.label}
                            </Label>
                            <Input
                                className="custom--form"
                                type={attributeValues.type}
                                name={attributeValues.name}
                                value={attributeValues.value}
                                onChange={ev => onChangeValue(ev)}>
                                {attributeValues.options.map((option, j) => {
                                    return(
                                        <option key={j}
                                            value={option.value}>
                                            {option.label}
                                        </option>
                                    )
                                })}
                            </Input>
                        </div>
                    )
                }else if(attributeValues.type === "checkbox"){
                    return(
                        <div key={i}>
                            <Label className="custom--label">
                                {attributeValues.label}
                            </Label>
                            <Input
                                type={attributeValues.type}
                                name={attributeValues.name}
                                value={attributeValues.value}
                                onChange={ev => onChangeValue(ev)}/>
                        </div>
                    )
                }else{
                    return(
                        <div key={i}>
                            <Label className="custom--label">
                                {attributeValues.label}
                            </Label>
                            <Input
                                className="custom--form"
                                type={attributeValues.type}
                                name={attributeValues.name}
                                value={attributeValues.value}
                                onChange={ev => onChangeValue(ev)}/>
                        </div>
                    )
                }
            }
        })
        return constructor
    };

    return(
        <div className="builder--constructor">
            <div className="builder--section">
                <Button onClick={() => addNewQuestion(newQuestion)}>Add Question</Button>
            </div>
            <div className="form--builder--constructor">
                {renderField(newQuestion)}
            </div>
            <div className="form--list">
                {questions && questions.length > 0 && questions.map((question, index)=>{
                    return(
                        <div className="form--question" key={index}>
                            <Label><b>{`${index+1}. `}</b>{question.label} {question.isRequired?<b>*</b>:null}</Label>
                            <Input
                                className="custom--form"
                                placeholder={question.placeholder}
                            />
                        </div>
                )})}
            </div>
        </div>
    )
}

export default QuestionBuilder;