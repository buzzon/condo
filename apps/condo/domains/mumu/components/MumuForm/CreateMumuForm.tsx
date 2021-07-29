import { Form, Space } from 'antd'
import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useOrganization } from '@core/next/organization'
import { useRouter } from 'next/router'
import { useAuth } from '@core/next/auth'
import { useIntl } from '@core/next/intl'
import { BaseMumuForm } from '../BaseMumuForm'
import { Button } from '@condo/domains/common/components/Button'
import { ErrorsContainer } from '../BaseMumuForm/ErrorsContainer'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import ActionBar from '@condo/domains/common/components/ActionBar'

export const CreateMumuForm: React.FC = () => {
    const intl = useIntl()
    const CreateMumuMessage = intl.formatMessage({ id: 'CreateMumu' })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { organization } = useOrganization()
    const router = useRouter()
    // TODO(Dimitreee):remove after typo inject
    const auth = useAuth() as { user: { id: string } }

    const action = Mumu.useCreate({},
        () => {
            router.push('/ticket/')
        })

    const initialValues = {
        assignee: auth.user.id,
        executor: auth.user.id,
    }

    return (
        <BaseMumuForm>
            {({ handleSave, isLoading }) => {
                return (
                    <Form.Item noStyle dependencies={['property']}>
                        {
                            ({ getFieldsValue }) => {
                                const { property } = getFieldsValue(['property'])

                                return (
                                    <ActionBar>
                                        <Space size={12}>
                                            <Button
                                                key='submit'
                                                onClick={handleSave}
                                                type='sberPrimary'
                                                loading={isLoading}
                                                disabled={!property}
                                            >
                                                {CreateMumuMessage}
                                            </Button>
                                            <ErrorsContainer property={property}/>
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
