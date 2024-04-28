import { useState } from "react";
import { useNotesContext } from "../utils/contexts";

const Note = (props: {data: Note, index: number}) => {
	const {data, index} = props;
	const [text, setText] = useState(data.text);
	// putting draggable attribute on textarea or its parent element breaks the editing
	// if its draggable then clicking inside the textarea does not put the cursor at the clicked position but instead at the last
	// position. so need to dynamically add draggable when Shift key is pressed and remove it after release or after dragEnd
	const [isDragging, setIsDragging] = useState(false);
	const {containerBounds, setNotes} = useNotesContext()!;

	const stopEventPropogation = (e : React.MouseEvent) => {
		// double click inside the note should not trigger the event in the container
		e.stopPropagation();
	}
	const updateNoteState= () => {
		setNotes((prev) => {
			const newNotes = [...prev];
			newNotes[index].text = text;
			return newNotes;
		});
	}

	const handleDragEnd = (e: React.DragEvent) => {
		e.stopPropagation();
		const [newX, newY] = [e.clientX - containerBounds.x, e.clientY - containerBounds.y];
		setIsDragging(false);
		setNotes(prev => {
			const newNotes = [...prev];
			newNotes[index].posx = newX;
			newNotes[index].posy = newY;
			return newNotes;
		});
	}

	return (
		<div 
			className="w-fit h-fit bg-primary border-2 border-black rounded-b p-4 absolute focus:outline-none text-primary-foreground"
			onKeyDown={(e) => {
				if(e.key === "Shift") {
					setIsDragging(true);
				}
			}}
			onKeyUp={() => {
				setIsDragging(false);
			}}
			onDragEnd={handleDragEnd} draggable={isDragging}
			onDrop={stopEventPropogation}
			style={{top: data.posy, left: data.posx}}
			onDoubleClick={stopEventPropogation}
			// required for keyDown
			tabIndex={index + 1}
		>
			<textarea id={`note_${index}`} 
				className="border-black bg-transparent focus:outline-none min-w-32 min-h-32 resize"
				onChange={(e) => {
					const target = e.target as HTMLTextAreaElement;
					setText(target.value);
					updateNoteState();
				}}
				autoFocus
				value={text}
				onClick={() => {
					setIsDragging(false);
				}}
			/>
		</div>
		
	)
}

export default Note;