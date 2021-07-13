import { Box, Container, Link, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Intro: FC = () => {
  const [content, setContent] = useState('');
  const { ui } = useAppState();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    loadContent();
  }, [ui.languageCode]);

  const loadContent = async () => {
    const file = `intro_${ui.languageCode}.md`;
    const response = await fetch(`./assets/intro/${file}`);
    const text = await response.text();
    setContent(text);
  };

  return (
    <Box id="about" py={isMobile ? 8 : 15}>
      <Container maxWidth="md">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <Typography component="h2" mb={3} variant="h4" {...props} />
            ),
            p: ({ node, ...props }) => <Typography align="center" variant="subtitle1" {...props} />,
            a: ({ node, ...props }) => (
              <Link underline="hover" target="_blank" rel="noopener noreferrer" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Container>
    </Box>
  );
};

export default Intro;
