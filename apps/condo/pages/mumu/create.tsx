import { Typography, Row, Col } from 'antd'
import { MumuForm } from '@condo/domains/mumu/components/MumuForm'
import Head from 'next/head'
import React from 'react'
import { PageContent, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'
import { ReturnBackHeaderAction } from '@condo/domains/common/components/HeaderActions'

const CreateMumuPage = () => {
    return (
        <>
            <Head>
                <title>Create mumu</title>
            </Head>
            <PageWrapper>
                <OrganizationRequired>
                    <PageContent>
                        <Row gutter={[0, 40]}>
                            <Col span={24}>
                                <Typography.Title level={1} style={{ margin: 0 }}>Create mumu</Typography.Title>
                            </Col>
                            <MumuForm/>
                        </Row>
                    </PageContent>
                </OrganizationRequired>
            </PageWrapper>
        </>
    )
}

CreateMumuPage.headerAction = <ReturnBackHeaderAction descriptor={{ id: 'menu.AllMumu' }} path={'/mumu/'} />

export default CreateMumuPage
