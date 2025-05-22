import { getFavoriteCards, addFavoriteCard, removeFavoriteCard, addCommentToCard } from '$lib/db.js';
import { fail } from '@sveltejs/kit';

// Daten laden (load-Funktion)
export async function load() {
	try {
		const favoriteCards = await getFavoriteCards('default');
		return {
			favoriteCards: favoriteCards
		};
	} catch (error) {
		console.error('Fehler beim Laden der Favoriten:', error);
		return {
			favoriteCards: []
		};
	}
}

// Form Actions
export const actions = {
	// Karte zu Favoriten hinzufügen
	addFavorite: async ({ request }) => {
		const data = await request.formData();
		
		const cardData = {
			id: parseInt(data.get('cardId')),
			name: data.get('cardName'),
			type: data.get('cardType'),
			image_url: data.get('cardImage'),
			atk: data.get('cardAtk') || null,
			def: data.get('cardDef') || null,
			desc: data.get('cardDesc'),
			addedDate: new Date()
		};

		const result = await addFavoriteCard(cardData, 'default');
		
		if (result.success) {
			return {
				type: 'success',
				message: result.message
			};
		} else {
			return fail(400, {
				type: 'error',
				message: result.message
			});
		}
	},

	// Karte aus Favoriten entfernen
	removeFavorite: async ({ request }) => {
		const data = await request.formData();
		const cardId = data.get('cardId');

		const result = await removeFavoriteCard(cardId, 'default');
		
		if (result.success) {
			return {
				type: 'success',
				message: result.message
			};
		} else {
			return fail(400, {
				type: 'error',
				message: result.message
			});
		}
	},

	// Kommentar hinzufügen
	addComment: async ({ request }) => {
		const data = await request.formData();
		const cardId = data.get('cardId');
		const comment = data.get('comment');

		if (!comment || comment.trim() === '') {
			return fail(400, {
				type: 'error',
				message: 'Bitte gib einen Kommentar ein!'
			});
		}

		const result = await addCommentToCard(cardId, comment.trim(), 'default');
		
		if (result.success) {
			return {
				type: 'success',
				message: result.message
			};
		} else {
			return fail(400, {
				type: 'error',
				message: result.message
			});
		}
	}
};