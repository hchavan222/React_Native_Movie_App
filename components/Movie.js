import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image , Dimensions} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { reqimage2 } from '../api'

const Movie = ({title , data}) => {
    var { width , height} = Dimensions.get('window')

    const navi = useNavigation()
  return (
    <View style={{marginBottom:8 , marginTop:4}}>
      <View style={{marginHorizontal:4 , display:'flex' , flexDirection:"row" , justifyContent:"space-between", alignItems:"center"}}>
      <Text style={{color:"white" , fontSize:20 , }}>{title}</Text>
      <TouchableOpacity>

      <Text style={{color:"yellow" , fontSize:20} }>
        See All
      </Text>


      </TouchableOpacity>

      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:10}}>
      

      {
        data.map((item , index)=>{
            console.log('item :' + item.poster_path)
           return(
            <TouchableWithoutFeedback key={index} onPress={()=> navi.navigate('Movie' , item)}>

            <View style={{marginBottom:8 , marginTop:4}}>
            <Image  source={{uri:reqimage2(item.poster_path)}} style={{width: width*0.6 , height:height*0.4}} ></Image>

            <Text style={{color:"white"}}>{item.title.length > 14 ? item.title.slice(0,14)+'...' : item.title }</Text>
            </View>
             

           </TouchableWithoutFeedback>
           )

        })
      }
    
    </ScrollView>
    </View>
  )
}

export default Movie