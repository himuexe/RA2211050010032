import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { fetchLatestPosts } from '../services/services';

interface Post {
  id: string;
  userId: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchLatestPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <Container className="py-8">
      <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
        Feed
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex flex-col items-center">
                <Avatar src={`https://i.pravatar.cc/150?u=${post.userId}`} className="w-20 h-20 mb-4" />
                <Typography variant="h6" className="font-semibold text-gray-700">
                  Post {post.id}
                </Typography>
                <Typography className="text-gray-500">Posted by User {post.userId}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feed;