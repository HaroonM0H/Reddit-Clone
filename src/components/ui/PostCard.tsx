import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    num_votes: number;
}

interface PostCardProps {
    post: Post;
}

interface Votes {
    num_votes: number;
}

const PostCard = ({ post }: PostCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post.id}`);
    };

    const [votes, setVotes] = useState<Votes>({
        num_votes: post.num_votes || 0
    });

    useEffect(() => {
        const fetchVotes = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('num_votes')
                .eq('id', post.id)
                .single();

            if (error) {
                console.error("Error fetching votes:", error.message);
            } else if (data) {
                setVotes({ num_votes: data.num_votes || 0 });
            }
        };

        fetchVotes();
    }, [post.id]);

    return (
        <Card 
            className="hover:shadow-2xl dark:hover:bg-zinc-800 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleClick}
        >
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground break-words transition-all duration-300 line-clamp-3">
                    {post.content}
                </p>
            </CardContent>
            <CardFooter>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    
                    <span>Votes: {votes.num_votes}</span>
                    <span>•</span>
                    <time>{new Date(post.created_at).toLocaleDateString()}</time>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PostCard