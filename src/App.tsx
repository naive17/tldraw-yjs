import { Tldraw, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev/ws'


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
				// only allow jpegs
				acceptedImageMimeTypes={[]}
				// don't allow any videos
				acceptedVideoMimeTypes={[]}
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
	editor.setCurrentTool('draw')
	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
		</div>
	)
}
