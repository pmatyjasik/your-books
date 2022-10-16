import { motion } from 'framer-motion';
import Loader from 'components/Loader';

export default function GlobalLoader() {
	return (
		<motion.div
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8, type: 'tween' }}
			className="fixed top-0 left-0 z-50 w-screen h-screen bg-zinc-100"
		>
			<div className="fixed top-[45%] left-[50%] text-center -translate-x-[50%] -translate-y-[50%]">
				<Loader />
			</div>
		</motion.div>
	);
}
