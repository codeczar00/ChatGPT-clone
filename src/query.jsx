import React from "react";
import msgIcon from './assets/message.svg'

function Query({queryText}) {
    return (
    <div className='query'><img src={msgIcon} alt="Query" />{queryText}</div>
    )
}

export default Query ;