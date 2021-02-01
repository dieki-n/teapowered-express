import React from 'react'
import searchBarStyles from './searchbar.module.css'

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: "",
                      autofill: [],
                      dropdown_visible: false};
        this.search_token = 0;
    }
    handleFocus = (e) => {
        this.setState({dropdown_visible: true});
    }
    handleLoseFocus = (e) => {
        if (e.relatedTarget === null){
            this.setState({dropdown_visible: false});
        }
    }
    handleSelectItem = (item) => {
        this.setState({
            value: item,
            dropdown_visible: false
        })
        console.log(item)
        this.props.callback(item);
    }
    handleChange = (e) => {
        this.setState({value: e.target.value});
        if (e.target.value == ""){
            this.setState({autofill: []})
        } else {
            this.search_token++;
            fetch("/grocery/search/" + encodeURIComponent(e.target.value) + "/" + encodeURIComponent(this.search_token))
                .then(res => res.json())
                .then((json) => {
                    if (this.search_token == json.token){
                        this.setState({autofill: json.data})
                    } else {
                        console.log("Out of order request:", json)
                    }
                }).catch((err) => {
                    console.log(err)
                });
            
            
        }
    }
    
    render(){
        return (
            <div id={searchBarStyles.container} onFocus={this.handleFocus} onBlur={this.handleLoseFocus} tabIndex="-1">
                <input 
                    type='text' 
                    onChange={this.handleChange} 
                    autoComplete="off" 
                    id={searchBarStyles.bar}
                    tabIndex="0"
                    value={this.state.value}
                />
                {(this.state.dropdown_visible && this.state.autofill.length > 0) && 
                    (<div id={searchBarStyles.dropdown}>
                        {this.state.autofill.map((item) => 
                            (<div className={searchBarStyles.dropdownItem} key={item} onClick={() => this.handleSelectItem(item)}>
                                    {item}
                            </div>)
                        )}
                    </div>)
                }
            </div>
        );
    }
}
export default SearchBar