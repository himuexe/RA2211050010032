import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

interface Post {
  id: string;
  userId: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = () => {
      fetch('http://localhost:5000/posts?type=latest')
        .then((response) => response.json())
        .then((data) => setPosts(data.posts))
        .catch((error) => console.error('Error fetching feed:', error));
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Feed
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar src={`https://i.pravatar.cc/150?u=${post.userId}`} />
                <Typography variant="h6">Post {post.id}</Typography>
                <Typography>Posted by User {post.userId}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feed;