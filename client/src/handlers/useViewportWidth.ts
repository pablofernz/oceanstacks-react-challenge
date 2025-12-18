import { useLayoutEffect, useState } from 'react';

const useViewportWidth = (): number => {
	const [width, setWidth] = useState<number>(0);

	useLayoutEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = (): void => setWidth(window.innerWidth);

			// Set initial width
			handleResize();

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}

		return undefined;
	}, []);
	return width;
};

export default useViewportWidth;
