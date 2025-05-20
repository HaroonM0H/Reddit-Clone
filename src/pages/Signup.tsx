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
    <div>
      <form onSubmit={handleSignup} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign up today!</h2>
        <p>
          Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-600">Sign in!</Link>
        </p>
        <div className="flex flex-col py-4">
          <input onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 mt-6"
            type="email"
            />
          <input onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 mt-6" 
            type="password"
            />
          <button type="submit" disabled={loading} className="mt-6 w-full"> Create account </button>

          {error && <p className="text-red-500 text-center pt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signup;