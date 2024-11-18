import React, {useState} from "react";

import {
    Button,
    Input
} from 'reactstrap';

import QuestionBuilder from "src/components/questionBuilder";

/**
 * This component renders a form builder.
 *
 * @returns {ReactNode} A React element that renders a form builder to the user.
 */
const Builder = () => {

    const [form, setForm] = useState({
        title:{
            value:"Untitle form",
            placeholder:"Form title",
            name:"title"
        },
        description:{
            value:"",
            placeholder:"Form description",
            name:"description"
        },
        questions:[]
    });

    const onChangeValue = (ev) => {
        const {name, value} = ev.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: {
                ...prevForm[name],
                value: value
            }
        }));
    }

    const addQuestion = (newQuestion) => {
        setForm(prevForm => {
            const currentArray = [...prevForm.questions]
            currentArray.push(newQuestion)
            return {
                ...prevForm,
                ['questions']: currentArray
            }
        });
    };

    return(
        <div className="builder--container" fluid>
            <div>
                <Button>Save</Button>
            </div>
            <div className="builder--header">
                <Input
                    type="text"
                    className="custom--form"
                    name={form.title.name}
                    value={form.title.value}
                    placeholder={form.title.placeholder}
                    onChange={ev => onChangeValue(ev)}
                />
                <Input
                    type="textarea"
                    className="custom--form"
                    name={form.description.name}
                    value={form.description.value}
                    placeholder={form.description.placeholder}
                    onChange={ev => onChangeValue(ev)}
                />
            </div>
            <QuestionBuilder
                questions_arr={form.questions}
                addQuestion={addQuestion}
            />
        </div>
    )
}

export default Builder