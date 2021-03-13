import {
  createContext,
  useState,
  useEffect
} from 'react'
import useSize from './hooks/use-debounced-window-size'
import Layout from './views/Layout'
import { yMultiplier, wheelMultiplier } from './assets/sceneList'
import useWheelY from './hooks/use-wheel-y'
import firebase from 'firebase'
import firebaseConfig from './firebase.config.js'
import { fbFilenames } from './assets/content'

export const Y = createContext()
export const Images = createContext()


export default function Controller() {
  const size = useSize()
  const { y, scrollTo } = useWheelY(yMultiplier, wheelMultiplier, size)
  const [images, setImages] = useState({})
  const [instance, setInstance] = useState(null)

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
        storage.child(fbFilenames[file]).getDownloadURL()
          .then(url => setImages(images => ({...images, [file]:url})))
          .catch(err => alert(err))
      })
    }
  }, [instance])

  return (
    <Y.Provider value={y.percent}>
      <Images.Provider value={images}>
        <Layout scrollTo={scrollTo} w={size.width} h={size.height} />
      </Images.Provider>
    </Y.Provider>
  )
}
