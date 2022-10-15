import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import {
	QueryClient,
	QueryClientProvider,
	Hydrate,
	DehydratedState,
} from 'react-query';
import 'styles/style.css';
import PageTemplate from 'templates/PageTemplate';

function MyApp({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<PageTemplate>
					<Component {...pageProps} />
				</PageTemplate>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
