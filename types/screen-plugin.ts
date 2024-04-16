export interface ScreenPlugin {
    windowHeight: number
    windowWidth: number
    clientWidth: number
    clientHeight: number
    screenSize: string
    userAgent: string
    languages: readonly string[]
}
