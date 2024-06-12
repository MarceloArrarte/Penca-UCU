import { filter } from "rxjs"

export const rxjsUtils = {
    notNullish: <T>() => filter((matchData): matchData is T => !!matchData)
}