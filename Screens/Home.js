import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MagnifyingGlassIcon, SparklesIcon } from "react-native-heroicons/solid";
import {Bars3CenterLeftIcon } from 'react-native-heroicons/outline'
import Trend from '../components/trend';
import Movie from '../components/Movie';
import { useNavigation } from '@react-navigation/native';
import Load from '../components/load';
import { fetchtoprated, fetchtrend, fetchupcoming } from '../api';

const Home = () => {
    const[data , setdata] = useState([])
    const[moviedata , setmoviedata] = useState([])
    const[topdata , settopdata] = useState([])
    const[load , setload]= useState(true)

    const navi = useNavigation()

    useEffect(()=>{
        gettrendingmovies()
        getupcomingmovies()
        gettopratedmovies()
    },[])


    const gettrendingmovies = async() =>{
        const data = await fetchtrend()
        

        if(data && data.results){ setdata(data.results)
        
        setload(false)}



    }

    const getupcomingmovies = async() =>{
        const data = await fetchupcoming()
        

        if(data && data.results){ setmoviedata(data.results)
        
        }



    }

    const gettopratedmovies = async() =>{
        const data = await fetchtoprated()
        

        if(data && data.results){ settopdata(data.results)
        
        }



    }

    

  return (
    
    <View style={styles.container}>
    <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.insideCon}>
        

        <Bars3CenterLeftIcon  size="30" strokeWidth={2} color="white"/>
        <Text style={styles.text}>
          <Text style={{color:"yellow"}}>M</Text>ovies
        </Text>

        <TouchableOpacity onPress={()=>{navi.navigate('Search')}}>
            <MagnifyingGlassIcon size="30" color="white"/>
        </TouchableOpacity>


        </View>
    </SafeAreaView>
    {
        load ? ( <Load /> ) 
        :(
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:10}}>
                { data.length > 0 && <Trend data={data}/>}
                <Movie title="Upcoming" data={moviedata}/>
                <Movie title="TopRated" data={topdata} />
            </ScrollView>
        ) 
    }
    
    

      
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
        fontSize:30,
        fontWeight:"bold"
    }
})
export default Home