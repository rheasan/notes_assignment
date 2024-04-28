import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NotesContext } from "../utils/contexts";
import Note from "./Note";
import { utils, writeFile } from "xlsx";
const NotesContainer = () => {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const [containerBounds, setContainerBounds] = useState({x: 0, y: 0});
	const containerRef = useRef(null);

	useEffect(() => {
		const target = containerRef.current! as HTMLDivElement;
		setContainerBounds(target.getBoundingClientRect());
	}, []);

	const addNote = (e : React.MouseEvent) => {
		const target = containerRef.current! as HTMLDivElement;
		const {x: targetVX, y: targetVY} = target.getBoundingClientRect();

		const clickVX = e.clientX;
		const clickVY = e.clientY;
		console.log("clicked at", clickVX, clickVY);
		// target.getBoundingClientRect() and MouseEvent.clientX both give the location in viewport coords
		// so we need to subtract them to get proper offset of the click from the top-left corner of NotesContainer
		const newNoteData: Note = {
			text: "",
			posx: clickVX - targetVX,
			posy: clickVY - targetVY
		}
		console.log(newNoteData);
		setNotes((prev) => [...prev, newNoteData]);
	}

	const dist = (x: number, y: number) => {
		return Math.sqrt(x*x + y*y);
	}
	const noteSheetData : NoteSheetData[] = useMemo(
		() => notes.map((note) => {
			const [noteX, noteY] = [note.posx + containerBounds.x, note.posy + containerBounds.y]
			return {
				"Notes": note.text,
				"Distance from left": noteX,
				"Distance from top": noteY,
				"Distance from top-left": dist(noteX, noteY)
			};
		})
	, [notes, containerBounds]);
	
	const convertToXlsx = useCallback(() => {
		const ws = utils.json_to_sheet(noteSheetData)
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, "Notes");
		writeFile(wb, "Notes.xlsx");
	}, [noteSheetData]);

	return (
		<div className="h-3/4 w-3/4 bg-foreground relative overflow-hidden" onDoubleClick={addNote} ref={containerRef}>
			<NotesContext.Provider value={{containerBounds, setNotes}}>
				{
					notes?.map((e,i) => {
						return <Note data={e} key={i} index={i}/>
					})
				}
				<button 
					className="absolute bottom-0 right-0 text-foreground border border-input bg-primary hover:bg-primary/90 inline-flex p-4 font-bold transition-colors"
					onClick={convertToXlsx}
				>
					Export Notes
				</button>
			</NotesContext.Provider>
		</div>
	)
}

export default NotesContainer;