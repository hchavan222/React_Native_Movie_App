import { View, Text , Dimensions} from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
const { width , height} = Dimensions.get('window')




const Load = () => {
  return (
    <View style={{ height:height ,width:width , position:"absolute" , display:"flex" , flexDirection:"row" , justifyContent:"center", alignItems:"center" }}>


      <Progress.CircleSnail thickness={12} size={160} color="yellow"></Progress.CircleSnail>
    </View>
  )
}

export default Load