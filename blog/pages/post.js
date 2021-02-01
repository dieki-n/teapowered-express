import React from 'react'

import BlogPost from '../components/blogpost.js'
import Header from '../components/header.js'

import postStyles from './css/index.module.css'
import commonStyles from './css/common.module.css'


class PostUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }
    render = () => {

        return (
            <div id={postStyles.container}>
                <Header/>
                <div id={postStyles.postContainer}>
                    <BlogPost data={this.props.data} preview={false}/>
                </div>
            </div>
        );
    }
}

export default PostUI;