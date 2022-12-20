import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.Title}</td>
                    <td>{props.Length}</td>
                    <td>{props.Rating}</td>
                    <td>
                    </td>
                    <td>{props.Awards}</td>
                </tr>
            )
    }
    
        

export default ChartRow;