import { useCallback, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import iconArray from '../../elements/ico-get/icons'
import style from './room.module.scss'
import Video from '../video'
import { WebRTCUser } from '../../model'

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    // {
    //   urls: 'stun:stun.l.google.com:19302',
    // },
    // {
    //   urls: 'stun:93.186.66.134:5349',
    // },
    {
      urls: 'turn:45.84.197.118:5349',
      credential: 'test',
      username: 'test',
    },
  ],
}

// const MEDIA_CONSTRAINTS = {
//   audio: true,
//   video: {
//     // deviceId: {exact: myExactCameraOrBustDeviceId},
//     // deviceId: myPreferredCameraDeviceId,
//     frameRate: { ideal: 10, max: 15 },
//     facingMode: true ? 'user' : 'environment', // front/back camera
//     width: { min: 640, ideal: 1280, max: 1920 },
//     height: { min: 480, ideal: 720, max: 1080 },
//   },
// }

const SOCKET_SERVER_URL = 'http://192.168.1.43:8080'

interface RoomProps {
  room_id: string
}

export default function Room({ room_id }: RoomProps) {
  const socketRef = useRef<Socket>()
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({})
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream>()
  const [users, setUsers] = useState<WebRTCUser[]>([])
  const [micOn, setMicOn] = useState<boolean>(true)
  const [cameraOn, setCameraOn] = useState<boolean>(true)

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true, // { width: 240, height: 240 },
      })
      localStreamRef.current = localStream
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream
      if (!socketRef.current) return
      socketRef.current.emit('join_room', { room: room_id, email: 'sample@naver.com' })
    } catch (e) {
      console.log(`getUserMedia error: ${e}`)
    }
  }, [room_id])

  const createPeerConnection = useCallback((socketID: string, email: string) => {
    console.log('Create new RTCPeerConnection')

    try {
      const pc = new RTCPeerConnection(pc_config)

      pc.onicecandidate = (e) => {
        if (!socketRef.current || !e.candidate) return
        console.log('onicecandidate')
        socketRef.current.emit('candidate', {
          candidate: e.candidate,
          candidateSendID: socketRef.current.id,
          candidateReceiveID: socketID,
        })
      }

      pc.oniceconnectionstatechange = (e) => {
        console.log('Connection changed', e)
      }

      pc.ontrack = (e) => {
        console.log('ontrack success', e)
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              email,
              stream: e.streams[0],
            })
        )
      }

      if (localStreamRef.current) {
        console.log('localstream add')
        localStreamRef.current.getTracks().forEach((track) => {
          console.log('Track', track)
          console.log('localStreamRef', localStreamRef.current)

          if (!localStreamRef.current) return
          pc.addTrack(track, localStreamRef.current)
        })
      } else {
        console.log('no local stream')
      }
      return pc
    } catch (e) {
      console.error(e)
      return undefined
    }
  }, [])

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL)
    getLocalStream()

    socketRef.current.on('all_users', (allUsers: Array<{ id: string; email: string }>) => {
      allUsers.forEach(async (user) => {
        if (!localStreamRef.current) return
        const pc = createPeerConnection(user.id, user.email)
        if (!pc || !socketRef.current) return
        pcsRef.current = { ...pcsRef.current, [user.id]: pc }
        try {
          const localSdp = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
          console.log('create offer success')
          await pc.setLocalDescription(new RTCSessionDescription(localSdp))
          socketRef.current.emit('offer', {
            sdp: localSdp,
            offerSendID: socketRef.current.id,
            offerSendEmail: 'offerSendSample@sample.com',
            offerReceiveID: user.id,
          })
        } catch (e) {
          console.error(e)
        }
      })
    })

    socketRef.current.on(
      'getOffer',
      async (data: { sdp: RTCSessionDescription; offerSendID: string; offerSendEmail: string }) => {
        const { sdp, offerSendID, offerSendEmail } = data
        console.log('get offer')
        if (!localStreamRef.current) return
        const pc = createPeerConnection(offerSendID, offerSendEmail)
        if (!pc || !socketRef.current) return
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc }
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp))
          console.log('answer set remote description success')
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          })
          await pc.setLocalDescription(new RTCSessionDescription(localSdp))
          socketRef.current.emit('answer', {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          })
        } catch (e) {
          console.error(e)
        }
      }
    )

    socketRef.current.on('getAnswer', (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
      const { sdp, answerSendID } = data
      console.log('get answer')
      const pc: RTCPeerConnection = pcsRef.current[answerSendID]
      if (!pc) return
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })

    socketRef.current.on('getCandidate', async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
      console.log('get candidate')
      const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID]
      if (!pc) return
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      console.log('candidate add success')
    })

    socketRef.current.on('user_exit', (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return
      pcsRef.current[data.id].close()
      delete pcsRef.current[data.id]
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id))
    })

    return () => {
      if (socketRef.current) socketRef.current.disconnect()

      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return
        pcsRef.current[user.id].close()
        delete pcsRef.current[user.id]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection, getLocalStream])

  const handleInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.length !== 0) {
      socketRef.current?.emit('message', event.currentTarget.value)
      event.currentTarget.value = ''
    }
  }

  const toggleMic = () => {
    setMicOn((_) => {
      if (!localStreamRef.current) return false
      const enabled = localStreamRef.current?.getAudioTracks()[0].enabled
      localStreamRef.current.getAudioTracks()[0].enabled = !enabled
      return !enabled
    })
  }
  const toggleVideo = () => {
    setCameraOn((_) => {
      if (!localStreamRef.current) return false
      const enabled = localStreamRef.current?.getVideoTracks()[0].enabled
      localStreamRef.current.getVideoTracks()[0].enabled = !enabled
      // localStreamRef.current.getVideoTracks()[0].stop()
      return !enabled
    })
  }

  return (
    <div className={style.room}>
      <div className={style.main}>
        <div className={style.videos}>
          <video className={style.video} muted ref={localVideoRef} autoPlay />
          {users.map((user, index) => (
            <Video key={index} email={user.email} stream={user.stream} />
          ))}
        </div>
        <div className={style.options}>
          <button className={style.option} onClick={toggleVideo}>
            {cameraOn ? iconArray.camera : iconArray.camera_off}
          </button>
          <button className={style.option} onClick={toggleMic}>
            {micOn ? iconArray.mic : iconArray.mic_off}
          </button>
        </div>
      </div>
      <div className={style.menu}>
        <div className={style.chat}>{room_id}</div>
        <div className={style.options}>
          <input className={style.input} onKeyDown={handleInputKey} />
          <button className={style.option}>{iconArray.add_o}</button>
        </div>
      </div>
    </div>
  )
}
