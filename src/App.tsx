import { Tldraw, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'


const roomId = new URLSearchParams(window.location.search).get('whiteboardid') || 'example17'

export default function YjsExample() {
	const store = useYjsStore({
		roomId:roomId,
		hostUrl: HOST_URL,
	})
	return (
		<div className="tldraw__editor">
			<Tldraw
				autoFocus
				store={store}
				components={{
					DebugMenu : EmptyComponent,
					PageMenu : EmptyComponent,
					MainMenu : EmptyComponent,
					SharePanel: NameEditor,
				}}
			/>
		</div>
	)
}

const EmptyComponent = () => {
	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
		</div>
	)
}

const NameEditor = () => {
	const username = new URLSearchParams(window.location.search).get('username') || 'Anonymous'
	const editor = useEditor();
	editor.user.updateUserPreferences({
		name: username,
	})
	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
		</div>
	)
}
