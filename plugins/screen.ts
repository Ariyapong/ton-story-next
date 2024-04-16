// import { setScreenParams } from '#store/reducers/screen'
import { ScreenPlugin } from '#types/screen-plugin'
import * as rtk from '@reduxjs/toolkit'

export default function (store?: rtk.Store) {
    // const { screenParam } = useSelector((state: RootState) => state.screen)
    // const dispatch = useDispatch()
    const existingElement = document.querySelector('.screen-indicator')
    console.log("debug ::: ", existingElement)
    if (existingElement) {
        return
    }

    let timeout: any = false
    let delay = 250
    let appWrapperElement: any = document.querySelector('#page-view')
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth

    // Create screen-indicator element
    let indicator = document.createElement('div')
    indicator.className = 'screen-indicator'
    document.body.appendChild(indicator)

    // Create a method which returns current device screen
    function getDeviceState() {
        const screenIndicator: any = document.querySelector('.screen-indicator')
        const currentScreen: string = window.getComputedStyle(screenIndicator, ':before').getPropertyValue('content')
        return currentScreen.replace(/\"/g, '')
    }

    let screenSize = getDeviceState()
    let userAgent = navigator.userAgent
    let languages = navigator.languages
    let clientWidth = appWrapperElement.clientWidth
    let clientHeight = appWrapperElement.clientHeight
    let screen: ScreenPlugin = {
        windowHeight,
        windowWidth,
        clientWidth,
        clientHeight,
        screenSize,
        userAgent,
        languages,
    }

    // init app min-height
    appWrapperElement.style.minHeight = `${windowHeight}px`
    appWrapperElement.style.setProperty('--app-height', `${windowHeight}px`)

    // init screen params
    // store.dispatch(setScreenParams(screen))

    window.addEventListener('resize', () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            let screenSize = getDeviceState()
            let userAgent = navigator.userAgent
            let languages = navigator.languages
            let windowWidth = window.innerWidth
            let windowHeight = window.innerHeight
            let clientWidth = appWrapperElement.clientWidth
            let clientHeight = appWrapperElement.clientHeight
            let screen = {
                windowHeight,
                windowWidth,
                clientWidth,
                clientHeight,
                screenSize,
                userAgent,
                languages,
            }

            // update app min-height
            appWrapperElement.style.minHeight = `${windowHeight}px`
            appWrapperElement.style.setProperty('--app-height', `${windowHeight}px`)
            
            // update screen params
            // store.dispatch(setScreenParams(screen))
        }, delay)
    })
}
