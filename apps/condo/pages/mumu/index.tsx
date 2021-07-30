// @ts-nocheck
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageContent, PageHeader, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'
import { useState } from 'react'
import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import { notification, Col, Input, Row, Table, Typography, Checkbox } from 'antd'
import { useCallback } from 'react'
import {
    filtersToQuery,
    getPageIndexFromQuery,
    getSortStringFromQuery,
    sorterToQuery, queryToSorter, getPageSizeFromQuery,
} from '@condo/domains/ticket/utils/helpers'
import { getFiltersFromQuery } from '@condo/domains/common/utils/helpers'
import { useTableColumns } from '@condo/domains/ticket/hooks/useTableColumns'
import { EmptyListView } from '@condo/domains/common/components/EmptyListView'
import { TitleHeaderAction } from '@condo/domains/common/components/HeaderActions'



const MumuIndexPage: React.FC = () => {

    const [filtersApplied, setFiltersApplied] = useState(false)
    const router = useRouter()

    const sortFromQuery = sorterToQuery(queryToSorter(getSortStringFromQuery(router.query)))
    const filtersFromQuery = getFiltersFromQuery<IFilters>(router.query)
    const tableColumns = useTableColumns(sortFromQuery, filtersFromQuery, setFiltersApplied)


    const [name, setName] = useState('Mumu')
    const {
        fetchMore,
        loading,
        count: total,
        objs: mumus,
    } = Mumu.useObjects()

    const handleRowAction = useCallback((record) => {
        return {
            onclick: () => {
                router.push(`/mumu/${record.id}/`)
            }
        }
    })


    // TODO(pahaz): remove cdn.jsdelivr.net dependency!
    return <>
        <Head>
            <title>{name}</title>
        </Head>
        <PageWrapper>
            <OrganizationRequired>
            <PageHeader title={<Typography.Title style={{ margin: 0 }}>All {name}s</Typography.Title>}/>
                <PageContent>
                    {
                        !mumus.length
                            ?< EmptyListView
                                label={'Empty ' + name + ' Label'}
                                message={'Empty '+ name +' Message'}
                                createRoute='/mumu/create'
                                createLabel={'Create ' + name + 's'}      
                            />
                            :
                            <Row gutter={[0, 40]} align={'middle'}>
                                <Col span={6}>
                                    <Input
                                        placeholder='SearchPlaceholder'
                                        value='search'
                                    />
                                </Col>
                                <Col span={24}>
                                    <Table
                                        bordered
                                        tableLayout={'fixed'}
                                        dataSource={mumus}
                                        columns={tableColumns}
                                        onRow={handleRowAction}
                                        rowKey={record => record.id}
                                    />
                                    </Col>
                            </Row>
                    }
                    <button onClick={() => setName(prev => prev + 'mu')}>lvl up!</button>
                </PageContent>
            </OrganizationRequired>
        </PageWrapper>
    </>
}

const NoContainer = ({ children }) => children

MumuIndexPage.headerAction = <TitleHeaderAction descriptor={{ id: 'menu.ControlRoom' }}/>

export default MumuIndexPage
