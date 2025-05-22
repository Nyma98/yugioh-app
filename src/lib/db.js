import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

// Fehlermeldung, wenn DB_URI nicht definiert ist
if (!DB_URI) {
  throw new Error("DB_URI is not defined! Bitte prüfe deine .env-Datei.");
}

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db('ygodb') // wählt Datenbank

//Karten aus der Datenbank holen
async function getCards() {
	let cards = [];
	try {
		const collection = db.collection('cards');
		const query = {};
		cards = await collection.find(query).toArray();
		cards.forEach(card => {
			// wandle ObjectId in String um
			card._id = card._id.toString();
		});
	} catch (error) {
		// für Fehlerbehandlung
	}
	return cards;
}
