import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                        Sign in to existing account
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

export default Signin;