import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const Profile = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900">
            <div className="container mx-auto px-4 pt-20">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-zinc-800 border-zinc-700">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-lg">
                                <span className="text-white">Welcome,</span>
                                <span className="text-zinc-400">{session?.user.email}</span>
                            </div>
                            <div className="grid gap-4">
                                <Link to="/postpage">
                                    <Button 
                                        variant="outline" 
                                        className="w-full bg-zinc-700/50 border-zinc-600 text-white hover:bg-zinc-700"
                                    >
                                        Create a Post
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-zinc-700 pt-6">
                            <Button 
                                onClick={handleSignOut}
                                variant="destructive"
                                className="w-full"
                            >
                                Sign out
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Profile;