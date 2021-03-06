/**
 * Generated by `createschema mumu.Mumu 'name:Text; isWorked?:Checkbox;'`
 */

const { makeLoggedInAdminClient, makeClient, UUID_RE, DATETIME_RE } = require('@core/keystone/test.utils')

const { Mumu, createTestMumu, updateTestMumu } = require('@condo/domains/mumu/utils/testSchema')
const { expectToThrowAccessDeniedErrorToObj, expectToThrowAccessDeniedErrorToObjects } = require('../../common/utils/testSchema')

describe('Mumu', () => {
    test('user: create Mumu', async () => {
        const client = await makeClient()  // TODO(codegen): use truly useful client!

        const [obj, attrs] = await createTestMumu(client)  // TODO(codegen): write 'user: create Mumu' test
        expect(obj.id).toMatch(UUID_RE)
        expect(obj.dv).toEqual(1)
        expect(obj.sender).toEqual(attrs.sender)
        expect(obj.v).toEqual(1)
        expect(obj.newId).toEqual(null)
        expect(obj.deletedAt).toEqual(null)
        expect(obj.createdBy).toEqual(expect.objectContaining({ id: client.user.id }))
        expect(obj.updatedBy).toEqual(expect.objectContaining({ id: client.user.id }))
        expect(obj.createdAt).toMatch(DATETIME_RE)
        expect(obj.updatedAt).toMatch(DATETIME_RE)
    })

    test('anonymous: create Mumu', async () => {
        const client = await makeClient()
        await expectToThrowAccessDeniedErrorToObj(async () => {
            await createTestMumu(client)  // TODO(codegen): check the 'anonymous: create Mumu' test!
        })
    })

    test('user: read Mumu', async () => {
        const admin = await makeLoggedInAdminClient()
        const [obj, attrs] = await createTestMumu(admin)  // TODO(codegen): check create function!

        const client = await makeClient()  // TODO(codegen): use truly useful client!
        const objs = await Mumu.getAll(client, {}, { sortBy: ['updatedAt_DESC'] })

        // TODO(codegen): check 'user: read Mumu' test!
        expect(objs).toHaveLength(1)
        // expect(objs.length >= 1).toBeTruthy()
        expect(objs[0].id).toMatch(obj.id)
        expect(objs[0].dv).toEqual(1)
        expect(objs[0].sender).toEqual(attrs.sender)
        expect(objs[0].v).toEqual(1)
        expect(objs[0].newId).toEqual(null)
        expect(objs[0].deletedAt).toEqual(null)
        expect(objs[0].createdBy).toEqual(expect.objectContaining({ id: admin.user.id }))
        expect(objs[0].updatedBy).toEqual(expect.objectContaining({ id: admin.user.id }))
        expect(objs[0].createdAt).toMatch(obj.createdAt)
        expect(objs[0].updatedAt).toMatch(obj.updatedAt)
    })

    test('anonymous: read Mumu', async () => {
        const client = await makeClient()

        await expectToThrowAccessDeniedErrorToObjects(async () => {
            await Mumu.getAll(client)
})
    })

    test('user: update Mumu', async () => {
        const admin = await makeLoggedInAdminClient()
        const [objCreated] = await createTestMumu(admin)  // TODO(codegen): check create function!

        const client = await makeClient()  // TODO(codegen): use truly useful client!
        const payload = {}  // TODO(codegen): change the 'user: update Mumu' payload
        const [objUpdated, attrs] = await updateTestMumu(client, objCreated.id, payload)

        // TODO(codegen): white checks for 'user: update Mumu' test
        expect(objUpdated.id).toEqual(objCreated.id)
        expect(objUpdated.dv).toEqual(1)
        expect(objUpdated.sender).toEqual(attrs.sender)
        expect(objUpdated.v).toEqual(2)
        expect(objUpdated.newId).toEqual(null)
        expect(objUpdated.deletedAt).toEqual(null)
        expect(objUpdated.createdBy).toEqual(expect.objectContaining({ id: client.user.id }))
        expect(objUpdated.updatedBy).toEqual(expect.objectContaining({ id: client.user.id }))
        expect(objUpdated.createdAt).toMatch(DATETIME_RE)
        expect(objUpdated.updatedAt).toMatch(DATETIME_RE)
        expect(objUpdated.updatedAt).not.toEqual(objUpdated.createdAt)
    })

    test('anonymous: update Mumu', async () => {
        const admin = await makeLoggedInAdminClient()
        const [objCreated] = await createTestMumu(admin)  // TODO(codegen): check create function!

        const client = await makeClient()
        const payload = {}  // TODO(codegen): change the 'anonymous: update Mumu' payload
        await expectToThrowAccessDeniedErrorToObj(async () => {
            await updateTestMumu(client, objCreated.id, payload)
})
    })

    test('user: delete Mumu', async () => {
        const admin = await makeLoggedInAdminClient()
        const [objCreated] = await createTestMumu(admin)  // TODO(codegen): check create function!

        const client = await makeClient()  // TODO(codegen): use truly useful client!
        try {
            // TODO(codegen): check 'user: delete Mumu' test!
            await Mumu.delete(client, objCreated.id)
        } catch (e) {
            expect(e.errors[0]).toMatchObject({
                'message': 'You do not have access to this resource',
                'name': 'AccessDeniedError',
                'path': ['obj'],
            })
            expect(e.data).toEqual({ 'obj': null })
        }
    })

    test('anonymous: delete Mumu', async () => {
        const admin = await makeLoggedInAdminClient()
        const [objCreated] = await createTestMumu(admin)  // TODO(codegen): check create function!

        const client = await makeClient()
        try {
            // TODO(codegen): check 'anonymous: delete Mumu' test!
            await Mumu.delete(client, objCreated.id)
        } catch (e) {
            expect(e.errors[0]).toMatchObject({
                'message': 'You do not have access to this resource',
                'name': 'AccessDeniedError',
                'path': ['obj'],
            })
            expect(e.data).toEqual({ 'obj': null })
        }
    })
})
