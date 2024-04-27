import { useNotesContext } from "../utils/contexts";

const Note = (props: {data: Note, index: number}) => {
	const {data, index} = props;
	const {containerBounds, setNotes} = useNotesContext()!;

	const stopDoubleClick = (e : React.MouseEvent) => {
		// double click inside the note should not trigger the event in the container
		e.stopPropagation();
	}
	const handleDragEnd = (e: React.DragEvent) => {
		const [newX, newY] = [e.clientX - containerBounds.x, e.clientY - containerBounds.y];
		setNotes(prev => {
			const newNotes = [...prev];
			newNotes[index].posx = newX;
			newNotes[index].posy = newY;
			return newNotes;
		})
	}

	return (
		<div className="w-fit h-fit p-2 border-black border-2 absolute bg-blue-500 rounded-b" style={{top: data.posy, left: data.posx}}
			onDoubleClick={stopDoubleClick}	draggable onDragEnd={handleDragEnd}
		>
			<textarea className="bg-transparent focus:outline-none min-w-32 min-h-32" />
		</div>
	)
}

export default Note;