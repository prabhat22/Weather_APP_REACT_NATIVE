import React, { useState} from 'react';
import { StyleSheet, ScrollView, View, Text,Alert, Button,Image } from 'react-native';

import * as Location from 'expo-location'

import { Constants } from '../../Constants/constants';
import { useDispatch } from 'react-redux';

import * as Actions from '../../store/action/weather'



export default function MainScreen(props) {
  
    const dispatch=useDispatch();
    var reqDay=[];
    var weatherList=[];
    let image = require('../../assets/loader.gif')
    const[days,setDays]=useState(reqDay);
    const [isFetching, setFetching] = useState(false);
    const [isLoading,setLoader]=useState(false);
    const [isErr,setError]=useState(false);
    const[weatherData,setWeather]=useState(weatherList);
    
    const getLocationHandler = async () => {
        try {
            setFetching(true);
            setError(false)
            const isAllowed = await Location.requestPermissionsAsync();
            if (!isAllowed) {
                return;
            }
            const userLocation = await Location.getCurrentPositionAsync(
                {
                    timeout: 5000
                }
            )
           await getListOfWeather(userLocation.coords.latitude,userLocation.coords.longitude)
           day();
            
            

        }
        catch (err) {
            setError(true)
            Alert.alert('Cannot fetch location', 'Please try again', [{ text: 'okay' }])
        }
        setFetching(false)

    }
 
    const locationHandler=async ()=>
    {
        await getLocationHandler();
    }

  const getListOfWeather=async(lat,lng)=>
    {
        setLoader(true);
      
        let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=41dd556633b4fa3dccd696e383febaf6&exclude=hourly&units=metric`;
        let result=await fetch(url);
        console.log('status',result.status)
        if(result.status!=200)
        {
            setError(true);
            setLoader(false)
            return

        }
        let resultData=await result.json();
        resultData=resultData.daily;
        console.log('data',resultData)
        for(let i=0;i<5;i++)
        {
          weatherList.push(resultData[i]);
        }
        setWeather(weatherList);
        setLoader(false)
    }

    
 

   const day= ()=> {
        var day = new Date();
        
        var week = new Array(
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        );
      
        for (i = 0; i < 5; i++) {
     
          let obj={
              day:week[(day.getDay() + i) % 7],
              temp:weatherData[i].temp.day
          }
          reqDay.push(obj);
        }
        dispatch(Actions.saveData(reqDay))
        setDays(reqDay);
    
      
      }
      

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.buttonContainer}>
            <Button styles={styles.button} title="Get location" onPress={locationHandler} />
            </View>
            {
                !isErr && weatherData.length>0 && <View>
                           
            <View style={styles.currentDay}>
            <Text style={styles.temp}>{weatherData[0].temp.day}</Text>
             <Text style={styles.state}>Delhi</Text>
            </View>

            <View style={styles.list}>
             {
                 days.map(obj=>
                    {
                        return(
                            <View style={styles.dayTemp}>
                               <Text style={styles.dayText}>{obj.day}</Text>
                        <Text style={styles.dTemp}>{obj.temp}</Text>
                          </View>
                        
                        )
                      
                    })
                  
                 
             }
             </View>
           
            {  isLoading &&  <Image style={styles.loader}  source={image} /> }
             
                </View>
            }
              
           {isErr && <View style={styles.errContainer}>
               <Text style={{fontSize:40,textAlign:'center',padding:10}}>Something went wrong at our end</Text>
               <Button  title="Retry" onPress={locationHandler}/>
               </View>}
            

        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        screen:
        {
            flex: 1,
           
            backgroundColor: 'white'
        },
        currentDay:
        {
         alignContent:'center',
         alignItems:'center',
         height:200,
         borderBottomWidth:1,
         borderBottomColor:'black',
          
        },
        temp:
        {
         fontSize:40,
         fontFamily:'open-sans-bold'
        },
        state:
        {
            fontSize:30,
            fontFamily:'open-sans'

        },
        dayTemp:
        {    flexDirection:'row',
             borderBottomColor:'black',
             borderBottomWidth:1,
             marginVertical:10,
             paddingHorizontal:20,
             justifyContent:'space-between'
             
        },
        dayText:
        {
         paddingRight:20,
         fontSize:20,
         fontFamily:'open-sans'
         
        },
        dTemp:
        {
            fontSize:20,
            fontFamily:'open-sans'
        },
        loader:
        {
            width: 200, 
            height: 200,
            alignContent:'center',
            left:60
        },
        errContainer:
        {   
             alignItems: 'center'  ,
             justifyContent:'center' 
        },
        
        searchBar:
        {
            marginVertical: 10
        },
        search:
        {
            borderColor: 'grey',
            borderWidth: 1,
            height: 50,
            borderRadius: 10,

        },
        buttonContainer: {

            marginHorizontal: 5,
            marginVertical:10,
            borderColor: 'white',
        },

        button:
        {
            width:'25'

        },
        selButton:
        {
            backgroundColor: Constants.primary
        },
        cravings:
        {
            marginVertical: 15
        },
        cravingTitle:
        {
            color: 'black',
            fontSize: 20,
            fontFamily: 'open-sans-bold'
        },
        cravingSubtTitle:
        {
            color: 'grey',
            fontSize: 14
        },
        cravingRow:
        {
            flexDirection: 'row',
            marginVertical: 10

        },

    }
)