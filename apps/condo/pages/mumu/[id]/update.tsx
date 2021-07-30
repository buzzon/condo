import { Typography, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import { useIntl } from '@core/next/intl'
import { PageContent, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'
import { MumuForm } from '@condo/domains/mumu/components/MumuForm'
import { ReturnBackHeaderAction } from '@condo/domains/common/components/HeaderActions'

const MumuUpdatePage = () => {
    const intl = useIntl()
    const PageTitleMsg = intl.formatMessage({ id:'pages.condo.mumu.index.EditMumuModalTitle' })

    const { query } = useRouter()

    return (
        <>
            <Head>
                <title>{PageTitleMsg}</title>
            </Head>
            <PageWrapper>
                <OrganizationRequired>
                    <PageContent>
                        <Row gutter={[0, 40]} style={{ height: '100%' }}>
                            <Col span={24}>
                                <Typography.Title level={1} style={{ margin: 0 }}>{PageTitleMsg}</Typography.Title>
                            </Col>
                            <MumuForm id={query.id as string}/>
                        </Row>
                    </PageContent>
                </OrganizationRequired>
            </PageWrapper>
        </>
    )
}

MumuUpdatePage.headerAction = <ReturnBackHeaderAction
    descriptor={{ id: 'Back' }}
    path={(id) => `/mumu/${id}/`}/>

export default MumuUpdatePage
