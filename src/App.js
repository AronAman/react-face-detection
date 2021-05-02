import { useState } from 'react'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai'
import { CLARIFAI_API_KEY } from './api-keys'
import 'tachyons'
import './App.css'

function App() {
	const [input, setInput] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [boxes, setBoxes] = useState([])

	const onImageSubmit = (event) => {
		event.preventDefault()
		setImageUrl(input)
		const app = new Clarifai.App({
			apiKey: CLARIFAI_API_KEY
		})
		if (input !== imageUrl) {
			app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
				.then(response => {
					// console.log(response)
					const totalFaces = response.outputs[0].data.regions
					console.log(totalFaces.length, 'faces detected')

					setBoxes(
						totalFaces.map(face =>
							calculateFaceLocation(face))
					)
				})
				.catch(err => {
					console.log(err.toJSON())
				})
		}
	}

	const calculateFaceLocation = (data) => {
		const clarifaiFace = data.region_info.bounding_box
		const image = document.getElementById('inputImage')
		const width = Number(image.width)
		const height = Number(image.height)
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	return (
		<div className="App">
			<div>
				<ImageLinkForm onInputChange={e => setInput(e.target.value)} onImageSubmit={onImageSubmit} />
				<FaceRecognition imageUrl={imageUrl} boxes={boxes} />
			</div>
		</div>
	);
}

export default App;
