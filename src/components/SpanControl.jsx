import React from 'react'

const SpanControl = ({ data, name, width, handleClick }) => {
    return (
        <span className={`badge dark bg-success mx-2 my-2 position-relative ${data === 0 && 'd-none'}`} style={{ width: `${width}` }} onClick={() => handleClick}>
            {name}
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{data}</span>
        </span>
    )
}

export default SpanControl