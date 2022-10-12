import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import {
	QueryClient,
	QueryClientProvider,
	Hydrate,
	DehydratedState,
} from 'react-query';
import 'styles/style.css';

function MyApp({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
