import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";

const Signin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);  

const { signInUser } = UserAuth();
const navigate = useNavigate();


const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
        const result = await signInUser({ email, password });

        if (result.success) {
            navigate('/profile');
        } else {
            // Check for specific error types
            if (result.error === 'Invalid login credentials') {
                setError('User does not exist. Please check your email or sign up.');
            } else {
                setError(result.error || 'An error occurred');
            }
        }
    } catch (err) {
        setError('An unexpected error occurred. Please try again.');
    } finally {
        setLoading(false);
    }

}
return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <form onSubmit={handleSignin} className="max-w-md m-auto pt-24">
        <h2 className="font-bold text-2xl pb-2">Sign in</h2>
        <p className="text-zinc-400">
          Don't have an account? <Link to="/signup" className="text-red-500 hover:text-red-400 transition-colors">Sign up!</Link>
        </p>
        <div className="flex flex-col py-4">
          <input 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 mt-6 bg-zinc-800 border border-zinc-700 rounded-sm focus:outline-none focus:border-zinc-600 text-white placeholder:text-zinc-500"
            type="email"
          />
          <input 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 mt-6 bg-zinc-800 border border-zinc-700 rounded-sm focus:outline-none focus:border-zinc-600 text-white placeholder:text-zinc-500"
            type="password"
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-red-600 text-white px-6 py-3 mt-6 w-full rounded-sm hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Sign in to existing account
          </button>

          <br></br>
          <Link to= "/App" className="text-zinc-400 hover:text-white transition-colors">
            Back to home
          </Link>

          {error && <p className="text-red-500 text-center pt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signin;