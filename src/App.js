import { useState } from 'react'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import 'tachyons'
import './App.css'
import Clarifai from 'clarifai'
import { CLARIFAI_API_KEY } from './api-keys'

function App() {
	const [input, setInput] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [box, setBox] = useState({})

	const onImageSubmit = (event) => {
		event.preventDefault()
		setImageUrl(input)
		const app = new Clarifai.App({
			apiKey: CLARIFAI_API_KEY
		})
		app.models.predict('d02b4508df58432fbb84e800597b8959', input)
			.then(response => {
				console.log(response)
				const totalFaces = response.outputs[0].data.regions.length
				console.log(totalFaces, 'faces detected')

				const faceBox = calculateFaceLocation(response)
				setBox(faceBox)
			})
			.catch(err => {
				console.log(err.toJSON())
			})
	}

	const calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
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
				<FaceRecognition imageUrl={imageUrl} box={box} />
			</div>
		</div>
	);
}

export default App;
