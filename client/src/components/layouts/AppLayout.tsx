import { FC, ReactElement, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactElement;
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default AppLayout;
