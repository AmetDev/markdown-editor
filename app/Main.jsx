'use client'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {
	italics,
	selectCount,
	setTextValue,
} from './features/UndoRendoSlice.js'
import { Counter } from './features/UndoRendoUI.jsx'
const ImageUpload = () => {
	const { italic, textValue } = useSelector(selectCount)

	const dispatch = useDispatch()

	const [checker, setCheker] = useState(false)

	const [size, setSize] = useState('')
	const [image, setImage] = useState(null)
	const [images, setImages] = useState([])
	const sizingText = () => {
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
				<button onClick={() => dispatch(italics('*' + textValue + '*'))}>
					normal text
				</button>
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
				onChange={e => dispatch(setTextValue(e.target.value))}
				value={textValue}
				className='h-20'
				type='text'
				placeholder='text'
			/>
			{images.map(el => {
				return <img src={el} alt='Uploaded' style={{ maxWidth: '600px' }} />
			})}
			<MarkedElement checker={checker} size={size} />
			<Counter />
		</div>
	)
}

export default ImageUpload
