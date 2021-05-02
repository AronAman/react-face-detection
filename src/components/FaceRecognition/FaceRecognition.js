import './FaceRecognition.css'

function FaceRecognition({ imageUrl, boxes }) {
	return (
		<div className='image-box'>
			<div className='absolute'>
				<img src={imageUrl} alt='' width='700px' height='auto' id='inputImage' />
				{boxes.map((box, i) =>
					<div className='bounding-box' key={i} style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
				)}
			</div>
		</div>
	)
}

export default FaceRecognition