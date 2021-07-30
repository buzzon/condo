/* eslint-disable @typescript-eslint/no-empty-function */
import { Col, Row, Space, Typography, Tag, Checkbox } from 'antd'
import UploadList from 'antd/lib/upload/UploadList/index'
import { get, isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { EditFilled, FilePdfFilled } from '@ant-design/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useIntl } from '@core/next/intl'
import styled from '@emotion/styled'
import { Button } from '@condo/domains/common/components/Button'
import { PageContent, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import LoadingOrErrorPage from '@condo/domains/common/components/containers/LoadingOrErrorPage'
import { Mumu, } from '@condo/domains/mumu/utils/clientSchema'
import Link from 'next/link'
import { FocusContainer } from '@condo/domains/common/components/FocusContainer'
import { LETTERS_AND_NUMBERS } from '@condo/domains/common/constants/regexps'
import { UserNameField } from '@condo/domains/user/components/UserNameField'
import { UploadFileStatus } from 'antd/lib/upload/interface'
// @ts-ignore
import { MumuChanges } from '@condo/domains/mumu/components/MumuChanges'
import ActionBar from '@condo/domains/common/components/ActionBar'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'
import { Comments } from '@condo/domains/common/components/Comments'
import { useAuth } from '@core/next/auth'
import { useOrganization } from '@core/next/organization'
import { ReturnBackHeaderAction } from '@condo/domains/common/components/HeaderActions'

// TODO(Dimitreee):move to global defs
interface IUser {
    name?: string
    id?: string
    phone?: string
}

interface IMumuDescriptionFieldProps {
    title?: string
    value?: React.ReactNode
    type?: 'secondary' | 'success' | 'warning' | 'danger'
}

const MumuDescriptionField: React.FC<IMumuDescriptionFieldProps> = ({ title, value, type }) => {
    const intl = useIntl()
    const NotDefinedMessage =   'errors.NotDefined'

    return (
        <Space
            direction={'vertical'}
            size={8}
            style={{ maxWidth: '100%' }}
        >
            <Typography.Text type={'secondary'}>{title}</Typography.Text>
            <Typography.Text {...{ type }} style={{ fontSize: '16px' }}>{value || NotDefinedMessage}</Typography.Text>
        </Space>
    )
}

const MumuTag = styled(Tag)`
  font-size: 16px;
  line-height: 24px;
`

const MumuIdPage = () => {
    const ServerErrorMessage =   'ServerError'
    const UpdateMessage =   'Edit' 
    const PrintMessage =   'Print '
    const MumuInfoMessage =   'Problem'
    const ClientInfoMessage =   'pages.condo.mumu.title.MumuInfo'
    const AddressMessage =   'field.Address'
    const FullNameShortMessage =   'field.FullName.short'
    const SourceMessage =   'pages.condo.mumu.field.Source'
    const ExecutorMessage =   'field.Executor'
    const ClassifierMessage =   'Classifier'
    const AssigneeMessage =   'field.Responsible'
    const MumuAuthorMessage =   'Author'
    const EmergencyMessage =   'Emergency'
    const ShortFlatNumber =   'field.ShortFlatNumber'
    const SectionName =   'pages.condo.property.section.Name'
    const FloorName =   'pages.condo.property.floor.Name'
    const PaidMessage =   'Paid'

    const router = useRouter()

    // NOTE: cast `string | string[]` to `string`
    const { query: { id } } = router as { query: { [key: string]: string } }

    const { refetch: refetchMumu, loading, obj: mumu, error } = Mumu.useObject({
        where: { id },
    }, {
        fetchPolicy: 'network-only',
    })

    if (!mumu) {
        return (
            <LoadingOrErrorPage title={'MumuTitleMessage'} loading={loading} error={error ? ServerErrorMessage : null}/>
        )
    }

    const handleMumuStatusChanged = () => {
        refetchMumu()
    }

    return (
        <>
            <Head>
                <title>'MumuTitleMessage'</title>
            </Head>
            <PageWrapper>
                <OrganizationRequired>
                    <PageContent>
                        <Row gutter={[0, 40]}>
                            <Col span={16}>
                                <Row gutter={[0, 40]}>
                                    <Col span={24}>
                                        <Row align={'top'}>
                                            <Space size={8} direction={'vertical'}>
                                                <Space align={'center'}>
                                                    <Typography.Title level={1} style={{ margin: 0 }}>'MumuTitleMessage'</Typography.Title>
                                                </Space>
                                            </Space>
                                        </Row>
                                    </Col>
                                    <Col push={2} span={11}>
                                        <Row>
                                            <Col span={12}>
                                                <Space direction={'horizontal'} size={8} style={{ maxWidth: '100%' }}>
                                                    <Typography.Text type={'secondary'}>name: </Typography.Text>
                                                    <Typography.Text style={{ fontSize: '16px' }}>{mumu.name}</Typography.Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction={'horizontal'} size={8} style={{ maxWidth: '100%' }}>
                                                    <Checkbox disabled={true} checked={mumu.isWorked}>isWorked: </Checkbox>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <ActionBar>
                                        <Link href={`/mumu/${mumu.id}/update`}>
                                            <Button
                                                color={'green'}
                                                type={'sberPrimary'}
                                                secondary
                                                icon={<EditFilled />}
                                            >
                                                {UpdateMessage}
                                            </Button>
                                        </Link>
                                    </ActionBar>
                                </Row>
                            </Col>
                            <Col span={1}>
                            </Col>
                        </Row>
                    </PageContent>
                </OrganizationRequired>
            </PageWrapper>
        </>
    )
}

MumuIdPage.headerAction = <ReturnBackHeaderAction descriptor={{ id: 'menu.AllMumus' }} path={'/mumu/'}/>

export default MumuIdPage
