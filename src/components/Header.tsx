import React, { useRef, useState } from 'react';
import Button from 'components/Button';
import Link from 'next/link';
import router from 'next/router';
import AvatarMenu from 'components/AvatarMenu';
import SearchForm from 'components/SearchForm';
import Search from 'assets/search.svg';
import { useClickAway, useWindowSize } from 'react-use';

interface HeaderProps {
	authorized: boolean;
}

const Header = ({ authorized }: HeaderProps) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { width } = useWindowSize();
	useClickAway(wrapperRef, () => {
		setIsOpen(false);
	});

	const toggleOpen = () => setIsOpen((p) => !p);

	return (
		<nav className="px-4 py-6 bg-secondary">
			<div className="container flex flex-wrap items-center justify-between mx-auto sm:flex">
				<Link href="/" passHref className="flex items-center">
					<a className="flex self-center justify-center text-2xl font-semibold text-white sm:block sm:text-4xl whitespace-nowrap">
						YourBooks
					</a>
				</Link>
				<div className="flex justify-center sm:mt-0 md:order-2">
					{authorized ? (
						<>
							{!isOpen && (
								<button
									onClick={toggleOpen}
									className="block px-4 py-2 mr-2 text-sm font-medium text-white rounded-lg bg-primary lg:hidden"
								>
									<Search className="text-white" />
								</button>
							)}
							<AvatarMenu />
						</>
					) : (
						<div className="flex">
							<div className="mr-1 md:mr-5">
								<Button outline onClick={() => router.push('/login')}>
									Login
								</Button>
							</div>
							<div className="ml-1 md:ml-5">
								<Button onClick={() => router.push('/register')}>
									Register
								</Button>
							</div>
						</div>
					)}
				</div>
				{authorized && (
					<div
						ref={wrapperRef}
						className="items-center justify-between hidden lg:flex lg:w-auto lg:order-1 h-[46px]"
					>
						<SearchForm isOpen={isOpen} setIsOpen={setIsOpen} />
					</div>
				)}
			</div>
			{authorized && width < 1024 && (
				<div
					ref={wrapperRef}
					className="container block mx-auto mt-4 lg:hidden"
				>
					<SearchForm mobile isOpen={isOpen} setIsOpen={setIsOpen} />
				</div>
			)}
		</nav>
	);
};

export default Header;
