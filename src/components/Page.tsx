import { useApp } from '@src/overmind';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  title?: string;
}

const Page = forwardRef<PageProps, any>(({ children, title = '', ...rest }, ref) => {
  const { state } = useApp();

  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{`${state.ui.appName} - ${title}`}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
