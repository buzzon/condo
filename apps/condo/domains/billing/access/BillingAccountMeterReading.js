/**
 * Generated by `createschema billing.BillingAccountMeterReading 'context:Relationship:BillingIntegrationOrganizationContext:CASCADE; importId?:Text; property:Relationship:BillingProperty:CASCADE; account:Relationship:BillingAccount:CASCADE; meter:Relationship:BillingAccountMeter:CASCADE; period:CalendarDay; value1:Integer; value2:Integer; value3:Integer; date:DateTimeUtc; raw:Json; meta:Json' --force`
 */

const { canManageBillingEntityWithContext, canReadBillingEntity } = require('@condo/domains/billing/utils/accessSchema')

async function canReadBillingAccountMeterReadings ({ authentication: { item: user } }) {
    return await canReadBillingEntity(user)
}

async function canManageBillingAccountMeterReadings ({ authentication: { item: user }, operation, originalInput, itemId, listKey }) {
    return await canManageBillingEntityWithContext({
        user,
        operation,
        itemId,
        originalInput,
        schemaWithContextName: listKey,
    })
}

/*
  Rules are logical functions that used for list access, and may return a boolean (meaning
  all or no items are available) or a set of filters that limit the available items.
*/
module.exports = {
    canReadBillingAccountMeterReadings,
    canManageBillingAccountMeterReadings,
}
