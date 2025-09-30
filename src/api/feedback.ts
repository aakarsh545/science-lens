// Placeholder feedback API used by components in development.
// It forwards the feedback payload to the secure server endpoint so clients don't need service role keys.
export async function updateFeedback(payload: { messageId?: string; helpful?: boolean }) {
	try {
		const resp = await fetch('/api/feedback', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		return resp.json();
	} catch (e) {
		return { success: false, error: String(e) };
	}
}
