import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db('ygodb');

// Karten aus der Datenbank holen (bereits vorhanden)
async function getCards() {
	let cards = [];
	try {
		const collection = db.collection('cards');
		const query = {};
		cards = await collection.find(query).toArray();
		cards.forEach(card => {
			card._id = card._id.toString();
		});
	} catch (error) {
		console.error('Fehler beim Laden der Karten:', error);
	}
	return cards;
}

// Alle Lieblingskarten eines Benutzers laden
async function getFavoriteCards(username = 'default') {
	let favorites = [];
	try {
		const collection = db.collection('favorites');
		const query = { username: username };
		const result = await collection.findOne(query);
		if (result && result.cards) {
			favorites = result.cards;
		}
	} catch (error) {
		console.error('Fehler beim Laden der Lieblingskarten:', error);
	}
	return favorites;
}

// Eine Karte zu den Favoriten hinzufügen
async function addFavoriteCard(cardData, username = 'default') {
	try {
		const collection = db.collection('favorites');
		
		// Prüfen ob bereits Favoriten für diesen User existieren
		const existingDoc = await collection.findOne({ username: username });
		
		if (existingDoc) {
			// Prüfen ob Karte bereits in Favoriten ist
			const cardExists = existingDoc.cards.some(card => card.id === cardData.id);
			if (!cardExists) {
				await collection.updateOne(
					{ username: username },
					{ $push: { cards: cardData } }
				);
				return { success: true, message: 'Karte zu Favoriten hinzugefügt!' };
			} else {
				return { success: false, message: 'Karte ist bereits in den Favoriten!' };
			}
		} else {
			// Neues Dokument erstellen
			await collection.insertOne({
				username: username,
				cards: [cardData],
				createdAt: new Date()
			});
			return { success: true, message: 'Karte zu Favoriten hinzugefügt!' };
		}
	} catch (error) {
		console.error('Fehler beim Hinzufügen zur Favoriten:', error);
		return { success: false, message: 'Fehler beim Hinzufügen der Karte!' };
	}
}

// Eine Karte aus den Favoriten entfernen
async function removeFavoriteCard(cardId, username = 'default') {
	try {
		const collection = db.collection('favorites');
		await collection.updateOne(
			{ username: username },
			{ $pull: { cards: { id: parseInt(cardId) } } }
		);
		return { success: true, message: 'Karte aus Favoriten entfernt!' };
	} catch (error) {
		console.error('Fehler beim Entfernen aus Favoriten:', error);
		return { success: false, message: 'Fehler beim Entfernen der Karte!' };
	}
}

// Kommentar zu einer Lieblingskarte hinzufügen
async function addCommentToCard(cardId, comment, username = 'default') {
	try {
		const collection = db.collection('favorites');
		await collection.updateOne(
			{ username: username, "cards.id": parseInt(cardId) },
			{ $set: { "cards.$.comment": comment, "cards.$.commentDate": new Date() } }
		);
		return { success: true, message: 'Kommentar hinzugefügt!' };
	} catch (error) {
		console.error('Fehler beim Hinzufügen des Kommentars:', error);
		return { success: false, message: 'Fehler beim Hinzufügen des Kommentars!' };
	}
}

export { getCards, getFavoriteCards, addFavoriteCard, removeFavoriteCard, addCommentToCard };