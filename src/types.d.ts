type Note =  {
	text: string,
	posx: number,
	posy: number,
}


type NotesContext = {
	containerBounds: {x: number, y: number},
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

type NoteSheetData = {
	"Notes": string,
	"Distance from top": number,
	"Distance from left": number,
	"Distance from top-left": number 
}