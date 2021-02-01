import React from 'react'

import BlogPost from '../components/blogpost.js'
import Header from '../components/header.js'

import indexStyles from './css/index.module.css'


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }
    render = () => {
        return (
            <div id={indexStyles.container}>
                <Header/>
                <div id={indexStyles.postsContainer}>
                    {this.props.data.map(post => <BlogPost data={post} preview={true} key={post._id.toString()}/>)}
                </div>
            </div>
        );
    }
}

export default Index;