import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import supabase from '../config/supabaseClient';
import Comments from "@/components/Comments"

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    likes: number;
}

export default function ViewPost() {
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
        <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
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

                <Comments/>
            </div>
        </div>
    );
}