const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 5000;
const TESTURL = 'http://20.244.56.144/test';
const token = process.env.AUTH;

app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );

app.get('/users', async (req, res) => {
    try {
        const usersResponse = await fetch(`${TESTURL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(usersResponse);
        const users = await usersResponse.json();
        const userList = Object.keys(users.users);
        const postCounts = await Promise.all(userList.map(async userId => {
            const postsResponse = await fetch(`${TESTURL}/users/${userId}/posts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const posts = await postsResponse.json();
            return { userId, count: posts.posts.length };
        }));
        const topUsers = postCounts.sort((a, b) => b.count - a.count).slice(0, 5);
        res.json({ topUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const type = req.query.type;
        if (!['popular', 'latest'].includes(type)) return res.status(400).send('Invalid type');

        const usersResponse = await fetch(`${TESTURL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const users = await usersResponse.json();
        const userList = Object.keys(users.users);
        let allPosts = [];
        for (const userId of userList) {
            const postsResponse = await fetch(`${TESTURL}/users/${userId}/posts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const posts = await postsResponse.json();

            if (type === 'popular') {
                for (const post of posts.posts) {
                    const commentsResponse = await fetch(`${TESTURL}/posts/${post.id}/comments`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const comments = await commentsResponse.json();
                    post.comments = comments.comments.length;
                }
            }
            allPosts.push(...posts.posts);
        }
        if (type === 'popular') {
            const maxComments = Math.max(...allPosts.map(p => p.comments || 0));
            res.json({ posts: allPosts.filter(p => p.comments === maxComments) });
        } else {
            res.json({ posts: allPosts.sort((a, b) => b.id - a.id).slice(0, 5) });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));