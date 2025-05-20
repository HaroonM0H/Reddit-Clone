import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    console.log(session);

    const handleSignOut = async (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        try{
            await signOut();
            navigate('/');
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div>
            <h1 className="text-white text-2xl font-bold">Profile</h1>
            <h2 className="text-white text-xl font-bold">Welcome, {session?.user.email}</h2>
            <Link to="/" className="text-blue-400 underline">Go to home</Link>

            <div>
                <p onClick={handleSignOut}
                className = "hover:cursor-pointer border inline-block px-4 py-3 mt-4">
                    Sign out
                </p>
            </div>
        </div>
    )
}
export default Profile;