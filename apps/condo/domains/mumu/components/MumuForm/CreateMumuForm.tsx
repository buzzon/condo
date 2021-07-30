import { Form, Space } from 'antd'
import React from 'react'

import { useRouter } from 'next/router'
import { BaseMumuForm } from '../BaseMumuForm'
import { Button } from '@condo/domains/common/components/Button'

import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import ActionBar from '@condo/domains/common/components/ActionBar'

export const CreateMumuForm: React.FC = () => {
    const router = useRouter()

    const action = Mumu.useCreate({},
        () => {
            router.push('/mumu/create')
        })

    return (
        <BaseMumuForm
        action={action}
        >
            {({ handleSave, isLoading }) => {
                return (
                    <Form.Item noStyle dependencies={['property']}>
                        {
                            () => {

                                return (
                                    <ActionBar>
                                        <Space size={12}>
                                            <Button
                                                key='submit'
                                                onClick={handleSave}
                                                type='sberPrimary'
                                                loading={isLoading}
                                            >
                                                'CreateMumuMessage'
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
