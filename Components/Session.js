import { useEffect, useRef, useState } from "react";
import { Button, PermissionsAndroid, Platform, SafeAreaView, Text, View } from "react-native";
import { useZoom, EventType } from '@zoom/react-native-videosdk';
import {
    VideoAspect,
    ZoomVideoSdkUser,
    ZoomView,
    
  } from "@zoom/react-native-videosdk";
  // import generateJwt from "./utils/jwt";
import { config } from "../utils/config";
import generateJwt from "../utils/jwt";
import { PERMISSIONS, check, request } from "react-native-permissions";


const Session= ()=>{
  // usePermission();
    const zoom = useZoom();
    console.log(zoom.joinSession)
  const listeners = useRef([]);
  const [users, setUsersInSession] = useState([]);
  const [isInSession, setIsInSession] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
    
    
    // const join=async()=>{
    //     try {
    //         const result = await zoom.joinSession({
    //             sessionName: 'test',
    //             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiVUUtX2xVWGRRX2VCUzBObmtna3lzUSIsInJvbGVfdHlwZSI6MSwidHBjIjoidGVzdCIsInZlcnNpb24iOjEsImlhdCI6MTcxMjEzOTI4OCwiZXhwIjoxNzEyMTQyODg4fQ.rTQxzuBPA0uB6LEUcfnA0X_AAP_vn3L7XQ4AIf7Gc-Y',
    //             username: 'name of user',
    //             audioOptions: {
    //                 connect: false,
    //                 mute: false,
    //             },
    //             videoOptions: {
    //                 localVideoOn: true,
    //             },
    //             sessionIdleTimeoutMins: 40,
    //         });
    //         console.log('join')
    //         console.log(result); // Handle the result here
    //     } catch (error) {
    //         console.error("Error occurred while joining session:", error);
    //         // Handle errors here
    //     }
    // }

    // const join = async () => {
    //     /* Disclaimer: JWT should be generated from your server */
    //     const token = await generateJwt(config.sessionName, config.roleType);
    //     console.log(token)
    //     const sessionJoin = zoom.addListener(EventType.onSessionJoin, async () => {
    //       const mySelf = new ZoomVideoSdkUser(await zoom.session.getMySelf());
    //       const remoteUsers = await zoom.session.getRemoteUsers();
    //       setUsersInSession([mySelf, ...remoteUsers]);
    //       setIsInSession(true);
    //     });
    //     listeners.current.push(sessionJoin);
    
    //     const userJoin = zoom.addListener(EventType.onUserJoin, async (event) => {
    //       const { remoteUsers } = event;
    //       const mySelf = await zoom.session.getMySelf();
    //       const remote = remoteUsers.map((user) => new ZoomVideoSdkUser(user));
    //       setUsersInSession([mySelf, ...remote]);
    //     });
    //     listeners.current.push(userJoin);
    
    //     const userLeave = zoom.addListener(EventType.onUserLeave, async (event) => {
    //       const { remoteUsers } = event;
    //       const mySelf = await zoom.session.getMySelf();
    //       const remote = remoteUsers.map((user) => new ZoomVideoSdkUser(user));
    //       setUsersInSession([mySelf, ...remote]);
    //     });
    //     listeners.current.push(userLeave);
    
    //     const userVideo = zoom.addListener(EventType.onUserVideoStatusChanged, async (event) => {
    //       const { changedUsers } = event;
    //       const mySelf = new ZoomVideoSdkUser(await zoom.session.getMySelf());
    //       changedUsers.find((user) => user.userId === mySelf.userId) &&
    //         mySelf.videoStatus.isOn().then((on) => setIsVideoMuted(!on));
    //     });
    //     listeners.current.push(userVideo);
    
    //     const userAudio = zoom.addListener(EventType.onUserAudioStatusChanged, async (event) => {
    //       const { changedUsers } = event;
    //       const mySelf = new ZoomVideoSdkUser(await zoom.session.getMySelf());
    //       changedUsers.find((user) => user.userId === mySelf.userId) &&
    //         mySelf.audioStatus.isMuted().then((muted) => setIsAudioMuted(muted));
    //     });
    //     listeners.current.push(userAudio);
    
    //     const sessionLeave = zoom.addListener(EventType.onSessionLeave, () => {
    //       setIsInSession(false);
    //       setUsersInSession([]);
    //       sessionLeave.remove();
    //     });
    
    //     await zoom
    //       .joinSession({
    //         sessionName: 'TestOne',
            
    //         token: token,
    //         userName: 'test',
    //         audioOptions: { connect: true, mute: true, autoAdjustSpeakerVolume: false },
    //         videoOptions: { localVideoOn: true },
            
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   };
    const join = async () => {
      /* Disclaimer: JWT should be generated from your server */
      try {
           const token = await generateJwt(config.sessionName, config.roleType);
          // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiVUUtX2xVWGRRX2VCUzBObmtna3lzUSIsInJvbGVfdHlwZSI6MSwidHBjIjoiVGVzdE9uZSIsInZlcnNpb24iOjEsImlhdCI6MTcxMjIxNzI5MCwiZXhwIjoxNzEyMjIwODkwfQ.1mRBIcJrZfkmWswUm_G33Op3km3f9JOLqBD2UIP_yp4'
          console.log(token);
          
          const sessionJoin = zoom.addListener(EventType.onSessionJoin, async () => {
            const mySelf = new ZoomVideoSdkUser(await zoom.session.getMySelf());
            const remoteUsers = await zoom.session.getRemoteUsers();
            setUsersInSession([mySelf, ...remoteUsers]);
            setIsInSession(true);
          });
          listeners.current.push(sessionJoin);
      
          const userJoin = zoom.addListener(EventType.onUserJoin, async (event) => {
            const { remoteUsers } = event;
            const mySelf = await zoom.session.getMySelf();
            
            const remote = remoteUsers.map((user) => new ZoomVideoSdkUser(user));
            console.log({remote})
            setUsersInSession([mySelf, ...remote]);
          });
          listeners.current.push(userJoin);
      
          const userLeave = zoom.addListener(EventType.onUserLeave, async (event) => {
            const { remoteUsers } = event;
            const mySelf = await zoom.session.getMySelf();
            const remote = remoteUsers.map((user) => new ZoomVideoSdkUser(user));
            console.log(remote)
            setUsersInSession([mySelf, ...remote]);
          });
          listeners.current.push(userLeave);
      
          const userVideo = zoom.addListener(EventType.onUserVideoStatusChanged, async (event) => {
            const { changedUsers } = event;
            const mySelf = new ZoomVideoSdkUser(await zoom.session.getMySelf());
            changedUsers.find((user) => user.userId === mySelf.userId) &&
              mySelf.videoStatus.isOn().then((on) => setIsVideoMuted(!on));
          });
          listeners.current.push(userVideo);
      
          const userAudio = zoom.addListener(EventType.onUserAudioStatusChanged, async (event) => {
            const { changedUsers } = event;
            const mySelf = new ZoomVideoSdkUser(await zoom.session.getMySelf());
            changedUsers.find((user) => user.userId === mySelf.userId) &&
              mySelf.audioStatus.isMuted().then((muted) => setIsAudioMuted(muted));
          });
          listeners.current.push(userAudio);
      
          const sessionLeave = zoom.addListener(EventType.onSessionLeave, () => {
            setIsInSession(false);
            setUsersInSession([]);
            sessionLeave.remove();
          });
      
         const res =  await zoom.joinSession({
            sessionName: config.sessionName,
            sessionPassword: config.sessionPassword,
            token: token,
            userName: config.displayName,
            audioOptions: { connect: true, mute: true, autoAdjustSpeakerVolume: false },
            videoOptions: { localVideoOn: false },
            sessionIdleTimeoutMins: config.sessionIdleTimeoutMins,
          });
          if(res){
            sessionJoin()
          }
      } catch (error) {
          console.error("Error occurred while joining session:", Object.keys(error));
      }
  };

 
  const CAMERA_PERMISSION = Platform.select({
    android:PermissionsAndroid.PERMISSIONS.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA
  })


  const MICROPHONE_PERMISSION = Platform.select({
    android:PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ios:PERMISSIONS.IOS.MICROPHONE
  })

  const checkPermission = async()=>{
    try{
      let cameraStatus,microphoneStatus
      if(Platform.OS === "android"){
        cameraStatus = await PermissionsAndroid.check(CAMERA_PERMISSION)
        microphoneStatus = await PermissionsAndroid.check(MICROPHONE_PERMISSION)
        console.log(cameraStatus,microphoneStatus,"for android")   
      }
      else if(Platform.OS === 'ios'){
        cameraStatus = await check(CAMERA_PERMISSION)
        microphoneStatus = await check(MICROPHONE_PERMISSION)
        console.log(cameraStatus,microphoneStatus,'for ios')
      }

      if(cameraStatus === 'denied' || microphoneStatus === "denied"){
          requestPermission()
      }else {
        console.log('Permission granted for camera & microphone')
      }
    }
    catch (error) {
      console.log('Error Checking Permission',error)
    }

  }

