import type { NextPage } from 'next';
import HeadInformation from 'components/HeadInformation';
import AuthorizedPage from 'hoc/Authorized';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserData } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import account from 'assets/account.json';

const Account: NextPage = () => {
	const [userUID, setUserUID] = useState<string>('');
	const [userProvider, setUserProvider] = useState<string>('');
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (user)
			getUserData(user?.uid).then((userData) => {
				if (userData) {
					setUserUID(userData.data()?.uid);
					setUserProvider(userData.data()?.authProvider);
				}
			});
	});

	return (
		<>
			<HeadInformation title={'Settings'} content={'Settings'} />
			<div className="rounded-lg shadow-xl bg-secondary">
				<div className="w-full border rounded-lg rounded-t-lg shadow-md bg-secondary">
					<ul className="text-xl font-bold text-center text-white divide-x sm:flex">
						<li className="w-full">
							<p className="inline-block w-full p-4 text-white rounded-t-lg bg-primary"></p>
						</li>
					</ul>
					<div className="flex items-center justify-around p-8 border-t rounded-lg md:p-6 border-secondary">
						<div className="text-2xl text-white selection:max-w-md ">
							<div className="flex flex-col px-8 pb-3 md:px-0">
								<h2 className="mb-2 text-lg font-light text-gray-400 md:text-2xl">
									Display Name
								</h2>
								<p className="mb-2 text-lg font-semibold md:text-xl">
									{user?.displayName ? user?.displayName : '-'}
								</p>
							</div>
							<div className="flex flex-col px-8 pb-3 md:px-0">
								<h2 className="mb-2 text-lg font-light text-gray-400 md:text-2xl">
									Address e-mail
								</h2>
								<p className="mb-2 text-lg font-semibold md:text-xl">
									{user?.email}
								</p>
							</div>
							<div className="flex flex-col px-8 pb-3 md:px-0">
								<h2 className="mb-2 text-lg font-light text-gray-400 md:text-2xl">
									Provider
								</h2>
								<p className="mb-2 text-lg font-semibold md:text-xl">
									{userProvider}
								</p>
							</div>
							<div className="flex flex-col px-8 pb-3 md:px-0">
								<h2 className="mb-2 text-lg font-light text-gray-400 md:text-2xl">
									UID
								</h2>
								<p className="mb-2 text-lg font-semibold md:text-xl">
									{userUID}
								</p>
							</div>
						</div>
						<div className="hidden md:block">
							<Lottie
								animationData={account}
								loop={true}
								className="md:h-[24rem]"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthorizedPage(Account);
