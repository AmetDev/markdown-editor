'use client'
import { Markup } from 'interweave'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {
	selectCount,
	setImages,
	textValueFunc,
} from './features/UndoRendoSlice.js'
import { Counter } from './features/UndoRendoUI.jsx'

const ImageUpload = () => {
	const { italic, textValue, images } = useSelector(selectCount)
	const [finded, setFinded] = useState('')
	const [selectedText, setSelectedText] = useState('')

	const dispatch = useDispatch()
	const [image, setImage] = useState(null)
	const searchEvent = e => {}

	const RenderAll = () => {
		console.log(textValue)
		return <Markup content={textValue + ''} />
	}
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			dispatch(textValueFunc(textValue + '<br/>'))
			// Выводим значение напрямую вместо добавления его в массив
			console.log('enter')
			// Очищаем поле ввода после нажатия Enter
		}
		if (e.keyCode == 32) {
			// dispatch(textValueFunc(textValue + ' ')) //default add space
			console.log('spacebar')
		}
	}
	const MarkItalics = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<i>' + selectedText + '</i>'
				let newString =
					textValue.substring(0, initium_index) +
					newSubString +
					textValue.substring(finis_index + 1)
				console.log(newString)
				dispatch(textValueFunc(newString))
			} else {
				console.log('substring not found')
			}
		}
	}

	const handleFocus = e => {
		const activeTextarea = document.activeElement
		const selection = activeTextarea.value.substring(
			activeTextarea.selectionStart,
			activeTextarea.selectionEnd
		)
		setSelectedText(selection)
		console.log(selection)
	}

	const wrapWithTag = () => {
		textValue.map(el => {
			console.log(el)
			if (el == selectedText) {
				el = `<h1>${el}</h1>`
			}
		})
	}
	const MarkedElement = ({ italic }) => {
		return <Markup content={italic} />
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
				<Counter />
				<button onClick={() => wrapWithTag()}>Wrap with tag</button>

				<Popup trigger={<button> Normal text</button>} position='bottom center'>
					<div>
						<button>Normal text</button>
						<button>
							<h1>Heading 1</h1>
						</button>
						<button>
							<h2>Heading 2</h2>
						</button>
						<button>
							<h3>Heading 3</h3>
						</button>
					</div>
				</Popup>

				<button onClick={() => MarkItalics()}>
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
				onChange={e => dispatch(textValueFunc(e.target.value))}
				onMouseUp={e => handleFocus(e)}
				// onKeyDown={e => {
				// 	if (e.key === 'Enter') {
				// 		console.log('ENTER')
				// 		dispatch(textValueFunc(textValue.split(/\r\n|\r|\n/g)))
				// 	}
				// }}
				value={textValue}
				onKeyDown={handleKeyPress}
				className='h-50'
				type='text'
				placeholder='text'
			/>
			{images.map(el => {
				return <img src={el} alt='Uploaded' style={{ maxWidth: '600px' }} />
			})}
			<MarkedElement italic={italic} />
			{/* 
			<div dangerouslySetInnerHTML={{ __html: selectedText }} /> */}
			<RenderAll />
		</div>
	)
}

export default ImageUpload
