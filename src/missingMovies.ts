import dotenv from "dotenv";
import { timeLogs, TimeLogsQueue } from "./timeLogs.js";
dotenv.config();

export const missingMovies = async () => {
	const apiKey = process.env.RADARR_API_KEY;
	const apiUrl = process.env.RADARR_URL;

	if (!apiUrl || !apiKey) {
		return;
	}

	const queue = new TimeLogsQueue();

	await fetch(`${apiUrl}/api/v3/command`, {
		method: "POST",
		headers: {
			"X-api-key": apiKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: "MissingMoviesSearch", monitored: true }),
	}).then(() => {
		queue.onqueue(
			timeLogs(
				`running Missing Movies Search`,
				`running Missing Movies Search`,
			),
		);
	});
};

if (import.meta.url === `file://${process.argv[1]}`) {
	missingMovies();
}
