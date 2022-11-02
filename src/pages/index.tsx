import HeadInformation from 'components/HeadInformation';
import UnAuthorizedPage from 'hoc/UnAuthorized';
import type { NextPage } from 'next';
import search from 'assets/search.png';
import add from 'assets/add.png';
import books from 'assets/books.png';
import note from 'assets/note.png';
import reccomendation from 'assets/reccomendation.png';
import stats from 'assets/stats.png';
import Card from 'components/Card';
import { motion } from 'framer-motion';
import homepage from 'assets/homepage.json';
import Lottie from 'lottie-react';

const Home: NextPage = () => {
	return (
		<>
			<HeadInformation title={'Your Books'} content={'Your Books'} />
			<div className="md:h-[80vh] md:p-4 mb-4 md:mb-0 xl:h-[90vh]">
				<div className="flex flex-col justify-center md:items-center md:flex-row">
					<div className="w-3/4 md:flex md:flex-col">
						<motion.span
							className="text-4xl font-semibold sm:text-5xl text-heading"
							initial={{ y: -200, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							YourBooks
						</motion.span>
						<motion.p
							className="mt-5 text-2xl leading-relaxed sm:leading-loose text-content"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							YourBooks is a web application that allows you to search for books
							in a huge database for free. The application allows you to save
							books, manage them on a Kanban board, add notes and rate books.
						</motion.p>
					</div>
					<motion.div
						className="justify-center hidden w-1/2 md:flex md:justify-center"
						initial={{ opacity: 0.1, scale: 0.1 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<Lottie
							animationData={homepage}
							loop={true}
							className="md:h-96 lg:h-[24rem] xl:h-[35rem]"
						/>
					</motion.div>
				</div>
			</div>
			<div className="flex justify-center p-6 text-white border border-solid rounded-lg shadow-xl bg-secondary border-secondary">
				<motion.div
					initial={{ opacity: 0.8, scale: 0.9, x: 100 }}
					whileInView={{ opacity: 1, scale: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h3 className="p-4 text-xl font-bold text-center md:text-2xl">
						What benefits will you get from joining us?
					</h3>
				</motion.div>
			</div>
			<div className="grid grid-cols-1 gap-4 p-2 mt-6 rounded-lg md:p-10 sm:grid-cols-2 xl:grid-cols-3 ">
				<Card
					src={search}
					title="Search"
					description="Search for books in a huge database"
				/>
				<Card src={add} title="Add" description="Add books to your board" />
				<Card
					src={books}
					title="Books"
					description="Manage the books on your board"
				/>
				<Card
					src={note}
					title="Note"
					description="Add a note for the books you are reading"
				/>
				<Card
					src={reccomendation}
					title="Reccomendation"
					description="Rate the book you have read"
				/>
				<Card
					src={stats}
					title="Statistics"
					description="Control the number of books on your board"
				/>
			</div>
		</>
	);
};

export default UnAuthorizedPage(Home);
