const API_BASE_URL = 'http://localhost:5000';

export const fetchLatestPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=latest`);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw error;
  }
};
export const fetchTopUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();
    return data.topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

export const fetchTrendingPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?type=popular`);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};