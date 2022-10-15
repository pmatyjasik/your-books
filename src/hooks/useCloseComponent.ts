import React, { useCallback, useEffect, useRef, useState } from 'react';

export function useCloseComponent(ref: React.RefObject<HTMLElement | null>) {
	const [isOpen, setIsOpen] = useState(false);
	const forwaredRef = useRef(ref.current);
	forwaredRef.current = ref.current;

	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				forwaredRef.current &&
				!forwaredRef.current.contains(event.target as Node) &&
				isOpen
			) {
				toggleOpen();
			}
		}

		function handleOnScroll() {
			if (forwaredRef.current && isOpen) {
				toggleOpen();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('scroll', handleOnScroll);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('scroll', handleOnScroll);
		};
	}, [isOpen, toggleOpen]);

	return { isOpen, setIsOpen, toggleOpen };
}
