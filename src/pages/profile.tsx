import type { NextPage } from 'next';
import GridItem from 'components/GridItem';
import StatsItem from 'components/StatsItem';
import router from 'next/router';
import Lottie from 'lottie-react';
import profile from 'assets/profile.json';
import HeadInformation from 'components/HeadInformation';
import AuthorizedPage from 'hoc/Authorized';
import {
	getBooksFromCollection,
	getUserData,
	handleLougout,
} from '../firebase/firebase';
import { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import { BookColumns } from 'service/Books/types';
import { motion } from 'framer-motion';

const Profil: NextPage = () => {
	const [userDisplayName, setUserDisplayName] = useState<string>('');
	const [columns, setColumns] = useState<BookColumns>({
		Read: {},
		Reading: {},
		ToRead: {},
	});

	useEffect(() => {
		getUserData().then((userData) => {
			if (userData) {
				setUserDisplayName(userData.data()?.displayName);
			}
		});
	});
	getBooksFromCollection().then((columns) => {
		if (columns) setColumns(columns);
	});

	return (
		<>
			<HeadInformation title={'Profile'} content={'Profile'} />
			<motion.div
				className="rounded-lg shadow-xl bg-secondary"
				initial={{ opacity: 0.8, scale: 0.9 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<div className="w-full border rounded-t-lg shadow-md bg-secondary">
					<ul className="text-xl font-bold text-center text-white divide-x sm:flex">
						<li className="w-full">
							<div className="inline-block w-full p-4 text-white rounded-t-lg bg-primary">
								{userDisplayName ? userDisplayName : ' '}
							</div>
						</li>
					</ul>
					<div className="w-full text-center">
						<p className="inline-block w-full p-4 text-base text-white bg-secondary">
							Your statistics
						</p>
					</div>
					<div className="border-t border-secondary">
						<dl className="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-white sm:grid-cols-3 xl:grid-cols-3 sm:p-8">
							<StatsItem
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								title={columns.ToRead.items ? columns.ToRead.items.length : 0}
								subtitle={'To read'}
							/>
							<StatsItem
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								title={columns.Reading.items ? columns.Reading.items.length : 0}
								subtitle={'Reading'}
							/>
							<StatsItem
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-expect-error
								title={columns.Read.items ? columns.Read.items.length : 0}
								subtitle={'Read'}
							/>
						</dl>
					</div>
				</div>
				<div className="items-center block md:flex">
					<div className="grid gap-2 py-2 rounded-lg md:w-1/2 md:grid-cols-1">
						<GridItem cardTitle="Books" onClick={() => router.push('/books')} />
						<GridItem cardTitle="Notes" onClick={() => router.push('/notes')} />
						<GridItem
							cardTitle="Account"
							onClick={() => router.push('/account')}
						/>
						<GridItem
							cardTitle="Logout"
							onClick={handleLougout}
							logout={true}
						/>
					</div>
					<div className="hidden md:block">
						<Lottie
							animationData={profile}
							loop={true}
							className="md:h-[30rem]"
						/>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default AuthorizedPage(Profil);
