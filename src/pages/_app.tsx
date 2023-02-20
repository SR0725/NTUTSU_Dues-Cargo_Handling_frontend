import '@/styles/globals.css';
import '@/styles/list-slide.scss';

import type { AppProps } from 'next/app';
import AppNavbar from '@/components/app/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { StudentContextProvider } from '@/hooks/useStudents';
import { IouContextProvider } from '@/hooks/useIous';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<IouContextProvider>
				<StudentContextProvider>
					<Provider store={store}>
						<Component {...pageProps} />
						<AppNavbar />
					</Provider>
				</StudentContextProvider>
			</IouContextProvider>
		</>
	);
}
