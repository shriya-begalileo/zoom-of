import { Button, SafeAreaView, View } from "react-native"



const ZoomClass = (props)=>{
    // console.log(props)

    const handleJoinClass = ()=>{
        console.log('JOin')
        props.navigation.navigate('Session')
    }
     return(
        <SafeAreaView>
            <View style={{borderWidth:1,marginTop:150,width:150,marginLeft:120}}>
            <Button onPress={handleJoinClass} title="Join"   />
            </View>
           
        </SafeAreaView>
     )
}

export default ZoomClass