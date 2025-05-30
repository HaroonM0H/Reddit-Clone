import { useEffect, useState } from 'react';
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
    likes: number;
}

export default function ViewPost() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post | null>(null);
    const { id } = useParams();
    
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
            
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-1/3 min-w-[300px]">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap break-words">
                                {post.content}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Likes: {post.likes}</span>
                                <span>•</span>
                                <time>{new Date(post.created_at).toLocaleDateString()}</time>
                            </div>
                        </CardFooter>
                    </Card>

                    <Comments postId={post.id} />
                    <div className ="sticky z-10 bottom-0 bg-zinc-900  rounded-lg shadow-lg text-white">
                        <EnterComment />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}