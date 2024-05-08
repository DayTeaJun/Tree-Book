export function avgRating(ratingBy: { [key: string]: number }) {
	let sum = 0;
	let avg = 0;
	for (const userId in ratingBy) {
		if (ratingBy.hasOwnProperty(userId)) {
			sum += ratingBy[userId];
			avg = sum / Object.keys(ratingBy).length;
		}
	}
	return avg;
}
