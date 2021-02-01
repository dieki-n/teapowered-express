import React from 'react'


import adminStyles from './css/admin.module.css'

class NewPostUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: "",
            postTitle: ""
        };
        
    }
    updatePostBody = (event) => {
        this.setState({postBody: event.target.value});
    }
    handleSubmit = () =>{
        fetch("/blog/newpost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.text())
        .then(text => console.log(text))

        console.log(this.state.postBody)
    }
    render = () => {
        return (
            <div id={adminStyles.container}>
                <div>New Post</div>
                <div id={adminStyles.titleBoxContainer}>
                    <input type='text' id={adminStyles.titleBox} value={this.state.postTitle} onChange={(e) => {this.setState({postTitle: e.target.value})}}/>
                </div>
                <div id={adminStyles.textBoxContainer}>
                    <textarea id={adminStyles.textbox} value={this.state.postBody} onChange={this.updatePostBody}/>
                </div>
                <input type='button' id={adminStyles.submitButton} value='Submit' onClick={this.handleSubmit}/>
            </div>
        );
    }
}

export default NewPostUI;