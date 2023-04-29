import { IsraelCountryCode, USCountryCode } from "./countryCodes"

const incomeOptions = {
  [USCountryCode]: [
    {label: '<30,000$', value: '<30,000'},
    {label: '30,000$-70,000$', value: '30,000-70,000'},
    {label: '70,000$-100,000$', value: '70,000-100,000'},
    {label: '>100,0000$', value: '>100,0000'},
    {label: 'maybe later', value: 'maybe later'},
  ],
  [IsraelCountryCode]: [
    {label: '<100,0000₪', value: '<30,000'},
    {label: '100,000₪-250,000₪', value: '30,000-70,000'},
    {label: '250,000₪-360,000₪', value: '70,000-100,000'},
    {label: '>360,000₪', value: '>100,000'},
    {label: 'maybe later', value: 'maybe later'},
  ]
}

export {incomeOptions}