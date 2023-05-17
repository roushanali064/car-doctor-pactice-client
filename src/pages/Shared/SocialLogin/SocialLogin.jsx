import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const handleSocialLogin=()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user)
        })
        .catch(error=>console.error(error.message))
    }
    return (
        <div>
            <div className="divider">OR</div>
            <button onClick={handleSocialLogin} className="btn btn-circle btn-outline">
               <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;