import { PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}