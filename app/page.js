'use client'
import { Provider } from 'react-redux'
import ImageUpload from './Main.jsx'
import { store } from './store/store.js'
const Page = () => {
	return (
		<Provider store={store}>
			<ImageUpload />
		</Provider>
	)
}

export default Page
