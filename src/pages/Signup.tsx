import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Create account
          </Button>

          <Link 
            to="/" 
            className="text-zinc-400 hover:text-white transition-colors text-center"
          >
            Back to home
          </Link>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </div>
);
};

export default Signup;