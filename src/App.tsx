import NotesContainer from './components/NotesContainer';
import { Toaster } from './components/ui/toaster';
import { useToast } from './components/ui/use-toast';

const HelpIcon = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
		<path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
		</svg>
	)
}

function App() {
	const { toast } = useToast();

	const showHelp = () => {
		toast({
			title: "Help",
			description: <>
				<ul>
					<li>Double click on the notes area to add a note.</li>
					<li>Hold Shift to drag the notes.</li>
				</ul>
			</>
		})
	}

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-around bg-background dark">
			<div className="w-full text-white p-0 flex justify-end">
				<button className="border border-input bg-primary shadow-sm hover:bg-primary/90 rounded inline-flex p-4 font-bold mx-8 transition-colors"
					onClick={showHelp}	
				>
					Help&nbsp;<HelpIcon />
				</button>
			</div>
			<NotesContainer />
			<div className="w-full">
				<p>Download</p>
			</div>
			<Toaster />
		</div>
	)
}

export default App
