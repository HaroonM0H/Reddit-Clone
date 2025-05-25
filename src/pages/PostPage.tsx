import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { UserAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";



export default function PostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { session } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    { 
                        title, 
                        content,
                        created_at: new Date().toISOString(),
                        username: session.user.email
                    }
                ])
                .select()

            if (error) {
                setError(error.message);
                return;
            } else if (data) {
                console.log("Post created successfully:", data);
            }

            navigate('/');
        } catch (err) {
            setError('An error occurred while creating the post');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-900">
            {loading && <LoadingSpinner />}
            <div className="container mx-auto px-4 pt-20">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-zinc-800 border-zinc-700">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Create a Post</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        id="title"
                                        placeholder="Post title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <textarea
                                        id="content"
                                        placeholder="Write your post content here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full min-h-[200px] bg-zinc-700/50 border border-zinc-600 rounded-md p-3 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500"
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t border-zinc-700 pt-6">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => navigate('/')}
                                    className="text-zinc-400 hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {loading ? 'Creating...' : 'Create Post'}
                                </Button>
                            </CardFooter>
                            {error && (
                                <p className="text-red-500 text-center pb-4">{error}</p>
                            )}
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
