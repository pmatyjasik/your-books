import React, { useRef } from 'react';
import Button from 'components/Button';
import Link from 'next/link';
import router from 'next/router';
import AvatarMenu from 'components/AvatarMenu';
import SearchForm from 'components/SearchForm';
import Search from 'assets/search.svg';
import { useCloseComponent } from 'hooks/useCloseComponent';

interface HeaderProps {
	authorized: boolean;
}

const Header = ({ authorized }: HeaderProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [openSearch, setOpenSearch] = useCloseComponent(wrapperRef);

	const showSearch = () => {
		setOpenSearch((prev) => !prev);
	};

	return (
		<nav className="px-4 py-6 sm:px-4 bg-secondary">
			<div className="container flex flex-wrap items-center justify-between mx-auto sm:flex">
				<Link href="/" passHref className="flex items-center">
					<a className="flex self-center justify-center text-xl font-semibold text-white sm:block sm:text-4xl whitespace-nowrap">
						YourBooks
					</a>
				</Link>
				<div className="flex justify-center sm:mt-0 md:order-2">
					{!authorized && (
						<div className="flex">
							<div className="mr-1 md:mr-5">
								<Button outline onClick={() => router.push('/login')}>
									Zaloguj się
								</Button>
							</div>
							<div className="ml-1 md:ml-5">
								<Button onClick={() => router.push('/register')}>
									Zarejestruj się
								</Button>
							</div>
						</div>
					)}
					{authorized && (
						<>
							{!openSearch && (
								<button
									onClick={showSearch}
									className="block px-4 py-2 mr-4 text-sm font-medium text-white rounded-lg bg-primary md:hidden"
								>
									<Search className="text-white" />
								</button>
							)}
							<AvatarMenu />
						</>
					)}
				</div>
				{authorized && (
					<div className="items-center justify-between hidden md:flex md:w-auto md:order-1 h-[46px]">
						<form>
							<div className="relative sm:w-[25rem] lg:w-[30rem]">
								<SearchForm />
							</div>
						</form>
					</div>
				)}
			</div>
			{authorized
				? openSearch && (
						<div
							className="container block mx-auto mt-4 md:hidden"
							ref={wrapperRef}
						>
							<form>
								<div className="relative">
									<SearchForm />
								</div>
							</form>
						</div>
				  )
				: null}
		</nav>
	);
};

export default Header;