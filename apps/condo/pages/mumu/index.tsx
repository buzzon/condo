/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { PageContent, PageHeader, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'
import { Ticket } from '@condo/domains/ticket/utils/clientSchema'
import {
    filtersToQuery,
    getPageIndexFromQuery,
    getSortStringFromQuery,
    sorterToQuery, queryToSorter, getPageSizeFromQuery,
} from '@condo/domains/ticket/utils/helpers'
import { getFiltersFromQuery } from '@condo/domains/common/utils/helpers'
import { IFilters } from '@condo/domains/ticket/utils/helpers'
import { Col, Input, Row, Table, Typography, Checkbox } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import qs from 'qs'
import { pickBy, get, debounce } from 'lodash'
import React, { useCallback, useState } from 'react'
import { EmptyListView } from '@condo/domains/common/components/EmptyListView'
import { useTableColumns } from '@condo/domains/ticket/hooks/useTableColumns'
import { useEmergencySearch } from '@condo/domains/ticket/hooks/useEmergencySearch'
import { useSearch } from '@condo/domains/common/hooks/useSearch'
import { TitleHeaderAction } from '@condo/domains/common/components/HeaderActions'
import { Mumu } from '../../domains/mumu/utils/clientSchema'

interface IPageWithHeaderAction extends React.FC {
    headerAction?: JSX.Element
}

const verticalAlign = css`
    & tbody.ant-table-tbody {
        vertical-align: baseline;
    }
`

const TicketsPage: IPageWithHeaderAction = () => {
    const PageTitleMessage = 'pages.condo.ticket.index.PageTitle'
    const SearchPlaceholder = 'filters.FullSearch'
    const EmptyListLabel = 'ticket.EmptyList.header'
    const EmptyListMessage = 'ticket.EmptyList.title'
    const CreateTicket = 'CreateTicket'
    const EmergencyLabel = 'Emergency'
    const router = useRouter()
    const sortFromQuery = sorterToQuery(queryToSorter(getSortStringFromQuery(router.query)))
    const offsetFromQuery = getPageIndexFromQuery(router.query)
    const filtersFromQuery = getFiltersFromQuery<IFilters>(router.query)
    const pagesizeFromQuey: number = getPageSizeFromQuery(router.query)

    const where = { ...router.query}

    const {
        fetchMore,
        loading,
        count: total,
        objs: tickets,
    } = Mumu.useObjects({
        where
    }, {
        fetchPolicy: 'network-only',
    })


    const [filtersApplied, setFiltersApplied] = useState(false)
    // const tableColumns = useTableColumns(sortFromQuery, filtersFromQuery, setFiltersApplied)
    const tableColumns = [        
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'isWorked',
          dataIndex: 'isWorked',
          key: 'isWorked',
          render: text => <p>{text ? '✔️' :'❌'}</p>,
        }
      ];

    const handleRowAction = useCallback((record) => {
        return {
            onClick: () => {
                router.push(`/mumu/${record.id}/`)
            },
        }
    }, [])

    const handleTableChange = useCallback(debounce((...tableChangeArguments) => {
        const [nextPagination, nextFilters, nextSorter] = tableChangeArguments
        const { current, pageSize } = nextPagination
        const offset = filtersApplied ? 0 : current * pageSize - pageSize
        const sort = sorterToQuery(nextSorter)
        const filters = filtersToQuery(nextFilters)
        setFiltersApplied(false)
        if (!loading) {
            fetchMore({
                // @ts-ignore
                sortBy: sort,
                where: filters,
                skip: offset,
                first: current * pageSize,
            }).then(() => {
                const query = qs.stringify(
                    {
                        ...router.query,
                        sort,
                        offset,
                        filters: JSON.stringify(pickBy({ ...filtersFromQuery, ...nextFilters })),
                    },
                    { arrayFormat: 'comma', skipNulls: true, addQueryPrefix: true },
                )
                router.push(router.route + query)
            })
        }
    }, 400), [loading])

    const [search, handleSearchChange] = useSearch<IFilters>(loading)
    const [emergency, handleEmergencyChange] = useEmergencySearch<IFilters>(loading)

    return (
        <>
            <Head>
                <title>{PageTitleMessage}</title>
            </Head>
            <PageWrapper>
                <OrganizationRequired>
                    <PageHeader title={<Typography.Title style={{ margin: 0 }}>{PageTitleMessage}</Typography.Title>}/>
                    <PageContent>
                        {
                            !tickets.length && !filtersFromQuery
                                ? <EmptyListView
                                    label={EmptyListLabel}
                                    message={EmptyListMessage}
                                    createRoute='/ticket/create'
                                    createLabel={CreateTicket} />
                                : <Row gutter={[0, 40]} align={'middle'}>
                                    <Col span={6}>
                                        <Input
                                            placeholder={SearchPlaceholder}
                                            onChange={(e)=>{handleSearchChange(e.target.value)}}
                                            value={search}
                                        />
                                    </Col>
                                    <Col span={4} offset={1}>
                                        <Checkbox
                                            onChange={handleEmergencyChange}
                                            checked={emergency}
                                            style={{ paddingLeft: '0px', fontSize: '16px' }}
                                        >{EmergencyLabel}</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Table
                                            bordered
                                            css={verticalAlign}
                                            tableLayout={'fixed'}
                                            loading={loading}
                                            dataSource={tickets}
                                            columns={tableColumns}
                                            onRow={handleRowAction}
                                            onChange={handleTableChange}
                                            rowKey={record => record.id}
                                        />
                                    </Col>
                                </Row>
                        }
                    </PageContent>
                </OrganizationRequired>
            </PageWrapper>
        </>
    )
}

TicketsPage.headerAction = <TitleHeaderAction descriptor={{ id: 'menu.ControlRoom' }}/>

export default TicketsPage
