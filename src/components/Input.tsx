import React from 'react';

interface InputProps {
	type: React.HTMLInputTypeAttribute;
	value: string | number;
	required?: boolean;
	placeholder?: string;
	error?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({
	type,
	value,
	placeholder,
	required,
	onChange,
	error,
}: InputProps) {
	return (
		<div className="mb-4">
			<input
				type={type}
				value={value}
				required={required}
				placeholder={placeholder}
				onChange={onChange}
				className="block w-full px-4 py-3 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg"
			/>

			<p className="self-center max-w-sm text-sm text-center text-red-300">
				{error}
			</p>
		</div>
	);
}

export default Input;
