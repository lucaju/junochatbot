import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/video/:id', async (req, res) => {
  const videoID = req.params.id;

  const baseUrl = 'https://youtube.googleapis.com/youtube/v3';
  const PART = 'snippet%2CcontentDetails';
  const API_KEY = process.env.YT_API;

  const ytResponse = await axios.get(
    `${baseUrl}/videos?part=${PART}&id=${videoID}&key=${API_KEY}`
  );

  const video = ytResponse.data.items[0];

  const videData = {
    title: video.snippet.title,
    channelTitle: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
    duration: video.contentDetails.duration,
    imageUrl: video.snippet.thumbnails.medium.url,
  };

  res.status(200).send(videData);
});

export default router;
