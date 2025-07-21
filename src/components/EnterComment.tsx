import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import supabase from '../config/supabaseClient';

interface EnterCommentProps {
    postId: number;
    onCommentAdded?: () => void;    
}

function EnterComment({ postId, onCommentAdded }: EnterCommentProps) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        setLoading(true);
        setError('');
        const { error } = await supabase
            .from('comments')
            .insert([{ content, post_id: postId }]);
        setLoading(false);
        if (error) {
            setError('Failed to post comment');
        } else {
            setContent('');
            onCommentAdded?.();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write a comment..."
                disabled={loading}
            />
            <Button type="submit" disabled={loading || !content.trim()}>
                {loading ? 'Posting...' : 'Post'}
            </Button>
            {error && <span className="text-red-500">{error}</span>}
        </form>
    );
}

export default EnterComment;