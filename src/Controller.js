import {
  createContext,
  useState,
  useEffect,
  useMemo
} from 'react'
import useSize from './hooks/use-debounced-window-size'
import useMediaQueries from './hooks/use-media-queries'
import { isMobileOnly } from 'react-device-detect'
import DesktopLayout from './views/landscape/Layout'
import MobileLayout from './views/portrait/Layout'
import { yMultiplier, wheelMultiplier } from './assets/sceneList'
import useWheelY from './hooks/use-wheel-y'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/storage'
import 'firebase/auth'
import firebaseConfig from './firebase.config.js'
import { fbFilenames } from './assets/content'

export const Y = createContext()
export const Images = createContext()
export const Cursor = createContext()
export const ToggleCursor = createContext()


export default function Controller() {
  const size = useSize()
  const { y, scrollTo } = useWheelY(yMultiplier, wheelMultiplier, size)
  const [images, setImages] = useState({})
  const [cursor, toggleCursor] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [instance, setInstance] = useState(null)
  const mQs = {
    or: '(orientation: portrait)',
  }
  const mediaVals = useMediaQueries(mQs)

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
    firebase.auth().onAuthStateChanged(() => {
      setInstance(true)
    })
    return () => firebase.app().delete()
  }, [])

  useEffect(() => {
    if (instance) {
      const storage = firebase.storage().ref()
      Object.keys(fbFilenames).forEach( file => {
        storage.child(`active/${fbFilenames[file]}`).getDownloadURL()
          .then(url => {
            setImages(images => ({...images, [file]:url}))
          })
          .catch(err => alert(err))
      })
    }
  }, [instance])

  const downloads = useMemo(() => Object.keys(images).map(img =>
    <img
      key={img}
      style={{visibility:'hidden'}}
      alt='test'
      src={images[img]}/>
  ), [images])

  return (
    <Y.Provider value={y.percent}>
      <Images.Provider value={images}>
        <Cursor.Provider value={cursor}>
          <ToggleCursor.Provider value={toggleCursor}>
            {(mediaVals.or || isMobileOnly) &&
              <MobileLayout
                scrollTo={scrollTo}
                w={size.width}
                h={size.height}
                showInfo={showInfo}
                setShowInfo={setShowInfo}/>
            }
            {!(mediaVals.or || isMobileOnly) &&
              <DesktopLayout
                scrollTo={scrollTo}
                w={size.width}
                h={size.height}
                showInfo={showInfo}
                setShowInfo={setShowInfo}/>
            }
            {downloads}
          </ToggleCursor.Provider>
        </Cursor.Provider>
      </Images.Provider>
    </Y.Provider>
  )
}
