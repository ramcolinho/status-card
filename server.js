const express = require("express");
const app = express();
const axios = require("axios");
const cors = require('cors');

const _COMMENTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const _USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const _IMAGE_URL = 'https://i.pravatar.cc/150';
const $port = 3000;

app.use(cors());

app.get("/users-comments", async (req, res) => {
  try {
    const users = await axios.get(_USERS_URL);
    const comments = await axios.get(_COMMENTS_URL);
    const usersData = users.data;
    const commentsData = comments.data;

    const result = usersData.map(user => ({
      ...user,
      profileImage: `${_IMAGE_URL}?img=${user.id}`,
      comments: commentsData.filter(({ userId }) => +userId === +user.id).map(comments => ({
        ...comments,
        claps: comments.id * 2,
      })).sort((a, b) => b.claps - a.claps),
      })).map(item => ({
      ...item,
      totalClaps: item.comments.reduce((acc, item) => acc + item.claps, 0),
    })).sort((a, b) => b.totalClaps - a.totalClaps);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.listen($port, () => {
  console.log('Server started at port = ', $port);
});
