/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useAppState } from '@src/overmind';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  title?: string;
}

const Page = forwardRef<PageProps, any>(({ children, title = '', ...rest }, ref) => {
  const { ui } = useAppState();

  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{`${ui.appName} - ${title}`}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
