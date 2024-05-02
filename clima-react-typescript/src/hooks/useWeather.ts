import axios from "axios";
import { SearchType } from "../types";
import { z } from 'zod';
import { useMemo, useState } from "react";
// import { object, string, number, Output, parse } from 'valibot'
// import { Weather } from '../types/index';


// function isWeatherResponse( weather: unknown ) : weather is Weather {

//   return (
//     Boolean( weather ) &&
//     typeof weather === 'object' &&
//     typeof ( weather as Weather ).name === 'string' &&
//     typeof ( weather as Weather ).main.temp === 'number' &&
//     typeof ( weather as Weather ).main.temp_max === 'number' &&
//     typeof ( weather as Weather ).main.temp_min === 'number'

//   )
// }

// Zod

const Weather = z.object( {
  name: z.string(),
  main: z.object( {
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  } )
} );

//! FORMA DE VALIBOT
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   })
// });

// type Weather = Output<typeof WeatherSchema>

//!Zod
export type Weather = z.infer<typeof Weather>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  }
}

export function useWeather() {

  const [ weather, setWeather ] = useState<Weather>( initialState );

  const [ loading, setLoading ] = useState( false );

  async function fetchWeather( search: SearchType ) {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading( true );
    setWeather( initialState );
    try {



      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${ search.city },${ search.country }&appid=${ appId }`;

      const { data } = await axios( geoUrl );
      const lat = data[ 0 ].lat
      const lon = data[ 0 ].lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ appId }`;

      const { data: weatherResult } = await axios( weatherUrl );
      //! zov
      const result = Weather.safeParse( weatherResult );
      if ( result.success ) {
        setWeather( result.data );
      }
      console.log( result )
      // const result = isWeatherResponse( weatherResult );
      // if ( result ) {
      //   console.log(weatherResult.name)
      // }
      // console.log(result)

      //! VALIBOT
      // const result = parse(WeatherSchema, weatherResult)
      // console.log(result);
      // if ( result ) {
      //   console.log(result.name);
      // }

    } catch ( error ) {
      console.log( error )
    } finally {
      setLoading( false );
    }

  }

  const hasWeatherData = useMemo( () => {
    return weather.name
  }, [ weather ] )

  return {
    weather,
    hasWeatherData,
    fetchWeather,
    loading
  }
}