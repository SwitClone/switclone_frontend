import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchArea extends Component{
    render(){
        return(
            <div className = "search_area">
                <div className = "search_bar_icon">
                    <FontAwesomeIcon icon={faSearch} className="search" />
                </div>

                <input type="text" placeholder="DogPaw 내에서 검색"></input>
            </div>
    
        );
    }
}

export default SearchArea;

