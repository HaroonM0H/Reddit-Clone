import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "./ui/card";
import supabase from '../config/supabaseClient';
import { LoadingSpinner } from './ui/LoadingSpinner';


interface Comment {
    id: number;
    created_at: string;
    content: string;
    post_id: number;
}

interface CommentsProps {
    postId: number;
}

function Comments({ postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('post_id', postId)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error("Error fetching comments:", error.message);
                } else if (data) {
                    setComments(data);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (comments.length === 0) {
        return (
            <Card className="mt-4">
                <CardContent className="pt-4">
                    <p className="text-muted-foreground text-center">No comments yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="mt-4 space-y-4">
            {comments.map((comment) => (
                <Card key={comment.id}>
                    <CardContent className="pt-4">
                        <p className="break-words">
                            {comment.content}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <time>{new Date(comment.created_at).toLocaleDateString()}</time>
                        </div>
                    </CardFooter>
                </Card>
            ))}
            
        </div>
    );
}

export default Comments;