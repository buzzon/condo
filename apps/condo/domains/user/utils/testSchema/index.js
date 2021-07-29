/**
 * Generated by `createschema user.User name:Text; password?:Password; isAdmin?:Checkbox; email?:Text; isEmailVerified?:Checkbox; phone?:Text; isPhoneVerified?:Checkbox; avatar?:File; meta:Json; importId:Text;`
 * In most cases you should not change it by hands
 * Please, don't remove `AUTOGENERATE MARKER`s
 */
const faker = require('faker')
const { v4: uuid } = require('uuid')
const { getRandomString, makeClient, makeLoggedInClient, makeLoggedInAdminClient } = require('@core/keystone/test.utils')
const { generateGQLTestUtils } = require('@condo/domains/common/utils/codegeneration/generate.test.utils')

const { User: UserGQL, UserAdmin: UserAdminGQL, REGISTER_NEW_USER_MUTATION } = require('@condo/domains/user/gql')
const { ConfirmPhoneAction: ConfirmPhoneActionGQL } = require('@condo/domains/user/gql')
const { generateSmsCode } = require('@condo/domains/user/utils/serverSchema')
const { ForgotPasswordAction: ForgotPasswordActionGQL } = require('@condo/domains/user/gql')
/* AUTOGENERATE MARKER <IMPORT> */

const User = generateGQLTestUtils(UserGQL)
const UserAdmin = generateGQLTestUtils(UserAdminGQL)

const createTestEmail = () => ('test.' + getRandomString() + '@example.com').toLowerCase()
const createTestPhone = () => '+18170' + String(Math.random()).slice(2).slice(-6)


const {
    SMS_CODE_TTL,
    CONFIRM_PHONE_ACTION_EXPIRY,
} = require('@condo/domains/user/constants/common')

async function createTestUser (client, extraAttrs = {}) {
    if (!client) throw new Error('no client')
    const sender = { dv: 1, fingerprint: 'test-' + faker.random.alphaNumeric(8) }
    const name = faker.name.firstName()
    const email = createTestEmail()
    const phone = createTestPhone()
    const password = getRandomString()
    const meta = {
        dv: 1, city: faker.address.city(), county: faker.address.county(),
    }

    const attrs = {
        dv: 1,
        sender,
        name, email, phone,
        password, meta,
        type: 'staff',
        ...extraAttrs,
    }
    const obj = await User.create(client, attrs)
    return [obj, attrs]
}

async function updateTestUser (client, id, extraAttrs = {}) {
    if (!client) throw new Error('no client')
    if (!id) throw new Error('no id')
    const sender = { dv: 1, fingerprint: faker.random.alphaNumeric(8) }

    const attrs = {
        dv: 1,
        sender,
        ...extraAttrs,
    }
    const obj = await User.update(client, id, attrs)
    return [obj, attrs]
}

async function registerNewUser (client, extraAttrs = {}, { raw = false } = {}) {
    if (!client) throw new Error('no client')
    const sender = { dv: 1, fingerprint: 'test-' + faker.random.alphaNumeric(8) }
    const name = faker.name.firstName()
    const email = createTestEmail()
    const password = getRandomString()
    const phone = createTestPhone()
    const meta = {
        dv: 1, city: faker.address.city(), county: faker.address.county(),
    }
    const attrs = {
        dv: 1,
        sender,
        name,
        email,
        phone,
        password, meta,
        ...extraAttrs,
    }
    const { data, errors } = await client.mutate(REGISTER_NEW_USER_MUTATION, {
        data: attrs,
    })
    if (raw) return { data, errors }
    expect(errors).toEqual(undefined)
    return [data.user, attrs]
}

async function makeClientWithNewRegisteredAndLoggedInUser () {
    const [user, userAttrs] = await registerNewUser(await makeClient())
    const client = await makeLoggedInClient(userAttrs)
    client.user = user
    client.userAttrs = userAttrs
    return client
}

