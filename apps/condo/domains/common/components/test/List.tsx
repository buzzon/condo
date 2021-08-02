import { Mumu } from '@condo/domains/mumu/utils/clientSchema'
import Link from 'next/link'
import React from 'react'

interface IMumuArray {
    data: Array<Mumu.IMumuUIState>;
}


export default function MumuList({ children, list }) {
    //usememo
    console.log("MumuList")
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
    </>
    )
}
