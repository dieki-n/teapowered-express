import React from 'react'

import headerStyles from './css/header.module.css'

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    render = () => {
        return (
            <div id={headerStyles.container}>
                <div id={headerStyles.title}><a href="/blog/">Projects and Musings</a></div>
                <div id={headerStyles.subtitle}>Victor Noordhoek - Developer / Maker</div>
            </div>
        )
    }
}



export default Header;