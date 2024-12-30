import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import axios from 'axios';

import Categories from '../components/Categories';
import Recipes from '../components/Recipes';


export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Lamb');
  const [meals, setMeals] = useState('')

  useEffect(() => {
    getCategories();
    getMeals();
  }, [activeCategory])

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      // console.log('categories data : ', response.data)
      if (response && response.data && response.data.categories) {
        setCategories(response.data.categories); // Extract categories from the response
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }

  const getMeals = async (category = "Beef") => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`);
      if (response && response.data && response.data.meals) {
        setMeals(response.data.meals); // Update meals state
      } else {
        console.error("No meals data available");
        setMeals([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching meals:', error.message);
      setMeals([]); // Ensure meals is always defined
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar style='light'/>

      <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:50}}
          style={styles.mainScrollView}
      >
        {/* avatar and bell icon */}
        <View style={styles.scrollViewAvatar}>
          <Image source={require('../assets/avatar.png')} style={[styles.avatarImg]} />
          <BellIcon size={hp(5)} color='gray'/>
        </View>


        {/* greetings and punchline */}
        <View style={styles.greetView}>
          <Text style={styles.greetText}>Hello, Yashwant!</Text>
          <View>
            <Text style={styles.greetPunchline}>Make your own food,</Text>
          </View>

          <Text style={styles.greetPunchline}>
            stay at <Text style={[{color:'#FFC400'}]}>home</Text>
          </Text>
        </View>


        {/* search bar */}
        <View style={styles.searchBarBody}>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={styles.searchBarText}
          />

          <View style={{backgroundColor:'white', borderRadius:100, padding:12}}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray'/>
          </View>
        </View>


        {/* categories */}
        <View>
          {
            categories &&  
            <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
          }
        </View>


        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    main : {
        display:"flex",
        flex:1,
        backgroundColor:'white',
    }, 

    mainScrollView : {
      paddingVertical:'10%',
    },

    scrollViewAvatar:{
      marginHorizontal:'4%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:'4%'
    },

    avatarImg : {
      height:hp(6.5),
      width:hp(6.5),
      backgroundColor:'#00263862',
      borderRadius:100,
      borderWidth:2,
      borderColor:'black',
      borderStyle:'solid'
    },

    greetView : {
      marginHorizontal:'4%',
      marginBottom:'2%'
    },

    greetText : {
      fontSize:hp(1.7),
      color:'#000000c0',
    },

    greetPunchline:{
      fontWeight:600,
      color:'#000000c0',
      fontSize:hp(3.8)
    },

    searchBarBody:{
      marginTop:'4%',
      marginLeft:'3%',
      marginRight:'3%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      borderRadius:100,
      fontSize:'6px',
      backgroundColor:'#4242423d',
      padding:3
    },

    searchBarText:{
      fontSize:hp(1.7),
      flex:1,
      marginBottom: 4, // mb-1
      paddingLeft: 12, // pl-3
      letterSpacing: 1, // tracking-wider
    }
})