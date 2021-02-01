import React from 'react'
import ReactMarkdown from 'react-markdown'
import blogPostStyles from './css/blogpost.module.css'

class BlogPost extends React.Component {
    constructor(props){
        super(props)
    }
    render = () => {

        if (!this.props.data) {
            return (
                <div className={blogPostStyles.postContainer}>
                    <div className={blogPostStyles.postNotFound}>
                        Whoops! This blog post doesn't exist.
                    </div>
                </div>
            )
        } else {
            
        }
        if (this.props.preview){
            var postText = this.props.preview ? this.props.data.text.substring(0,1000) + "..." : this.props.data.text
            return (
                <div className={blogPostStyles.postPreviewContainer}>
                    <div className={blogPostStyles.postTitle}>
                    <a href={"/blog/posts/" + this.props.data.url}>{this.props.data.title}<img src="/images/link.svg" width={12} height={12}/></a>
                    </div>
                    <div className={blogPostStyles.postBody}>
                        {this.props.data.text.substring(0,200) + "... "}
                        <a href={"/blog/posts/" + this.props.data.url}>see more...</a>
                    </div>
                    <div className={blogPostStyles.postDate}>
                        Posted {this.props.data.date.toLocaleDateString('en-US')} by {this.props.data.author}
                    </div>
                </div>
            )
        } else {
            return (
                <div className={blogPostStyles.postContainer}>
                    <div className={blogPostStyles.postTitle}>
                        <a href={"/blog/posts/" + this.props.data.url}>{this.props.data.title}</a>
                    </div>
                    <div className={blogPostStyles.postDate}>
                        Posted {this.props.data.date.toLocaleDateString('en-US')} by {this.props.data.author}
                    </div>
                    <div className={blogPostStyles.postBody}>
                        <ReactMarkdown>{this.props.data.text}</ReactMarkdown>
                    </div>
                </div>
            )
        }
    }
}



export default BlogPost;