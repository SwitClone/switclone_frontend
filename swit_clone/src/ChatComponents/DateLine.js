import React, { Component } from 'react';

class DateLine extends Component{
    render(){
        return(
            <div className= "date_line_area">
                <div className = "d_line"></div>
                <div className = "date">yesterday</div>
                <div className = "d_line"></div>
            </div>
        );
    }
}
export default DateLine;