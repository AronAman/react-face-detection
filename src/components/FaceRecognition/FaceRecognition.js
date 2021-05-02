import './FaceRecognition.css'

function FaceRecognition({ imageUrl, box }) {
	return (
		<div className='image-box'>
			<div className='absolute'>
				<img src={imageUrl} alt='' width='700px' height='auto' id='inputImage' />
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	)
}

export default FaceRecognition