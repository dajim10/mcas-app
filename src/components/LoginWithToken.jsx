import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginWithToken = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        // console.log(token);
        // https://api.rmutsv.ac.th/elogin/token/kitisak.w:GL6jGhJnRsq7nqmWO2XndtreM9MuPRMpI9Ct37co7bLcIQFY7Y9Ph26WCu5TcRp4
        // const data = await axios.get(`https://api.rmutsv.ac.th/elogin/token/${token}`)
        //     .then(res => res.data)
        //     .catch(err => err);

        // console.log(data);
        const checkToken = await fetch(`https://api.rmutsv.ac.th/elogin/token/${token}`)
            .then(res => res.json())
            .then(data => {
                data
                if (data.status === 'ok') {
                    return true
                } else {

                    return false
                }
            })
            .catch(err => {
                console.log(err);
                // return false
            });

        if (checkToken) {
            localStorage.setItem('token', token);
            window.location.href = '/';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                timer: 2000,
            })
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        // localStorage.setItem('token', token);

        // navigate('/login');
    }
        , [token]);


    return (
        <div>LoginWithToken</div>
    )
}

export default LoginWithToken