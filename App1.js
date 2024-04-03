import { SafeAreaView, Text } from 'react-native';
import ZoomClass from './Components/ZoomClass';
import { ZoomVideoSdkProvider } from '@zoom/react-native-videosdk';
import MyStack from './Components/Screens';
// import { ZoomVideoSdkProvider, useZoom,  EventType } from 'react-native-zoom-video-sdk';

const App = ()=>{

    return (
  <ZoomVideoSdkProvider
    config={{
    appGroupId: 'test',
    domain: 'zoom.us',
    enableLog: true,
  }}>
    <MyStack />
  </ZoomVideoSdkProvider>
      );
    
}
export default App