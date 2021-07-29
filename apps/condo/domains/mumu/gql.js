/**
 * Generated by `createschema mumu.Mumu 'name:Text; isWorked?:Checkbox;'`
 * In most cases you should not change it by hands
 * Please, don't remove `AUTOGENERATE MARKER`s
 */

const { generateGqlQueries } = require('@condo/domains/common/utils/codegeneration/generate.gql')

const gql = require('graphql-tag')

const COMMON_FIELDS = 'id dv sender v deletedAt newId createdBy { id name } updatedBy { id name } createdAt updatedAt'

const MUMU_FIELDS = `{ name isWorked ${COMMON_FIELDS} }`
const Mumu = generateGqlQueries('Mumu', MUMU_FIELDS)

/* AUTOGENERATE MARKER <CONST> */

module.exports = {
    Mumu,
/* AUTOGENERATE MARKER <EXPORTS> */
}
