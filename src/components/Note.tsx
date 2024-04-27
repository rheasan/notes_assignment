const Note = (props: {data: Note}) => {
	const {data} = props;
	const stopDoubleClick = (e : React.MouseEvent) => {
		// double click inside the note should not trigger the event in the container
		e.stopPropagation();
	}
	return (
		<div className="w-fit h-fit p-2 border-black border-2 absolute bg-blue-500 rounded-b" style={{top: data.posy, left: data.posx}}
			onDoubleClick={stopDoubleClick}	
		>
			<textarea className="bg-transparent focus:outline-none min-w-32 min-h-32" />
		</div>
	)
}

export default Note;