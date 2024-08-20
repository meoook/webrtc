import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPopup, IPopupOptions } from '../model'

interface IMediaState {
  platform: 'mobile' | 'desktop'
  audioDevices: string[]
  videoDevices: string[]
  audioDeviceID: string
  videoDeviceID: string
}

function isMobile() {
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return regex.test(navigator.userAgent) && hasTouchSupport
}

const LOCAL_STORAGE_AUDIO_ID: string = 'audio_id'
const LOCAL_STORAGE_VIDEO_ID: string = 'video_id'

// const getInitialState = async (): Promise<IMediaState> => {
//   if (!navigator.mediaDevices?.enumerateDevices) {
//     console.log('Media devices disabled')
//   }
//   const devices = await navigator.mediaDevices.enumerateDevices()
//   // return {
//   //   platform: isMobile() ? 'mobile' : 'desktop',
//   // }
// }
