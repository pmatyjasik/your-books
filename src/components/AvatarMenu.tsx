import React, { useRef, useState } from 'react';
import AvatarMenuItemu from 'components/AvatarMenuItem';
import router from 'next/router';
import { handleLougout } from '../firebase/firebase';
import { useClickAway } from 'react-use';
import {
	BsFillArrowDownCircleFill,
	BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { motion } from 'framer-motion';

const AvatarMenu = () => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	useClickAway(wrapperRef, () => {
		setIsOpen(false);
	});

	const toggleOpen = () => setIsOpen((p) => !p);

	return (
		<div ref={wrapperRef} className="relative" onClick={toggleOpen}>
			{
				<div className="relative inline-flex items-center justify-center p-4 overflow-hidden bg-gray-600 rounded-lg">
					<p className="flex items-center text-lg font-medium text-white">
						{isOpen ? (
							<BsFillArrowUpCircleFill className="w-5 h-5" />
						) : (
							<BsFillArrowDownCircleFill className="w-5 h-5" />
						)}
					</p>
				</div>
			}
			{isOpen && (
				<motion.div
					className="absolute right-0 z-10 mt-4 origin-top-right rounded-md shadow-lg w-max md:w-40 bg-main"
					initial={{ opacity: 0.8, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.1 }}
				>
					<div className="py-1 bg-gray-700 border border-gray-600 rounded-lg">
						<AvatarMenuItemu onClick={() => router.push('/profile')}>
							Profile
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/books')}>
							Books
						</AvatarMenuItemu>
						<AvatarMenuItemu onClick={() => router.push('/account')}>
							Account
						</AvatarMenuItemu>
						<AvatarMenuItemu logout={true} onClick={handleLougout}>
							Logout
						</AvatarMenuItemu>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default AvatarMenu;
