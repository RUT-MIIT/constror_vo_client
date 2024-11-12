import styles from './app.module.scss';

export const App = () => {
	return (
		<div className={styles.page}>
			<main className={styles.main}>Test</main>
			<div id='modal-root'></div>
		</div>
	);
};
