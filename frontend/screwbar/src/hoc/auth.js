import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../action/auth.js';
import { useNavigate } from 'react-router-dom';


export default function (WrappedComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);

                //로그인안한상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login');
                    }
                } else {
                    if(option === false) {
                        navigate('/home');
                    }
                    //로그인 한 상태
                }
            })
        }, [])
        

        return WrappedComponent;
    }

    return <AuthenticationCheck />;
}