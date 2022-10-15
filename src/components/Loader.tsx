import React from 'react';
import { SpinnerCircular } from 'spinners-react';

const Loader = () => {
	return (
		<div className="flex h-screen">
			<div className="m-auto">
				<SpinnerCircular
					size={270}
					thickness={180}
					speed={270}
					color="#355FE5"
					secondaryColor="#111827"
				/>
			</div>
		</div>
	);
};

export default Loader;
