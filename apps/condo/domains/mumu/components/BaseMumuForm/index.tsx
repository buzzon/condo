// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Checkbox, Col, Form, Input, Row, Typography} from 'antd'
import { get } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { IMumuFormState } from '@condo/domains/mumu/utils/clientSchema/Mumu'
import { FormWithAction } from '@condo/domains/common/components/containers/FormList'
import { normalizeText } from '@condo/domains/common/utils/text'


interface IMumuFormProps {
    initialValues?: IMumuFormState
    action?: (...args) => void,
    afterActionCompleted?: (mumu: IMumuFormState) => void,
}

export const BaseMumuForm: React.FC<IMumuFormProps>  = (props) => {
    
    const LAYOUT = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const { action: _action, initialValues, organization, afterActionCompleted } = props
    const [selectedPropertyId, setSelectedPropertyId] = useState(get(initialValues, 'property'))
    const selectPropertyIdRef = useRef(selectedPropertyId)

    useEffect(() => {
        selectPropertyIdRef.current = selectedPropertyId
    }, [selectedPropertyId])

    const action = async (variables, ...args) => {
        const { details, ...otherVariables } = variables
        let createdContact
        if (role.canManageContacts && canCreateContactRef.current) {
            createdContact = await createContact(organization.id, selectPropertyIdRef.current, selectedUnitNameRef.current)
        }
        const result = await _action({
            ...otherVariables,
            details: normalizeText(details),
            contact: get(createdContact, 'id') || variables.contact,
        }, ...args)
        await syncModifiedFiles(result.id)
        if (afterActionCompleted) {
            return afterActionCompleted(result)
        }
        return result
    }

    return (
        <>
            <FormWithAction
                {...LAYOUT}
                action={action}
                initialValues={initialValues}
                validateTrigger={['onBlur', 'onSubmit']}
                formValuesToMutationDataPreprocessor={(values) => {
                    values.property = selectPropertyIdRef.current
                    values.unitName = selectedUnitNameRef.current
                    return values
                }}
            >
                {({ handleSave, isLoading, form }) => (
                    <>
                        <Col span={13}>
                            <Row gutter={[0, 40]}>
                                <Col span={24}>
                                    <Row justify={'space-between'} gutter={[0, 15]}>
                                        <Col span={24}>
                                            <Typography.Title level={5} style={{ margin: '0' }}>XXX mumu XXX</Typography.Title>
                                        </Col>
                                    </Row>
                                </Col>
                                <Form.Item name={'source'} hidden>
                                    <Input />
                                </Form.Item>
                            </Row>
                        </Col>
                        {props.children({ handleSave, isLoading, form })}
                    </>
                )}
            </FormWithAction>
        </>
    )
}