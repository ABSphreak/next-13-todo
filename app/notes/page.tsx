import Link from 'next/link';
import PocketBase from 'pocketbase';
import CreateNote from './CreateNote';
import styles from './notes.module.css';

async function getNotes() {
	// const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', {
	// 	cache: 'no-store',
	// });
	// const data = await res.json();

	const db = new PocketBase('http://127.0.0.1:8090');
	const data = await db.records.getList('notes');

	console.log({ data });

	return data?.items as any[];
}

export default async function NotesPage() {
	const notes = await getNotes();

	console.log({ notes });

	return (
		<div>
			<h1>Notes</h1>
			<div className={styles.grid}>
				{notes?.map(note => {
					return <Note key={note.id} note={note} />;
				})}
			</div>

			<CreateNote />
		</div>
	);
}

function Note({ note }: any) {
	const { id, title, content, created } = note || {};

	return (
		<Link href={`/notes/${id}`}>
			<div className={styles.note}>
				<h2>{title}</h2>
				<h5>{content}</h5>
				<p>{created}</p>
			</div>
		</Link>
	);
}
