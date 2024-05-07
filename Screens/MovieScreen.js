import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'react-native-svg';
import { fetchMovieDetails, reqimage } from '../api';
import Load from '../components/load';

const { width , height} = Dimensions.get('window')


const MovieScreen = () => {

    

    const navi = useNavigation()
    const [data , setdata] = useState({})
    const [fav , setfav] =  useState(false)
    const [load , setload]=useState(false)

    const {params : item} = useRoute();
    useEffect(()=>{
        console.log('itemID'+ item.id)
        setload(true)
        getmoviedetails(item.id)

    },[item])

    const getmoviedetails =async(id)=>{
        const data1 = await fetchMovieDetails(id)
        
        

        if(data1){
            setdata(data1)
            setload(false)
        }
        

    }
  return (
    <ScrollView style={{paddingBottom:20 , display:"flex" , flex:1 , backgroundColor:"grey"}}>

    <View style={{width:"100%"}}>
        <SafeAreaView style={{position:"absolute" , zIndex:20 , width:"100%" , display:"flex" , flexDirection:"row" , justifyContent:"space-between" , alignItems:"center" , paddingHorizontal:4}}>
        <TouchableOpacity onPress={()=> navi.goBack()}style={{padding:1 , borderRadius:12 }}>
        <ChevronLeftIcon size="28" strokeWidth="2.5" color="white" />

        </TouchableOpacity>

        <TouchableOpacity style={{padding:1 , borderRadius:12 }}>
        <HeartIcon size="28" strokeWidth="2.5" color={ fav ? "red" : "white"}  />

        </TouchableOpacity>

        </SafeAreaView>

        {
            load? (<Load />):(
            <View>
                <Image source={{uri:reqimage(data.poster_path)}} style={{width , height:height*0.55}} />
                <LinearGradient color={['transparent' , "black" ,  "black"]}
                 style={{width , height , position:"absolute" , paddingBottom:0}}
                  
                    start={{x:0.5 , y:0}} end={{x:0.5 , y:1}} />

                

            </View>
            ) 
        }
    </View>

    <View style={{marginTop: -(height*0.09), padding:90} }>
     {
        data.id?(<Text style={{color:"black" , textAlign:"center" , fontSize:40 , fontWeight:"bold" , letterSpacing:0.05}}>{
        data?.title
    }</Text>):null
     }

    <Text style={{color:"black" , fontWeight:"bold", fontSize:16 , textAlign:"center"}}>{data?.status} * {data?.release_date?.split('-')[0]
    } * {data?.runtime} </Text>

    <View style={{display:"flex" , flexDirection:"row" , justifyContent:"center" , marginHorizontal:4 , marginLeft:8}}>

    {
        data?.genres?.map((genre , index)=>{
            let show = index+1 != data.genres.length
            return(
                <Text key={index} style={{color:"black" , fontWeight:"bold", fontSize:16 , textAlign:"center"}}>{genre.name} {show? "*":null} </Text>

            )

        })
    }
{/* 
    <Text style={{color:"black" , fontWeight:"bold", fontSize:16 , textAlign:"center"}}>Action *</Text>
    <Text style={{color:"black" , fontWeight:"bold", fontSize:16 , textAlign:"center"}}>Comedy *</Text>
    <Text style={{color:"black" , fontWeight:"bold", fontSize:16 , textAlign:"center"}}>Horror *</Text> */}
    </View>

    <Text style={{color:"black" , marginHorizontal:4 , letterSpacing:0.05}}> {data?.overview}</Text>

    </View>

    </ScrollView>
  )
}

export default MovieScreen