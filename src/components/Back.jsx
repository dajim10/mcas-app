import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/fontawesome-free-solid';

const Back = () => {
    const navigate = useNavigate();
    return (
        <div id="back" style={{ zIndex: '9999' }} className='mt-3'>

            <button className="btn btn-primary shadow rounded-pill" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />{' '}Back
            </button>
        </div>
    )
}

export default Back