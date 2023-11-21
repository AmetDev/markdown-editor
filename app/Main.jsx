'use client'
import { Editor, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import Raw from 'draft-js-raw-content-state'
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
	const rawContentState = new Raw()
	const { italic, textValue, images } = useSelector(selectCount)
	const [finded, setFinded] = useState('')
	const [selectedText, setSelectedText] = useState('')
	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const dispatch = useDispatch()
	const [image, setImage] = useState(null)
	const searchEvent = e => {}

	const handleEditorChange = newEditorState => {
		setEditorState(newEditorState)
		const rawContentState = convertToRaw(newEditorState.getCurrentContent())
		const htmlContent = stateToHTML(rawContentState)
		dispatch(textValueFunc(htmlContent))
	}

	const RenderAll = () => {
		console.log(textValue)
		return <Markup content={textValue} />
	}
	const handleAddHeadingThree = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<h3>' + selectedText + '</h3>'
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
	const handleAddHeadingTwo = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<h2>' + selectedText + '</h2>'
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
	const addStrong = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<b>' + selectedText + '</b>'
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
	const addUnderline = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<u>' + selectedText + '</u>'
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

	const addListNum = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)

		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			console.log('LI!!!', selectedText)

			const newSelectedArr = selectedText.split('<br/>')
			console.log('new arr', newSelectedArr)

			if (initium_index !== -1) {
				// Create an array of React elements
				const elements = newSelectedArr
					.map((el, index) => `<li>${el}</li>`)
					.join('')

				console.log('ELEMENTS', elements)
				// Save JSX elements directly
				const NewString = () => {
					return (
						textValue.substring(0, initium_index) +
						'<ol>' +
						elements +
						'</ol>' +
						textValue.substring(finis_index + 1)
					)
				}
				dispatch(textValueFunc(NewString()))
			} else {
				console.log('substring not found')
			}
		}
	}
	const addList = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)

		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			console.log('LI!!!', selectedText)

			const newSelectedArr = selectedText.split('<br/>')
			console.log('new arr', newSelectedArr)

			if (initium_index !== -1) {
				// Create an array of React elements
				const elements = newSelectedArr
					.map((el, index) => `<li>${el}</li>`)
					.join('')

				console.log('ELEMENTS', elements)
				// Save JSX elements directly
				const NewString = () => {
					return (
						textValue.substring(0, initium_index) +
						'<ul>' +
						elements +
						'</ul>' +
						textValue.substring(finis_index + 1)
					)
				}
				dispatch(textValueFunc(NewString()))
			} else {
				console.log('substring not found')
			}
		}
	}
	let linkHref = ''
	let linkName = ''
	const addLink = e => {
		console.log('addLink', e.target.value)
		linkHref = e.target.value
	}
	const addNameLink = e => {
		console.log('addNameLink', e.target.value)
		linkName = e.target.value
	}

	const addLinkElement = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = `<a href=${linkHref}>` + linkName + '</a>'
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
	const addStrike = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<s>' + selectedText + '</s>'
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
	const handleAddHeadingOne = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<h1>' + selectedText + '</h1>'
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
	const addCenter = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			if (initium_index !== -1) {
				let newSubString = '<center>' + selectedText + '</center>'
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

	const handleDeleteTegs = () => {
		const isExtend = textValue.includes(selectedText)
		console.log(isExtend)
		if (isExtend) {
			let initium_index = textValue.indexOf(selectedText)

			// Adipiscens index verbi finis
			let finis_index = initium_index + selectedText.length - 1

			console.log('firstIndex', initium_index)
			console.log('lastIndex', finis_index)
			const deleteHTMLTegs = word => {
				return word.replace(/<[^>]*>/g, '')
			}
			let newSubString = deleteHTMLTegs(selectedText)
			if (initium_index !== -1) {
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

				<Popup trigger={<button> Normal text</button>} position='bottom center'>
					<div>
						<button onClick={() => handleDeleteTegs()}>Normal text</button>
						<button>
							<h1 onClick={() => handleAddHeadingOne()}>Heading 1</h1>
						</button>
						<button onClick={() => handleAddHeadingTwo()}>
							<h2>Heading 2</h2>
						</button>
						<button onClick={() => handleAddHeadingThree()}>
							<h3>Heading 3</h3>
						</button>
					</div>
				</Popup>
				<Popup trigger={<button> left</button>} position='bottom center'>
					<div>
						<button>left</button>
						<button onClick={() => addCenter()}>center</button>
					</div>
				</Popup>

				<button onClick={() => addStrong()}>
					<b>B</b>
				</button>
				<button onClick={() => MarkItalics()}>
					<i>I</i>
				</button>
				<button onClick={() => addUnderline()}>
					<u>U</u>
				</button>
				<button onClick={() => addStrike()}>
					<s>S</s>
				</button>
				<button onClick={() => addList()}>spisok</button>
				<button onClick={() => addListNum()}>spisokNum</button>
				<Popup trigger={<button>LINK</button>} position='right center'>
					<div>
						<label htmlFor=''>
							<input
								type='text'
								onChange={e => addNameLink(e)}
								placeholder='заголовок ссылки'
							/>
							<input
								onChange={e => addLink(e)}
								type='text'
								placeholder='ссылка'
							/>
							<button onClick={() => addLinkElement()}>+</button>
						</label>
					</div>
				</Popup>
				<Popup
					trigger={<button className='image-button'>image</button>}
					position='right center'
				>
					<div>
						<label>
							<input
								type='file'
								className='image-button'
								onChange={handleImageChange}
							/>
						</label>
					</div>
				</Popup>
			</div>
			<Editor
				editorState={editorState}
				onChange={handleEditorChange}
				placeholder='Enter some text...'
				handleKeyPress={handleKeyPress}
			/>
			{images.map(el => {
				return <img src={el} alt='Uploaded' style={{ maxWidth: '600px' }} />
			})}
			<MarkedElement italic={italic} />
			<RenderAll />
		</div>
	)
}

export default ImageUpload
