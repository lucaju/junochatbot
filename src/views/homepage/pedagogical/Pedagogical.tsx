import { Box, Button, Container, Link, Stack, Typography } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Pedagogical: FC = () => {
  const { t } = useTranslation(['home']);
  const { ui } = useAppState();
  const [content, setContent] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    loadContent();
  }, [ui.languageCode]);

  const loadContent = async () => {
    const file = `pedagogical_${ui.languageCode}.md`;
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
                <Typography align="center" component="h2" mb={3} variant="h4" {...props} />
              ),
              p: ({ node, ...props }) => (
                <Typography align="center" variant="subtitle1" {...props} />
              ),
              a: ({ node, ...props }) => (
                <Link underline="hover" target="_blank" rel="noopener noreferrer" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          <Box display="flex" justifyContent="center">
            <Button sx={{ width: 200 }}>{t('pedagogicalMaterial')}</Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Pedagogical;

{
  /* <Stack spacing={3}>
        <Typography align="center" variant="h4">
          IA en contexte pédagogique
        </Typography>
        <Typography align="center" variant="subtitle1">
          Ce projet s’appuie sur des approches novatrices en éducation pour contribuer au
          développement d’une culture technologique et scientifique chez les jeunes et pour inclure
          la société dans les débats autour des prémisses et des choix concernant le domaine de
          l’intelligence artificielle (IA). La compréhension du développement des agents
          conversationnels permettra de mieux outiller les jeunes à comprendre et débattre pour
          s’impliquer dans les prises de décisions liées à l’IA.
        </Typography>
        <Button>Pedagogical Material</Button>
      </Stack> */
}
