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

                    <h1 className="title">
                        Read{' '}
                        <Link href="/mumu/test">
                            <a>Back to home</a>
                        </Link>
                    </h1>
                </PageContent>
            </PageWrapper>
        </>
    )
}