import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('es-AR', {
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hour12: false,
});

export function MiniClock() {
	const [time, setTime] = useState(() => formatter.format(new Date()));

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(formatter.format(new Date()));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return time;
}
