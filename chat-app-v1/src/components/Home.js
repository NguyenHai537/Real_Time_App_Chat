import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    let {id} = useParams();

    const toAccount = () => {
        navigate(`/${id}/account`)
    }

    return (
        <div>
            <button onClick={toAccount}>Account</button>
        </div>
    )
}

