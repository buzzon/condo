/**
 * Generated by `createschema billing.BillingIntegration name:Text;`
 */

const { Text, Relationship } = require('@keystonejs/fields')
const { GQLListSchema } = require('@core/keystone/schema')
const { historical, versioned, uuided, tracked, softDeleted } = require('@core/keystone/plugins')
const { SENDER_FIELD, DV_FIELD } = require('@condo/domains/common/schema/fields')
const access = require('@condo/domains/billing/access/BillingIntegration')


const BillingIntegration = new GQLListSchema('BillingIntegration', {
    schemaDoc: 'Identification of the `integration component` which responsible for getting data from the `billing data source` and delivering the data to `this API`. Examples: tap-1c, ... ',
    fields: {
        dv: DV_FIELD,
        sender: SENDER_FIELD,

        name: {
            schemaDoc: 'The name of the `integration component` that the developer remembers',
            type: Text,
            isRequired: true,
        },

        // settings data structure config (settings field for BillingIntegrationOrganizationContext)
        // state data structure config (state field for BillingIntegrationOrganizationContext)
        // log messages translation and adaptation (message field for BillingIntegrationLog)
        accessRights: {
            type: Relationship,
            ref: 'BillingIntegrationAccessRight.integration',
            many: true,
        },
    },
    plugins: [uuided(), versioned(), tracked(), softDeleted(), historical()],
    access: {
        read: access.canReadBillingIntegrations,
        create: access.canManageBillingIntegrations,
        update: access.canManageBillingIntegrations,
        delete: false,
        auth: true,
    },
})

module.exports = {
    BillingIntegration,
}
