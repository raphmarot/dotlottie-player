import type { AnimationDirection } from 'lottie-web'
import type { CSSProperties, RefObject } from 'react'
import type { DotLottiePlayer } from '.'
import type { PlayMode } from './utils'

export interface LottieAsset {
  /** Whether the data is encoded or not */
  e: 0 | 1
  /** Name of asset – e.g. image_0 / audio_0 */
  id: string
  /** Filename – e.g image_0.png / audio_0.mp3 | DataURL, Base64 encoded */
  p: string
  u: string
}

export interface ImageAsset extends LottieAsset {
  /** Height of image in pixels */
  h: number
  layers?: unknown[]
  /** Width of image in pixels */
  w: number
}

export interface LottieJSON {
  assets?: LottieAsset[]
  ddd: number
  /** Frames per second, natively */
  fr: number
  /** Height of animation in pixels */
  h: number
  ip: number
  layers: unknown[]
  markers: unknown[]
  meta: {
    a: string
    d: string
    /** Generator */
    g: string
    k: string
    tc: string
  }
  /** Name of animation, from rendering */
  nm: string
  /** Total number of frames */
  op: number
  /** Version */
  v: string
  /** Width of animation in pixels */
  w: number
}

export interface Config {
  id: string
  url: string
  autoplay?: Autoplay
  loop?: Loop
  direction?: AnimationDirection
  mode?: PlayMode
  speed?: number
}

export type Animations = Omit<Config, 'url'>[]

export interface LottieManifest {
  animations: Animations
  author?: string
  description?: string
  generator?: string
  keywords?: string
  version?: string
}

export type Autoplay = boolean | '' | 'autoplay' | null
export type Controls = boolean | '' | 'controls' | null
export type Loop = boolean | '' | 'loop' | null
export type Subframe = boolean | '' | null

export type ObjectFit = 'contain' | 'cover' | 'fill' | 'scale-down' | 'none'

export type PreserveAspectRatio = 'xMidYMid meet' | 'xMidYMid slice' | 'xMinYMin slice' | 'none'

type JSXLottiePlayer = Omit<Partial<DotLottiePlayer>, 'style'> & {
  class?: string
  ref?: RefObject<unknown>
  style?: CSSProperties
  src: string
}

declare global {
  interface HTMLElementTagNameMap {
    'dotlottie-player': DotLottiePlayer
  }
  function dotLottiePlayer(): DotLottiePlayer
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': JSXLottiePlayer
    }
  }
}