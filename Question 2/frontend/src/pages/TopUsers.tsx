import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

interface User {
  userId: string;
  count: number;
}

const TopUsers: React.FC = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setTopUsers(data.topUsers))
      .catch((error) => console.error('Error fetching top users:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top Users
      </Typography>
      <Grid container spacing={3}>
        {topUsers.map((user) => (
          <Grid item key={user.userId} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar src={`https://i.pravatar.cc/150?u=${user.userId}`} />
                <Typography variant="h6">User {user.userId}</Typography>
                <Typography>Posts: {user.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopUsers;