import { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import supabase from "../config/supabaseClient";

interface UserPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  username: string;
}

const Profile = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('username', session?.user.email)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
          return;
        }
        setUserPosts(data || []);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.email) {
      fetchUserPosts();
    }
  }, [session?.user.email]);

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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-white">Welcome,</span>
                  <span className="text-zinc-400">{session?.user.email}</span>
                  <span>
                    <Button 
                    variant ="outline"
                    className = "w-full bg-zinc-700/50 border-zinc-600 text-white hover:bg-zinc-700"
                    >Change your username</Button>
                  </span>
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Your Posts</h3>
                  {userPosts.length > 0 ? (
                    <div className="space-y-4">
                      {userPosts.map((post) => (
                        <Card key={post.id} className="bg-zinc-700/50 border-zinc-600">
                          <CardContent className="pt-6">
                            <h4 className="text-white font-medium mb-2">{post.title}</h4>
                            <p className="text-zinc-400 text-sm line-clamp-2">{post.content}</p>
                            <p className="text-zinc-500 text-xs mt-2">
                              Posted on {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-400">You haven't created any posts yet.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t border-zinc-700 pt-6">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/">
                      <Button 
                        variant="outline" 
                        className="w-full bg-zinc-700/50 border-zinc-600 text-zinc-400 hover:text-white hover:bg-zinc-700"
                      >
                        Back to home
                      </Button>
                    </Link>
                    <Button 
                      onClick={handleSignOut}
                      variant="destructive"
                      className="w-full"
                    >
                      Sign out
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;