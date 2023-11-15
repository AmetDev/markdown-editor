'use client'
import { useState } from 'react'
import Markdown from 'react-markdown'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Counter } from './features/UndoRendoUI.jsx'
const ImageUpload = () => {
	const [checker, setCheker] = useState(false)
	const [value, setValue] = useState('')
	const [size, setSize] = useState('')
	const [image, setImage] = useState(null)
	const [images, setImages] = useState([])
	const sizingText = () => {
		setSize('*' + value + '*')
		setCheker(true)
	}
	const MarkedElement = ({ checker, size }) => {
		if (checker == true) {
			return <Markdown>{size}</Markdown>
		} else {
			return <div>{false}</div>
		}
	}
	const handleImageChange = e => {
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.onloadend = () => {
			setImage(reader.result)
			setImages([reader.result, ...images])
		}

		if (file) {
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='flex flex-col'>
			<div>
				<Counter />
				<button onClick={sizingText}>normal text</button>
				<Popup
					trigger={<button className='image-button'></button>}
					position='right center'
				>
					<div>
						<label>
							<input type='file' onChange={handleImageChange} />
						</label>
					</div>
				</Popup>
			</div>
			<input
				onChange={e => setValue(e.target.value)}
				value={value}
				className='h-20'
				type='text'
				placeholder='text'
			/>
			{images.map(el => {
				return <img src={el} alt='Uploaded' style={{ maxWidth: '600px' }} />
			})}
			<MarkedElement checker={checker} size={size} />
		</div>
	)
}

export default ImageUpload
