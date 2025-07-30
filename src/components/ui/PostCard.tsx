import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"


interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

interface PostCardProps {
    post: Post;
}


const PostCard = ({ post }: PostCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post.id}`);
    };

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
                    <time>{new Date(post.created_at).toLocaleDateString()}</time>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PostCard