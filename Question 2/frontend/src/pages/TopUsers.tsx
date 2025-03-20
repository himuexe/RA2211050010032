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
    <Container className="py-8">
      <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
        Top Users
      </Typography>
      <Grid container spacing={4}>
        {topUsers.map((user) => (
          <Grid item key={user.userId} xs={12} sm={6} md={4}>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex flex-col items-center">
                <Avatar src={`https://i.pravatar.cc/150?u=${user.userId}`} className="w-20 h-20 mb-4" />
                <Typography variant="h6" className="font-semibold text-gray-700">
                  User {user.userId}
                </Typography>
                <Typography className="text-gray-500">Posts: {user.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopUsers;