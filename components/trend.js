import { View, Text , StyleSheet, Dimensions, TouchableWithoutFeedback , Image} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { reqimage, reqimage1 } from '../api'

var { width , height} = Dimensions.get('window')


const Trend = ({data}) => {
    const navi = useNavigation()
    
    

    const handleclick = (item)=>{
        navi.navigate('Movie' , item)

    }
  return (
    <View>
      <Text style={styles.text}>Trending</Text>
      <Carousel 
        data={data} renderItem={({item})=> <MovieCard item={item}  />}  inactiveSlideOpacity={0.60} sliderWidth={width} itemWidth={width*0.6} slideStyle={{display:"flex", alignItems:"center"}
        }
      />

    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        display:"flex",
        flex:1,
        backgroundColor:"rgb(38 38 38)",
        paddingTop: 40
    },

    insideCon:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:4

    },
    text:{
        color:"white",
        paddingTop:10,
        fontSize:20,
        fontWeight:"bold"
    }
})

const MovieCard = ({item})=>{
    const navi = useNavigation()
    return(
        <TouchableWithoutFeedback onPress={()=> navi.navigate('Movie' , item)}>
            <Image  source={{uri: reqimage1(item.poster_path)}}style={{width: width*0.6 , height:height*0.4}} />
        </TouchableWithoutFeedback>
    )
}

export default Trend