//   if(cameraStatus = PermissionsAndroid.RESULTS.DENIED ) {
//     requestPermission()
// }else{
//   console.log('Permission granted')
// }
  const requestPermission = async()=>{
    
    try{
      let cameraRequest,microphoneRequest 

      if(Platform.OS === 'android') {
        cameraRequest = await PermissionsAndroid.request(CAMERA_PERMISSION)
        microphoneRequest = await PermissionsAndroid.request(MICROPHONE_PERMISSION)
        console.log(cameraRequest,microphoneRequest,'request for android')
      }
      else if(Platform.OS === 'ios') {
        cameraRequest = await request(CAMERA_PERMISSION)
        microphoneRequest = await request(MICROPHONE_PERMISSION)
        console.log(cameraRequest,microphoneRequest)
      }
      
      if(cameraRequest === 'granted' && microphoneRequest === 'granted'){
        console.log('Permission granted for camera and microphone')
      }else{
        console.log('Permissions denied')
      }
    }
    catch(error){
      console.log('Error Requesting Permissions',error)
    } 
  }

//   if(permissionsStatus === 'denied'){
//     requestPermission()
//   }else{
//     console.log('permission granted')
//   }
  

      const leaveSession = () => {
        zoom.leaveSession(false);
        setIsInSession(false);
        listeners.current.forEach((listener) => listener.remove());
        listeners.current = [];
      };

    useEffect(()=>{
      checkPermission()
    },)

    return isInSession ? (
        <View >
          {users.map((user) => (
            // console.log(user)
            <View style={{height:100,width:200}} userId={user.userId} >
              <ZoomView
              style={{height:200,width:200}}
               userId={user.userId}
                fullScreen
                videoAspect={VideoAspect.PanAndScan}
              />
            </View>
          ))}
          {/* <MuteButtons isAudioMuted={isAudioMuted} isVideoMuted={isVideoMuted} /> */}
          <Button title="Leave Session" color={"#f01040"} onPress={leaveSession} />
        </View>
      ) : (
        <View >
          <Text >Zoom Video SDK</Text>
          <Text >React Native Quickstart</Text>
          <View />
          <Button title="Join Session" onPress={join} />
        </View>
      );
    
}
export default Session