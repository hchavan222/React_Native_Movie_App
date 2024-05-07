import { View, Text, Dimensions, TextInput, TouchableOpacity, TouchableWithoutFeedback,ScrollView , Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/solid'
import Load from '../components/load'
import { useCallback } from 'react'
import { reqimage2, searchMovies } from '../api'
import {debounce} from 'lodash'

const {width , height}  = Dimensions.get('window')

const Search = () => {
    const navi = useNavigation()
    const [data, setdata] = useState([])
    const[load , setload]= useState(false)

    const handlechange = (value)=>{
        console.log("here")
        console.log(value)

        if(value && value.length>2){
            setload(true)

            searchMovies({
                query : value,
                include_adult : false,
                page:1
            }).then(data=>{
                setload(false)
                console.log(data)
                if(data && data.results){
                    setdata(data.results)
                }
            })

        }else{
            setload(false)
            setdata([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handlechange , 400) , [])
  return (
    <SafeAreaView style={{display:"flex" , flex:1 , backgroundColor:"rgb(38 38 38)"}}>
        <View style={{marginHorizontal:20, marginBottom:2, display:"flex" , flexDirection:"row" , alignItems:"center" ,borderWidth:1, borderRadius:500,  borderColor:"white" }}>
            <TextInput onChangeText={handleTextDebounce} placeholder='Enter Name' placeholderTextColor={'lightgrey'} style={{paddingBottom:8 ,paddingTop:8, paddingLeft:6 , display:"flex", flex:1 , fontWeight:"bold" ,color:"white"}}></TextInput>
                <TouchableOpacity onPress={()=>{navi.navigate('Home')}} style={{padding:3 , margin:1 , backgroundColor:"lightgrey", borderRadius:9999}}>
                    <XMarkIcon size="25" color="white"/>
                </TouchableOpacity>


        </View>

    {
        load ? (<Load />) : (
            data? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}} style={{padding:3}}>
             <Text style={{color:"white", fontWeight:"normal", marginLeft:1}}> Results ({data.length})</Text>
                <View style={{display:"flex" , justifyContent:'space-between'}}>
                {
                    data.map((item , index)=>{
                        return(
                            
                            <TouchableWithoutFeedback key={index} onPress={()=>{navi.push('Movie', item)}}>
                            <View>
                                <Image source={{uri:reqimage2(item?.poster_path)}} style={{width: width*0.44 , height:height*0.3}} />
                                <Text style={{color:"white"}}>{item.title}</Text>
                            </View>

                            </TouchableWithoutFeedback>

                        )
                    })
                }

             </View>
    </ScrollView>

        ):(
            <View style={{display:"flex" , flexDirection:"row" , justifyContent:"center"}}>
            <Text>Data Not Found</Text>

            </View>
        )

        )
    }
    

   
    </SafeAreaView>
  )
}

export default Search