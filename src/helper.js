export function getCardCount(roundNumber, max) {
    if (roundNumber > max) {
        return max - (roundNumber % max);
    } else {
        return roundNumber;
    };
};