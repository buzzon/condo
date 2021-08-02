import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useOrganization } from '@core/next/organization'
import { Form, Typography, Space, Modal } from 'antd'
import { BaseMumuForm } from '../BaseMumuForm'
import { runMutation } from '@condo/domains/common/utils/mutations.utils'
import { Button } from '@condo/domains/common/components/Button'
import { FormResetButton } from '@condo/domains/common/components/FormResetButton'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import ActionBar from '@condo/domains/common/components/ActionBar'
import { Loader } from '@condo/domains/common/components/Loader'
import { useIntl } from '@core/next/intl'

interface IUpdateMumuForm {
    id: string
}

export const UpdateMumuForm: React.FC<IUpdateMumuForm> = ({ id }) => {
    const intl = useIntl()
    const ApplyChangesLabel = intl.formatMessage({ id: 'ApplyChanges' })
    const ApplyChangesMessage = 'ApplyChanges'
    const DeleteLabel = 'Delete'

    const { push } = useRouter()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { refetch, obj: mumu, loading, error } = Mumu.useObject({ where: { id } })

    // no redirect after mutation as we need to wait for mumu files to save
    const action = Mumu.useUpdate({}, () => null)
    const updateAction = (value) => action(value, mumu)

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const softDeleteAction = Mumu.useSoftDelete({}, () => push('/mumu/'))
    const handleCancel = () => setIsConfirmVisible(false)

    const [isConfirmVisible, setIsConfirmVisible] = useState(false)
    const showConfirm = () => setIsConfirmVisible(true)
    const handleOk = () => {
        setIsConfirmVisible(false)
        handleDelete({ item: mumu })
    }

    function handleDelete({ item }) {
        return runMutation(
            {
                action: () => {
                    return softDeleteAction({}, item)
                },
                onError: (e) => {
                    console.log(e)
                    console.log(e.friendlyDescription)
                    throw e
                },
                intl
            },
        )
    }


    if (error || loading) {
        return (
            <>
                {(loading) ? <Loader fill size={'large'} /> : null}
                {(error) ? <Typography.Title>{error}</Typography.Title> : null}
            </>
        )
    }

    return (
        <BaseMumuForm
            action={updateAction}
            initialValues={Mumu.convertToUIFormState(mumu)}
            afterActionCompleted={(mumu) => {
                push(`/mumu/${mumu.id}`)
            }}
        >
            {({ handleSave, isLoading }) => {
                return (
                    <Form.Item noStyle dependencies={['property']}>
                        {
                            ({ }) => {

                                return (
                                    <>
                                        <Modal
                                            title={
                                                <Typography.Title style={{ fontSize: '24px', lineHeight: '32px' }}>
                                                    ConfirmDeleteTitle
                                                </Typography.Title>
                                            }
                                            visible={isConfirmVisible}
                                            onCancel={handleCancel}
                                            footer={[
                                                <Button
                                                    key="submit"
                                                    type='sberDanger'
                                                    onClick={handleOk}
                                                    style={{ margin: '15px' }}
                                                >
                                                    DeletePropertyLabel
                                                </Button>,
                                            ]}
                                        >
                                            <Typography.Text>
                                                ConfirmDeleteMessage
                                            </Typography.Text>
                                        </Modal>
                                        <ActionBar>
                                            <FormResetButton
                                                type='sberPrimary'
                                                secondary
                                            />
                                            <Space size={12}>
                                                <Button
                                                    key='submit'
                                                    onClick={handleSave}
                                                    type='sberPrimary'
                                                    loading={isLoading}
                                                >
                                                    {ApplyChangesMessage}
                                                </Button>
                                            </Space>
                                            <Space size={12}>
                                                <Button
                                                    key='submit'
                                                    onClick={showConfirm}
                                                    type='sberDanger'
                                                    loading={isLoading}
                                                >
                                                    {DeleteLabel}
                                                </Button>
                                            </Space>
                                        </ActionBar>
                                    </>
                                )
                            }
                        }
                    </Form.Item>
                )
            }}
        </BaseMumuForm>
    )
}
