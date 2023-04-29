import {SingleValue, MultiValue} from 'react-select'

export type OptionType = {
    label: string
    value: string
}

export type DropdownValueType = SingleValue<OptionType> | MultiValue<OptionType>

export interface IProps {
    label: string
    options: OptionType[]
    value: DropdownValueType
    onChange: (val: any) => void
    disabled?: boolean
    loading?: boolean
    multiselect?:boolean
    clearable?: boolean
    menuPlacement?: 'top' | 'bottom'
    onClick?: () => void
    error?: string
    className?: string
}