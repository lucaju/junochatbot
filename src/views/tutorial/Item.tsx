import { Paper, ListItem, Link, Typography, useTheme } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ItemProps {
  id: string;
  path: string;
}

const Item: FC<ItemProps> = ({ id, path }) => {
  const { ui } = useAppState();
  const actions = useActions();
  const theme = useTheme();
  const [content, setContent] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    loadContent();
  }, [ui.languageCode]);

  const loadContent = async () => {
    //check if system language is supported. If not, fallback to the firs language supported
    const lang = actions.ui.isLanguageSupported(ui.languageCode)
      ? ui.languageCode
      : ui.languages[0].value;

    const file = `index_${lang}.md`;
    const response = await fetch(`${path}/${file}`);
    const text = await response.text();
    setContent(text);
  };

  return (
    <Paper id={id} elevation={theme.palette.mode === 'dark' ? 4 : 1} sx={{ p: 6 }}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            //@ts-ignore
            <Typography component="h2" mb={5} variant="h4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            //@ts-ignore
            <Typography component="h3" mb={2} mt={4} variant="h5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            //@ts-ignore
            <Typography component="h4" mb={3} variant="h6" {...props} />
          ),
          h4: ({ node, ...props }) => (
            //@ts-ignore
            <Typography component="h5" mb={3} variant="subtitle1" {...props} />
          ),
          p: ({ node, ...props }) => (
            //@ts-ignore
            <Typography variant="body1" {...props} paragraph />
          ),
          a: ({ node, ...props }) => (
            //@ts-ignore
            <Link underline="hover" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          li: ({ node, ordered, ...props }) => (
            //@ts-ignore
            <ListItem {...props} ordered={ordered ? 'true' : 'false'} />
          ),
          img: ({ src, title, ...props }) => (
            <img
              src={`${path}/${src}`}
              title={title}
              style={{ maxWidth: '100%', marginTop: '8px', marginBottom: '8px' }}
              {...props}
            />
          ),
          code: ({ node, inline, ...props }) => (
            //@ts-ignore
            <Typography
              component="span"
              inline={inline ? 'true' : 'false'}
              variant="body1"
              sx={{
                px: 0.5,
                fontFamily: 'monospace',
                borderRadius: 1,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: ({ palette }) =>
                  palette.mode === 'dark' ? palette.grey[700] : palette.grey[400],
                backgroundColor: ({ palette }) =>
                  palette.mode === 'dark' ? palette.grey[800] : palette.grey[100],
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Paper>
  );
};

export default Item;
