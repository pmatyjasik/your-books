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

const Home: NextPage = () => {
	return (
		<>
			<HeadInformation title={'Your Books'} content={'Your Books'} />
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
