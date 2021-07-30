// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Checkbox, Col, Form, Input, Row, Typography} from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { IMumuFormState } from '@condo/domains/mumu/utils/clientSchema/Mumu'
import { FormWithAction } from '@condo/domains/common/components/containers/FormList'
import { normalizeText } from '@condo/domains/common/utils/text'


const LAYOUT = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

interface IMumuFormProps {
    initialValues?: IMumuFormState
    action?: (...args) => void,
    afterActionCompleted?: (mumu: IMumuFormState) => void,
}

export const BaseMumuForm: React.FC<IMumuFormProps>  = (props) => {
    
    // const [selectedPropertyId, setSelectedPropertyId] = useState(get(initialValues, 'property'))
    // const { loading, obj: property } = useObject({ where: { id: selectedPropertyId ? selectedPropertyId : null } })


    const { action: _action, initialValues, afterActionCompleted } = props
    console.log(initialValues);

    const action = async (variables, ...args) => {
        const { details, ...otherVariables } = variables
        const result = await _action({
            ...otherVariables,
            details: normalizeText(details),
        }, ...args)
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
                                        <Col span={24}>
                                            <Form.Item name={'name'} label={'NameLabel'}>
                                                <Input
                                                    autoFocus={true}
                                                    placeholder={'NamePlaceholder'}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name={'isWorked'} label={' '} valuePropName='checked'>
                                                <Checkbox>isWorked</Checkbox>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        {props.children({ handleSave, isLoading, form })}
                    </>
                )}
            </FormWithAction>
        </>
    )
}