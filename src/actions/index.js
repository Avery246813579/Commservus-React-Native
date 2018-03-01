export const UPDATE_REDEEM = 'UPDATE_REDEEM';

export function updateRedeem(credentials) {
    return {
        type: UPDATE_REDEEM,
        payload: credentials
    }
}