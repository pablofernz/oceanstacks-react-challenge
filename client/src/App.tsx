import { FrontPage } from './components/frontPage';

// const INITIAL_ORDERS = [
//   {
//     id: 1,
//     products: [{ id: 1, name: "Hamburguesa Clásica", price: 10 }],
//     total: 10,
//     createdAt: new Date(),
//   },
// ];

function App() {
	return (
		<div className="relative min-h-[100svh] w-full overflow-x-hidden text-slate-100">
			<FrontPage />
		</div>
	);
}

export default App;
