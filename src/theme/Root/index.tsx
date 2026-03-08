import React from 'react';
import { ThemeProvider } from "@ngrok/mantle/theme-provider";
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function Root({ children }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return <>{children}</>;
  }
	return (
		<ThemeProvider>
			{children}
		</ThemeProvider>
	);
}
