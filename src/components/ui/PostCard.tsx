interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    likes: number;
}

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="post-card rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-xl font-semibold text-card-foreground mb-2">{post.title}</h3>
            <p className="text-muted-foreground mb-4">{post.content}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Likes: {post.likes}</span>
                <span>•</span>
                <time>{new Date(post.created_at).toLocaleDateString()}</time>
            </div>
        </div>
    )
}

export default PostCard