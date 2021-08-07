import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/video/:id', async (req, res) => {
  const videoID = req.params.id;

  const baseUrl = 'https://youtube.googleapis.com/youtube/v3';
  const PART = 'snippet%2CcontentDetails';
  const API_KEY = process.env.YT_API;

  if (!API_KEY || !videoID) return res.status(400).send();

  const ytResponse = await axios.get(`${baseUrl}/videos?part=${PART}&id=${videoID}&key=${API_KEY}`);

  if (
    !ytResponse ||
    !ytResponse.data ||
    !ytResponse.data.items ||
    ytResponse.data.items.length === 0
  ) {
    return res.status(404).send();
  }

  const video = ytResponse.data.items[0];
  if (!video) return res.status(404).send();

  const { snippet, contentDetails } = video;

  const videData = {
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    publishedAt: snippet.publishedAt,
    duration: contentDetails.duration,
    imageUrl: snippet.thumbnails.medium.url,
  };

  res.status(200).send(videData);
});

export default router;
