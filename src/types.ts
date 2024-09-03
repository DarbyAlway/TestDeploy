export interface Country {
  id: number
  name: string
  code: string
  squareFlag: string
  fullFlag: string
  sports: Sports[]
}

export interface Sports {
  name: string
  total: number
  bronze: number
  silver: number
  gold: number
}

export interface MessageState {
  message: string
}

export interface CountryState {
  country: Country | null
}
