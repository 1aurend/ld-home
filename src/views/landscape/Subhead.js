/** @jsxImportSource theme-ui */
import {
  useContext,
  useRef,
  useEffect,
  useState
} from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../Controller'
import Letter from './Letter'
import scenes from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'
import useSize from '../../hooks/use-debounced-window-size'
