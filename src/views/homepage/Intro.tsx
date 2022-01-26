/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Intro: FC = () => {
  const [content, setContent] = useState('');
  const { ui } = useAppState();
  const actions = useActions();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    loadContent();
  }, [ui.languageCode]);

  const loadContent = async () => {
    //check if system language is supported. If not, fallback to the first language supported
    const lang = actions.ui.isLanguageSupported(ui.languageCode)
      ? ui.languageCode
      : ui.languages[0].value;
    const file = `intro_${lang}.md`;
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
              //@ts-ignore
              <Typography component="h2" mb={3} variant="h4" {...props} />
            ),
            //@ts-ignore
            p: ({ node, ...props }) => <Typography align="center" variant="subtitle1" {...props} />,
            a: ({ node, ...props }) => (
              //@ts-ignore
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
