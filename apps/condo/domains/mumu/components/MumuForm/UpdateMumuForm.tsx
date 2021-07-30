import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useOrganization } from '@core/next/organization'
import { Form, Typography, Space } from 'antd'
import { BaseMumuForm } from '../BaseMumuForm'
import { Button } from '@condo/domains/common/components/Button'
import { FormResetButton } from '@condo/domains/common/components/FormResetButton'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import ActionBar from '@condo/domains/common/components/ActionBar'
import { Loader } from '@condo/domains/common/components/Loader'
interface IUpdateMumuForm {
    id: string
}

export const UpdateMumuForm: React.FC<IUpdateMumuForm> = ({ id }) => {

    const ApplyChangesMessage = 'ApplyChanges'

    const { push } = useRouter()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { obj, loading, refetch, error } = Mumu.useObject({ where: { id } })
    
    // no redirect after mutation as we need to wait for mumu files to save
    const action = Mumu.useUpdate({}, () => null)
    const updateAction = (value) => action(value, obj)

    useEffect(() => {
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
        
    if (error || loading) {
        return (
            <>
                {(loading) ? <Loader fill size={'large'}/> : null}
                {(error) ? <Typography.Title>{error}</Typography.Title> : null}
            </>
        )
    }

    return (
        <BaseMumuForm
            action={updateAction}
            initialValues={Mumu.convertToUIFormState(obj)}
            afterActionCompleted={(mumu) => {
                push(`/mumu/${mumu.id}`)
            }}
        >
            {({ handleSave, isLoading }) => {
                return (
                    <Form.Item noStyle dependencies={['property']}>
                        {
                            ({}) => {

                                return (
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
                                    </ActionBar>
                                )
                            }
                        }
                    </Form.Item>
                )
            }}
        </BaseMumuForm>
    )
}
