import React, {useState, useEffect} from "react";
import {
    Button,
    Input,
    Label
} from 'reactstrap';

import { useSelector } from "react-redux";

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

    const initialData = useSelector((state) => state.generals);

    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState(initialData.questionForm);

    useEffect(() => {
        setQuestions(questions_arr);
    },[questions_arr])

    const onChangeValue = (ev, isOptions=false) => {
        const {name, value} = ev.target;
        if(isOptions){
            let nameParts = name.split("-");
            const object_name = nameParts[0];
            const index = parseInt(nameParts[1]);
            setNewQuestion(prevState => {
                const updatedArray = [...prevState[object_name]];
                updatedArray[index] = {
                    ...updatedArray[index],
                    label: value,
                };
                return {
                    ...prevState,
                    [object_name]: updatedArray,
                };
            });
        }else{
            setNewQuestion(prevState => ({
                ...prevState,
                [name]:{
                    ...prevState[name],
                    value: name === "isRequired"? value === "true" ? false : true : value
                }
            }))
        }
    }

    const addNewQuestion = (question) => {
        const newQuestion = {}
        const keys = Object.keys(question)
        const regex = /text/
        keys.forEach(key => {
            if(question[key]?.value !== undefined){
                newQuestion[key] = question[key].value
            }else if(!regex.test(question.type.value) && key === "options" && Array.isArray(question[key])){
                newQuestion[key] = [...question[key]]
            }
        });
        addQuestion(newQuestion);
        setNewQuestion(initialData.questionForm);
    }

    const addOption = () => {
        const currentOptions = [...newQuestion.options]
        currentOptions.push({label:"New Option"})
        setNewQuestion((prevState) => ({
            ...prevState,
            options: currentOptions,
        }));
    }

    const deleteOption = (indexToDelete) => {
        setNewQuestion((prevState) => ({
            ...prevState,
            options: prevState.options.filter((_, index) => index !== indexToDelete),
        }));
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
                        <Button
                            className="custom--button option--button"
                            onClick={() => {deleteOption(j)}}>
                                Delete
                        </Button>
                    </div>
                ))
                if(!regex.test(questionAttributes.type.value)){
                    return(
                        <div className="answer--options" key={i}>
                            <h4>Answer Options</h4>
                            {options}
                            <Button
                                className="custom--button"
                                onClick={() => {addOption()}}>
                                    New Option
                            </Button>
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
                                checked={attributeValues.value}
                                onChange={ev => onChangeValue(ev)}/>
                        </div>
                    )
                }else if(regex.test(questionAttributes.type.value) || name !== "placeholder"){
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
                <Button 
                    className="custom--button"
                    onClick={() => addNewQuestion(newQuestion)}>
                        Add Question
                </Button>
            </div>
            <div className="form--builder--constructor">
                {renderField(newQuestion)}
            </div>
            <div className="form--list">
                {questions && questions.length > 0 && questions.map((question, index)=>{
                    if(question.type === "select"){
                        return(
                            <div className="form--question" key={index}>
                                <Label>
                                    <b>{`${index+1}. `}</b>
                                    {question.label} {question.isRequired?<b className="require--field">*</b>:null}
                                </Label>
                                <Input
                                    className="custom--form"
                                    type={question.type}>
                                        {question.options && question.options.map((option, j)=>(
                                            <option key={j}>{option.label}</option>
                                        ))}
                                </Input>
                            </div>
                        )
                    }else if(question.type === "checkbox"){
                        return(
                            <div className="form--question" key={index}>
                                <Label>
                                    <b>{`${index+1}. `}</b>
                                    {question.label} {question.isRequired?<b className="require--field">*</b>:null}
                                </Label>
                                {question.options && question.options.map((option, j)=>(
                                    <div className="form--row">
                                        <Input
                                            key={j}
                                            name={`checkbox-${index}-${j}`}
                                            className="custom--form"
                                            type={question.type}/>
                                        <Label className="custom--label">{option.label}</Label>
                                    </div>
                                ))}
                            </div>
                        )
                    }else if(question.type === "radio"){
                        return(
                            <div className="form--question" key={index}>
                                <Label>
                                    <b>{`${index+1}. `}</b>
                                    {question.label} {question.isRequired?<b className="require--field">*</b>:null}
                                </Label>
                                {question.options && question.options.map((option, j)=>(
                                    <div className="form--row" key={j}>
                                        <Input
                                            key={j}
                                            name={`radio-${index}`}
                                            className="custom--form"
                                            type={question.type}/>
                                        <Label className="custom--label">{option.label}</Label>
                                    </div>
                                ))}
                            </div>
                        )
                    }else if(question.type === "textarea"){
                        return(
                            <div className="form--question" key={index}>
                                <Label>
                                    <b>{`${index+1}. `}</b>
                                    {question.label} {question.isRequired?<b className="require--field">*</b>:null}
                                </Label>
                                <Input
                                    className="custom--form"
                                    placeholder={question.placeholder}
                                    type={question.type}
                                    row={1}
                                    style={{ resize: "none" }}
                                />
                            </div>
                        )
                    }else{
                        return(
                            <div className="form--question" key={index}>
                                <Label>
                                    <b>{`${index+1}. `}</b>
                                    {question.label} {question.isRequired?<b className="require--field">*</b>:null}
                                </Label>
                                <Input
                                    className="custom--form"
                                    placeholder={question.placeholder}
                                    type={question.type}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default QuestionBuilder;