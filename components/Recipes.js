import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, {useState} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {BounceInDown} from 'react-native-reanimated'
import MasonryList from '@react-native-seoul/masonry-list'
import {mealData} from '../constants/CategoryData'
import Loading from './Loading'
import CachedImage  from '../helpers/CachedImage'
import { useNavigation } from '@react-navigation/native'

export default function Recipes({meals, categories}) {
    const navigation = useNavigation();

  return (
    <View style={{marginHorizontal:4, marginTop:4}}>
      <Text style={{fontSize:hp(3), font:600, color:'#0000009d'}}>Recipes</Text>
      
      <View>
        {(categories.length > 0 || meals.length > 0) ? 
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation}/>}
            onEndReachedThreshold={0.1}
          />
         : <Loading size="large" style={{marginTop:20}}/>
        }
      </View>

    </View>
  )
}


const RecipeCard = ({item, index, navigation}) => {
    let isEven = index%2 == 0;
    return(
        <Animated.View entering={BounceInDown.delay(index*100).duration(700).springify().damping(20)}>
            <Pressable
                style={{width:'100%', display:'flex', justifyContent:'center', 
                    marginBottom:10, marginTop:1, paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 10 : 0
                }}
                onPress={()=> navigation.navigate('RecipeDetail', {...item})}
            >
                <Image
                    source={{uri:item.strMealThumb}}
                    style={{width:'100%', height:index%3===0 ? hp(25) : hp(35), backgroundColor:'#0000008f',
                        borderRadius:30
                    }}
                    sharedTransitionTag={item.strMeal}
                />
                {/* <CachedImage 
                    uri={item.strMealThumb}
                    style={{width:'100%', height:index%3===0 ? hp(25) : hp(35), backgroundColor:'#0000008f',
                        borderRadius:30
                    }}
                    resizeMode="cover" 
                /> */}
                <Text style={{fontSize:hp(1.8), fontWeight:600, marginLeft: 8, color: '#4b5563' }}>
                    {item.strMeal.length>20 ? item.strMeal.slice(0,20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({})