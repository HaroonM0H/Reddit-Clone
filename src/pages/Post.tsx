import React from 'react';

const Post: React.FC = () => {


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Post</h1>
      <div className="prose max-w-none">
        {/* Post content will go here */}
      </div>
    </div>
  );
};

export default Post;
