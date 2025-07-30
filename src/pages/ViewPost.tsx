import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/button';
import supabase from '../config/supabaseClient';
import Comments from "@/components/Comments"
import  EnterComment  from '../components/EnterComment';

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

export default function ViewPost() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams();
    const [refreshComments, setRefreshComments] = useState(0);

    const handleCommentAdded = useCallback(() => {
        setRefreshComments(c => c + 1);
    }, []);
    
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select("*")
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error("Error fetching post:", error.message);
                    setPost(null);
                } else if (data) {
                    setPost(data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);
    
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
                <p className="text-white">Post not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900 relative">
            <Button 
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 bg-zinc-800 hover:bg-zinc-700"
            >
                ← Back to Home
            </Button>
            
            <div className="flex justify-center items-start min-h-screen pt-16">
                <div className="w-full max-w-3xl flex flex-col items-center">
                    {/* Larger Post Card */}
                    <Card className="shadow-2xl w-full mb-8 p-8 bg-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-white whitespace-pre-wrap break-words">
                                {post.content}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center gap-2 text-base text-muted-foreground">
                                <time>{new Date(post.created_at).toLocaleDateString()}</time>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Comments Section */}
                    <div className="w-full max-w-md">
                        <Comments postId={post.id} key={refreshComments} />
                        <div className="sticky z-10 bottom-0 bg-zinc-900 rounded-lg shadow-lg text-white p-2 mt-2">
                            <EnterComment postId={post.id} onCommentAdded={handleCommentAdded} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}