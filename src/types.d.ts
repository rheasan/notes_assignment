type Note =  {
	text: string,
	posx: number,
	posy: number,
}


type NotesContext = {
	containerBounds: {x: number, y: number},
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}