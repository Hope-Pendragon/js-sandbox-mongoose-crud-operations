import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={`${styles.container} ${styles.main}`}>
			<Link href={"/api"}>Go to API</Link>
		</div>
	);
}
