import React from 'react'

import BlogPost from '../components/blogpost.js'

import indexStyles from './css/index.module.css'


class Errors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }
    render = () => {
        return (
            <div id={indexStyles.container}>
                <div id={indexStyles.header}>
                    <div id={indexStyles.title}>Victor Noordhoek's Musing</div>
                    <div id={indexStyles.subtitle}>Developer / Maker / PCB Designer </div>
                </div>
                <div id={indexStyles.postsContainer}>
                    Whoops! This page doesn't exist.
                </div>
            </div>
        );
    }
}

export default Errors;