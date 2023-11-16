'use client'
import { Markup } from 'interweave'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {
	italics,
	selectCount,
	setImages,
	textValueFunc,
} from './features/UndoRendoSlice.js'
import { Counter } from './features/UndoRendoUI.jsx'

const ImageUpload = () => {
	const { italic, textValue, images } = useSelector(selectCount)
	const [valueLocal, setValueLocal] = useState('')
	const dispatch = useDispatch()

	const [checker, setCheker] = useState(false)
	const [image, setImage] = useState(null)
	const searchEvenet = value => {
		setValueLocal(value)
		dispatch(textValueFunc(valueLocal))
		setCheker(true)
	}

	const [selectedText, setSelectedText] = useState('')

	const handleFocus = e => {
		const activeTextarea = document.activeElement
		const selection = activeTextarea.value.substring(
			activeTextarea.selectionStart,
			activeTextarea.selectionEnd
		)
		console.log(selection)
		setSelectedText(selection)
	}

	const wrapWithTag = () => {
		setSelectedText(`<h1>${selectedText}</h1>`)
	}
	const MarkedElement = ({ checker, italic }) => {
		if (checker == true) {
			return <Markup content={italic} />
		} else {
			return <div>{false}</div>
		}
	}
	const handleImageChange = e => {
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.onloadend = () => {
			setImage(reader.result)
			dispatch(setImages([reader.result, ...images]))
		}

		if (file) {
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='flex flex-col'>
			<div>
				<button onClick={() => wrapWithTag()}>Wrap with tag</button>

				<button onClick={() => dispatch(italics('<h1>' + textValue + '</h1>'))}>
					Normal Text
				</button>
				<button
					onClick={() =>
						dispatch(italics('<p>' + '<i>' + textValue + '<i>' + '</p>'))
					}
				>
					<i>I</i>
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
			<textarea
				onChange={e => searchEvenet(e.target.value)}
				onMouseUp={e => handleFocus(e)}
				value={valueLocal}
				className='h-20'
				type='text'
				placeholder='text'
			/>
			{images.map(el => {
				return <img src={el} alt='Uploaded' style={{ maxWidth: '600px' }} />
			})}
			<MarkedElement checker={checker} italic={italic} />
			<Counter />
			<div dangerouslySetInnerHTML={{ __html: selectedText }} />
		</div>
	)
}

export default ImageUpload
