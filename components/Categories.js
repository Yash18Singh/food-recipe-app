import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
// import {categoryData} from '../constants/CategoryData'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {FadeIn, FadeOut, BounceInRight} from 'react-native-reanimated'
import CachedImage from '../helpers/CachedImage'

export default function Categories({categories, activeCategory, setActiveCategory}) {
  return (
    <Animated.View entering={BounceInRight.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15, display:'flex', gap:10}}
      >
        {
            categories.map((cat, idx) => {
                let isActive = cat.strCategory === activeCategory;
                let activeButtonClass = isActive ? "#FFCA28" : "#0000002d";
                return(
                    <TouchableOpacity
                        key={idx}
                        style={styles.singleCategory}
                        onPress={()=> setActiveCategory(cat.strCategory)}
                    >
                        <View style={{borderRadius:100, padding:6, backgroundColor:activeButtonClass}}>
                            <Image 
                                source={{uri: cat.strCategoryThumb}}
                                style={{width:hp(8), height:hp(8), borderRadius:100,}}
                            />
                            {/* <CachedImage
                              uri={cat.strCategoryThumb} // The image URL
                              style={{width:hp(8), height:hp(8), borderRadius:100,}}
                              resizeMode="cover" // You can change resize mode based on your preference
                            /> */}
                        </View>
                        <Text style={{fontSize:hp(1.6), color:'#0000009d'}}>
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    singleCategory: {
        flex: 1,                // Equivalent to `flex`
        justifyContent: 'center',  // Centers the items vertically in the container (optional)
        alignItems: 'center',     // Equivalent to `items-center`
        paddingVertical: 10, 
    }
})