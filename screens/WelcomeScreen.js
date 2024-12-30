import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'


const WelcomeScreen = () => {
    const innerRingPadding = useSharedValue(0);
    const outerRingPadding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        innerRingPadding.value = 0;
        outerRingPadding.value = 0;
        setTimeout(() => innerRingPadding.value = withSpring(innerRingPadding.value + hp(4)), 100);
        setTimeout(() => outerRingPadding.value = withSpring(innerRingPadding.value + hp(5.5)), 300);
    
        setTimeout(()=>navigation.navigate('Home'), 2500);
    }, [])

  return (
    <View style={styles.main}>
      <StatusBar style='dark'/>

      {/* Logo Image with rings */}
      <Animated.View style={[styles.logoOuterRing, {padding:outerRingPadding}]}>
        <Animated.View style={[styles.logoInnerRing, {padding:innerRingPadding}]}>
            <Image source={require('../assets/logo.png')}
                style={styles.mainLogo}
            />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.titleBody}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.tagline}>Food is always right</Text>
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    main:{
        display:"flex",
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:'#FFC107'
    },
    logoOuterRing:{
        backgroundColor:'#ffffff38',
        borderRadius:'100%',
    },
    logoInnerRing:{
        backgroundColor:'#ffffff5d',
        borderRadius:'100%'
    },
    mainLogo:{
        width:wp(60),
        height:hp(30)
    },
    titleBody: {
        display:'flex',
        alignItems:'center',
        paddingVertical:'2%'
    },
    title:{
        fontWeight:900,
        color:'white',
        fontSize:hp(7)
    },
    tagline:{
        fontWeight:500,
        color:'white',
        fontSize:hp(2)
    }
})