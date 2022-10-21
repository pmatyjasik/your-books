import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	outline?: boolean;
	submit?: boolean;
}

const Button = ({
	children,
	onClick,
	outline = false,
	submit = false,
}: ButtonProps) => {
	return (
		<button
			type={submit ? 'submit' : 'button'}
			onClick={onClick}
			className={`${
				outline
					? 'border-white text-white bg-transparent hover:bg-primary hover:border-primary'
					: 'border-primary text-white bg-primary  hover:bg-transparent hover:border-white'
			} border-solid border font-bold rounded-lg text-xs sm:text-base px-2 sm:px-5 py-2.5 text-center`}
		>
			{children}
		</button>
	);
};

export default Button;
