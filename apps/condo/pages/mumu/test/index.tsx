import React, { useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { PageContent, PageHeader, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import { Col, Input, Row, Typography } from 'antd'
import { Button } from '@condo/domains/common/components/Button'
import { useRouter } from 'next/router'
import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import { useState } from 'react'
import { useEffect } from 'react'
import MumuList from '@condo/domains/common/components/test/List'

const { Search } = Input;

export default function index() {
    //useRef
    const inputValue = useRef("")

    const { fetchMore, loading, count: total, objs: mumus, } = Mumu.useObjects({ where: { name_contains: inputValue.current } }, { fetchPolicy: 'network-only', })

    //useCalback
    const handleSearch = async (value) => {
        inputValue.current = value;
        const result = await fetchMore({ where: { name_contains: value } })
    }

    useEffect(() => {
        return () => console.log("render")
    }, [])


    return (
        <>
            <Head>
                <title>Test page</title>
            </Head>
            <PageWrapper>
                <PageHeader title={<Typography.Title style={{ margin: 0 }}>
                    Index {inputValue.current}
                </Typography.Title>} />
                <PageContent>
                    <h1 className="title">
                        Read{' '}
                        <Link href="/mumu/test/post">
                            <a>/mumu/test/post</a>
                        </Link>
                    </h1>
                    <div>
                        <h2>Mumus: </h2>
                        <h3>Search:
                            <Search onSearch={handleSearch} />
                        </h3>
                        {/* {MumuList(mumus)} */}
                        <MumuList list={mumus}>

                        </MumuList>
                    </div>
                </PageContent>
            </PageWrapper>
        </>
    )
}

// function MumuList(dataSource: any[]) {
//     return dataSource.map(mumu =>
//         <h4>
//             <Link href={`${mumu.id}`}>
//                 <a>{mumu.isWorked ? '✔️' : '❌'} {mumu.name}</a>
//             </Link>
//         </h4>
//     )
// }
