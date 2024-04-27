import { useRef, useState } from "react";
import { NotesContext } from "../utils/contexts";
import Note from "./Note";
const NotesContainer = () => {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const containerRef = useRef(null);

	const addNote = (e : React.MouseEvent) => {
		const target = containerRef.current! as HTMLDivElement;
		const {x: targetVX, y: targetVY} = target.getBoundingClientRect();

		const clickVX = e.clientX;
		const clickVY = e.clientY;
		console.log("clicked at", clickVX, clickVY);
		// target.getBoundingClientRect() and MouseEvent.clientX both give the location in viewport coords
		// so we need to subtract them to get proper offset of the click from the top-left corner of NotesContainer
		const newNoteData: Note = {
			text: Math.random().toString(),
			posx: clickVX - targetVX,
			posy: clickVY - targetVY
		}
		console.log(newNoteData);
		setNotes((prev) => [...prev, newNoteData]);
	}
	const getContainerBounds = () => {
		const target = containerRef.current! as HTMLDivElement;
		return target.getBoundingClientRect();
	}

	return (
		<div className="h-3/4 w-3/4 bg-stone-400 relative overflow-hidden" onDoubleClick={addNote} ref={containerRef}>
			<NotesContext.Provider value={{containerBounds: getContainerBounds(), setNotes}}>
				{
					notes?.map((e,i) => {
						return <Note data={e} key={i} index={i}/>
					})
				}
			</NotesContext.Provider>
		</div>
	)
}

export default NotesContainer;