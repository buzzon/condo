import React from 'react'
import { Col, Input, Row, Typography, Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { PageContent, PageHeader, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'



export default function index() {
    return (
        <>
            <Head>
                <title>Test page</title>
            </Head>
            <PageWrapper>
                <PageHeader title={<Typography.Title style={{ margin: 0 }}>Title</Typography.Title>} />
                <PageContent>
                    <Row>
                        <Col>
                            Read{' '}
                            <Link href="/mumu/test/post">
                                <a>this page!</a>
                            </Link>
                        </Col>
                    </Row>

                    <Row gutter={[0, 40]} align={'middle'}>
                        <Col>
                            <Button type='primary'>
                                Button
                            </Button>
                        </Col>
                    </Row>
                </PageContent>
            </PageWrapper>
        </>
    )
}