import { Box, Button, Container, Link, Stack, Typography } from '@material-ui/core';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Pedagogical: FC = () => {
  const { t } = useTranslation();
  const { ui } = useAppState();
  const actions = useActions();
  const [content, setContent] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    loadContent();
  }, [ui.languageCode]);

  const loadContent = async () => { 
    //check if system language is supported. If not, fallback to the firs language supported
    const lang = actions.ui.isLanguageSupported(ui.languageCode) ? ui.languageCode : ui.languages[0].value;
    const file = `pedagogical_${lang}.md`;
    const response = await fetch(`./assets/pedagogical/${file}`);
    const text = await response.text();
    setContent(text);
  };

  return (
    <Box id="pedagogical" display="flex" height="75vh" alignItems="center">
      <Container maxWidth="md">
        <Stack spacing={3}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                //@ts-ignore
                <Typography align="center" component="h2" mb={3} variant="h4" {...props} />
              ),
              p: ({ node, ...props }) => (
                //@ts-ignore
                <Typography align="center" variant="subtitle1" {...props} />
              ),
              a: ({ node, ...props }) => (
                //@ts-ignore
                <Link underline="hover" target="_blank" rel="noopener noreferrer" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          {/* <Box display="flex" justifyContent="center">
            <Button sx={{ width: 200 }}>{t('home:pedagogicalMaterial')}</Button>
          </Box> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Pedagogical;