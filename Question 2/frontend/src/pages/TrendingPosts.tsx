import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

interface Post {
  id: string;
  userId: string;
  comments: number;
}

const TrendingPosts: React.FC = () => {
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts?type=popular')
      .then((response) => response.json())
      .then((data) => setTrendingPosts(data.posts))
      .catch((error) => console.error('Error fetching trending posts:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      <Grid container spacing={3}>
        {trendingPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar src={`https://i.pravatar.cc/150?u=${post.userId}`} />
                <Typography variant="h6">Post {post.id}</Typography>
                <Typography>Comments: {post.comments}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrendingPosts;