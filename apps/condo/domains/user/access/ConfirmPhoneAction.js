/**
 * Generated by `createschema user.ConfirmPhoneAction 'phone:Text;token:Text;smsCode:Integer;smsCodeRequestedAt:DateTimeUtc;smsCodeExpiresAt:DateTimeUtc;retries:Integer;isPhoneVerified:Checkbox;requestedAt:DateTimeUtc;expiresAt:DateTimeUtc;completedAt:DateTimeUtc;'`
 */

async function canReadConfirmPhoneActions ({ authentication: { item: user } }) {
    if (!user) return false
    if (user.isAdmin) return {}
    return false
}

async function canManageConfirmPhoneActions ({ authentication: { item: user }, originalInput, operation, itemId }) {
    if (!user) return false
    if (user.isAdmin) return true
    if (operation === 'create') {
        return false
    } else if (operation === 'update') {
        return false
    }
    return false
}

/*
  Rules are logical functions that used for list access, and may return a boolean (meaning
  all or no items are available) or a set of filters that limit the available items.
*/
module.exports = {
    canReadConfirmPhoneActions,
    canManageConfirmPhoneActions,
}
