import { StyleSheet, Text, View, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon} from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, {FadeIn, FadeOut, BounceInRight, BounceInUp, BounceInDown} from 'react-native-reanimated'

const RecipeDetailScreen = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    let item = props.route.params;
    const navigation = useNavigation();

    useEffect(() => {
        getMealData(item.idMeal);
        console.log('ITEMS: ', item);
        console.log('\n\nMEALS:', meal);
    }, [])

    const getMealData = async (id) => {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          // console.log(response.data.meals[0])
          if (response && response.data && response.data.meals) {
            setMeal(response.data.meals[0]); // Update meals state
            setLoading(false);
            // console.log(details)
          } else {
            console.error("No meals data available");
            setMeal(null); // Fallback to empty array
          }
        } catch (error) {
          console.error('Error fetching meals:', error.message);
          setMeal([]); // Ensure meals is always defined
        }
    };


    const ingredientsIndexes = (meal) => {
      if(!meal) return [];
      let indexes = [];
      for(let i=1; i<=20; i++){
        if(meal['strIngredient'+i]){
          indexes.push(i);
        }
      }

      return indexes;
    }


    const getYoutubeVideoId = (url) => {
        // Regex to capture YouTube video ID from different URL formats
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1]; // Return the video ID
        }

        return null; // If no match, return null
    }


  return (
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop:5, paddingBottom:30, backgroundColor:'white', flexGrow:1}}
    >
        <StatusBar style={"dark"} />

        {/* recipe image */}
        <Animated.View entering={BounceInUp.duration(500).springify()} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Image 
                source={{uri: item.strMealThumb}}
                style={{width:wp(98), height:hp(50), borderRadius:40}}
                sharedTransitionTag={item.strMeal}
            />
        </Animated.View>

        {/* back button */}
        <Animated.View
            entering={BounceInUp.duration(700).springify()}
            style={{width:'100%', position:'absolute', display:'flex', 
                flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
                paddingTop:30, paddingLeft:10, paddingRight:10
            }}
        >
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding:5, borderRadius:100, marginLeft:5, backgroundColor:'white', alignItems:'center'}}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={{padding:5, borderRadius:100, marginRight:5, backgroundColor:'white', alignItems:'center'}}>
                {/* <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/> */}
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"}/>
            </TouchableOpacity>
        </Animated.View>

         {/* meal description */}
         {
            loading ? 
            (
              <Loading size="large" style={{marginTop:16}}/>
            ) 
            : 
            (
              <Animated.View entering={BounceInDown.duration(500).springify()} style={{paddingHorizontal:4, display:'flex', justifyContent:'space-between', marginHorizontal:4, paddingTop:8}}>
                  {/* name and area */}
                  <View style={{marginHorizontal:2}}>
                      <Text style={{fontSize:hp(3), fontWeight:800, flex:1, color:'#000000b7'}}>
                          {item.strMeal}
                      </Text>

                      <Text style={{fontSize:hp(2), fontWeight:600, flex:1, color:'#000000b5'}}>
                          {meal.strArea}
                      </Text>
                  </View>

                  {/* misc */}
                  <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:10}}>
                      {/* time */}
                      <View style={{display:'flex', borderRadius:100, padding:8, backgroundColor:'#ffbf00'}}>
                          <View style={{height:hp(6.5), width:hp(6.5), backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:100}}>
                            <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                          </View>

                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(2), fontWeight:800, color:'#000000b7'}}>
                                  35
                              </Text>
                          </View>
                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(1.3), fontWeight:800, color:'#000000b7'}}>
                                  Mins
                              </Text>
                          </View>
                      </View>

                      {/* servings */}
                      <View style={{display:'flex', borderRadius:100, padding:8, backgroundColor:'#ffbf00'}}>
                          <View style={{height:hp(6.5), width:hp(6.5), backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:100}}>
                            <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                          </View>

                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(2), fontWeight:800, color:'#000000b7'}}>
                                  03
                              </Text>
                          </View>
                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(1.3), fontWeight:800, color:'#000000b7'}}>
                                  Servings
                              </Text>
                          </View>
                      </View>

                      {/* calories */}
                      <View style={{display:'flex', borderRadius:100, padding:8, backgroundColor:'#ffbf00'}}>
                          <View style={{height:hp(6.5), width:hp(6.5), backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:100}}>
                            <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                          </View>

                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(2), fontWeight:800, color:'#000000b7'}}>
                                  200
                              </Text>
                          </View>
                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(1.3), fontWeight:800, color:'#000000b7'}}>
                                  Cal
                              </Text>
                          </View>
                      </View>

                      {/* difficulty */}
                      <View style={{display:'flex', borderRadius:100, padding:8, backgroundColor:'#ffbf00'}}>
                          <View style={{height:hp(6.5), width:hp(6.5), backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:100}}>
                            <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                          </View>

                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(2), fontWeight:800, color:'#000000b7'}}>
                                  Easy
                              </Text>
                          </View>
                          <View style={{display:'flex', alignItems:'center', paddingHorizontal:2, marginBottom: 4}}>
                              <Text style={{fontSize:hp(1.3), fontWeight:800, color:'#000000b7'}}>
                                  
                              </Text>
                          </View>
                      </View>
                  </View>


                  {/* ingredients */}
                  <View style={{marginTop:12}}>
                    <Text style={{fontSize:hp(2), fontWeight:800, flex:1, color:'#000000b7'}}>
                        Ingredients
                    </Text>
                    
                    <View style={{marginTop:8, marginLeft:3}}>
                      {
                        ingredientsIndexes(meal).map((i) => {
                          return(
                            <View key={i} style={{display:'flex', flexDirection:'row', marginVertical:4, alignItems:'center', gap:5}}>
                                <View style={{height:hp(1.5), width:hp(1.5), borderRadius:100, backgroundColor:'#fbbf24'}}></View>
                                <View style={{display:'flex', flexDirection:'row', marginHorizontal:2}}>
                                    <Text style={{fontSize:hp(1.7), fontWeight:900, color:'#4B5563'}}>
                                       {meal['strMeasure'+i]}
                                    </Text>

                                    <Text style={{fontSize:hp(1.7), fontWeight:500, marginLeft:5, color:'#4B5563'}}>
                                       {meal['strIngredient'+i]}
                                    </Text>
                                </View>
                             </View> 
                          )
                        })
                      }
                    </View>
                  </View>



                {/* instructions */}
                <View style={{marginTop:12}}>
                    <Text style={{fontSize:hp(2), fontWeight:800, flex:1, color:'#000000b7'}}>
                        Instructions
                    </Text>
                    
                    <Text style={{fontSize:hp(1.6), color:'#4B5563'}}>
                        {
                          meal?.strInstructions
                        }
                    </Text>
                 </View>


                 {/* recipe video */}
                 {
                    meal.strYoutube && (
                        <View style={{marginVertical:4}}>
                          <Text style={{fontSize:hp(2), fontWeight:800, flex:1, color:'#000000b7'}}>
                              Recipe Video
                          </Text>

                          <View>
                            <YoutubeIframe 
                              videoId={getYoutubeVideoId(meal.strYoutube)}
                              height={hp(30)}
                            />
                          </View>
                        </View>
                    )
                 }

              </Animated.View>
            )
         }
    </ScrollView>
  )
}

export default RecipeDetailScreen

const styles = StyleSheet.create({})