async function makeClientWithSupportUser() {
    const [user, userAttrs] = await registerNewUser(await makeClient())
    const client = await makeLoggedInClient(userAttrs)
    await addSupportAccess(user)
    client.user = user
    client.userAttrs = userAttrs
    return client
}

async function addAdminAccess (user) {
    const admin = await makeLoggedInAdminClient()
    await User.update(admin, user.id, { isAdmin: true })
}

async function addSupportAccess (user) {
    const admin = await makeLoggedInAdminClient()
    await User.update(admin, user.id, { isSupport: true})
}

const ConfirmPhoneAction = generateGQLTestUtils(ConfirmPhoneActionGQL)
const ForgotPasswordAction = generateGQLTestUtils(ForgotPasswordActionGQL)
/* AUTOGENERATE MARKER <CONST> */

async function createTestConfirmPhoneAction (client, extraAttrs = {}) {
    if (!client) throw new Error('no client')
    const sender = { dv: 1, fingerprint: faker.random.alphaNumeric(8) }
    const now = Date.now()
    const attributes = {
        token: uuid(),
        phone: createTestPhone(),
        smsCode: generateSmsCode(),
        smsCodeRequestedAt: new Date(now).toISOString(),
        smsCodeExpiresAt: new Date(now + SMS_CODE_TTL * 1000).toISOString(),
        requestedAt: new Date(now).toISOString(),
        expiresAt: new Date(now + CONFIRM_PHONE_ACTION_EXPIRY * 1000).toISOString(),
    }
    const attrs = {
        dv: 1,
        sender,
        ...attributes,
        ...extraAttrs,
    }
    const obj = await ConfirmPhoneAction.create(client, attrs)
    return [obj, attrs]
}

async function updateTestConfirmPhoneAction (client, id, extraAttrs = {}) {
    if (!client) throw new Error('no client')
    if (!id) throw new Error('no id')
    const sender = { dv: 1, fingerprint: faker.random.alphaNumeric(8) }
    const attrs = {
        dv: 1,
        sender,
        ...extraAttrs,
    }
    const obj = await ConfirmPhoneAction.update(client, id, attrs)
    return [obj, attrs]
}

async function createTestForgotPasswordAction (client, user, extraAttrs = {}) {
    if (!client) throw new Error('no client')
    if (!user || !user.id) throw new Error('no user.id')
    const sender = { dv: 1, fingerprint: faker.random.alphaNumeric(8) }
    const now = Date.now()
    const attrs = {
        dv: 1,
        sender,
        user: { connect: { id: user.id } },
        token: uuid(),
        requestedAt: new Date(now).toISOString(),
        expiresAt: new Date(now + CONFIRM_PHONE_ACTION_EXPIRY * 1000).toISOString(),
        ...extraAttrs,
    }
    const obj = await ForgotPasswordAction.create(client, attrs)

    return [obj, attrs]
}

async function updateTestForgotPasswordAction (client, id, extraAttrs = {}) {
    if (!client) throw new Error('no client')
    if (!id) throw new Error('no id')
    const sender = { dv: 1, fingerprint: faker.random.alphaNumeric(8) }

    const attrs = {
        dv: 1,
        sender,
        ...extraAttrs,
    }
    const obj = await ForgotPasswordAction.update(client, id, attrs)
    return [obj, attrs]
}

/* AUTOGENERATE MARKER <FACTORY> */

module.exports = {
    User, UserAdmin, createTestUser, updateTestUser, registerNewUser, makeLoggedInClient, makeClientWithSupportUser,
    makeClientWithNewRegisteredAndLoggedInUser, addAdminAccess, addSupportAccess, createTestEmail, createTestPhone,
    ConfirmPhoneAction, createTestConfirmPhoneAction, updateTestConfirmPhoneAction,
    ForgotPasswordAction, createTestForgotPasswordAction, updateTestForgotPasswordAction,
/* AUTOGENERATE MARKER <EXPORTS> */
}
