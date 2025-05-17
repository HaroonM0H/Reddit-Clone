import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

//components
import PostCard from "../components/ui/PostCard";

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    likes: number;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select("*")

            if (error) {
                console.error("Error fetching posts:", error.message)
                setPosts([])
                return;
            } else if (data) {
                setPosts(data)
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="page home container mx-auto px-4 py-8">
            {posts && (
                <div className="posts w-2/3 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
