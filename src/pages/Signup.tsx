import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";

const Signup = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);  

const { signUpNewUser } = UserAuth();
const navigate = useNavigate();


const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
        const result = await signUpNewUser(email, password);

        if (result.success) {
            navigate('/profile');
            console.log("User signed up successfully:", result.data);
        }
    } catch (err) {
        setError('An error occured');
    } finally {
        setLoading(false);
    }

}
return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <form onSubmit={handleSignup} className="max-w-md m-auto pt-24">
        <h2 className="font-bold text-2xl pb-2">Sign up today!</h2>
        <p className="text-zinc-400">
          Already have an account? <Link to="/signin" className="text-red-500 hover:text-red-400 transition-colors">Sign in!</Link>
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
            Create account
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

export default Signup;