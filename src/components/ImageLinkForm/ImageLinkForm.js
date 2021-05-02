import './ImageLinkForm.css'

function ImageLinkForm({ onInputChange, onImageSubmit }) {
	return (
		<form onSubmit={onImageSubmit}>
			<p className="f3"></p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type="text" onChange={onInputChange} />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' type='submit' onClick={onImageSubmit}>Detect</button>
				</div>
			</div>
		</form>
	)
}

export default ImageLinkForm