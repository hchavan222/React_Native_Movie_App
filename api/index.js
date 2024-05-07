import axios from "axios"
const api_key = "d8163d9b294ca99b45d45f5f4718f596"
const api_base = "https://api.themoviedb.org/3"

const trendingendpoint = `${api_base}/trending/movie/week?language=en-US&api_key=${api_key}`
const upcomingendpoint = `${api_base}/movie/upcoming?language=en-US&api_key=${api_key}`
const topratedendpoint = `${api_base}/movie/top_rated?language=en-US&api_key=${api_key}`


const searchendpoint = `${api_base}/search/movie?language=en-US&api_key=${api_key}`


const movieendpoint = id => `${api_base}/movie/${id}?language=en-US&api_key=${api_key}`

const api_call = async(endpoint , params)=>{

    const req = {
        Method : 'GET',
        url : endpoint,
        params : params? params : {}
    }

    try{
        const res = await axios.request(req)
        return res.data

    }catch(error){
        console.log("error" + error)
        return {}
    }

}

export const fetchtrend = () =>{
   return api_call(trendingendpoint)
}


export const fetchupcoming = () =>{
    return api_call(upcomingendpoint)
 }

 
export const fetchtoprated = () =>{
    return api_call(topratedendpoint)
 }

export const fetchMovieDetails = (id)=>{
    console.log(id)
    return api_call(movieendpoint(id))
}

export const reqimage = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null
export const reqimage1 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null
export const reqimage2 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null


export const searchMovies = params =>{
    return api_call(searchendpoint , params)
}


 
