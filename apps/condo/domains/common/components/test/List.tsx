import Link from 'next/link'
import React, { useMemo, useRef } from 'react'

export default function MumuList({ children, list }) {

    return (<>
        {
            list.map(mumu =>
                <h4 key={mumu.id}>
                    <Link href={`${mumu.id}`}>
                        <a>{mumu.isWorked ? '✔️' : '❌'} {mumu.name}</a>
                    </Link>
                </h4>
            )
        }
        {children}
    </>
    )
}