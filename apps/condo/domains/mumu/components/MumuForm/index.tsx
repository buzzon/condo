import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UpdateMumuForm } from './UpdateMumuForm'
import { CreateMumuForm } from './CreateMumuForm'

interface IMumuFormProps {
    id?: string
}

export const MumuForm: React.FC<IMumuFormProps> = ({ id }) => {
    return ( id ? <UpdateMumuForm id={id}/> : <CreateMumuForm/> )
}
