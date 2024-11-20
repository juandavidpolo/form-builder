import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadedFirstTime:false,
  loading:false,
  notifications:[],
  form: [],
  questionForm:{
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
        label:"Label"
    },
    placeholder:{
        value:"",
        name:"placeholder",
        type:"text",
        placeholder:"Question placeholder",
        label:"Placeholder"
    },
    isRequired:{
        value: true,
        name:"isRequired",
        type:"checkbox",
        label:"Is required"
    },
    options:[
        {label:"Option 1"},
        {label:"Option 2"}
    ]
  }
};

const generalsSlice = createSlice({
  name: "generals",
  initialState: initialState,
  reducers: {
    notification: (state, action) => {
      state.notifications.push(action.payload)
    },
    addToForm: (state, action) => {
      state.form.push(action.payload)
    }
  }
});

export const { notification, form } = generalsSlice.actions;
export default generalsSlice.reducer;