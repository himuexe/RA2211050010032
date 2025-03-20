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
    <Container className="py-8">
      <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
        Trending Posts
      </Typography>
      <Grid container spacing={4}>
        {trendingPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex flex-col items-center">
                <Avatar src={`https://i.pravatar.cc/150?u=${post.userId}`} className="w-20 h-20 mb-4" />
                <Typography variant="h6" className="font-semibold text-gray-700">
                  Post {post.id}
                </Typography>
                <Typography className="text-gray-500">Comments: {post.comments}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrendingPosts;