import React from "react";
import { StyleSheet, Dimensions, FlatList, Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity } from "react-native";

const COLORS = {primary: '#282534', white: '#fff', F: '#F50057' };
const {width, height} = Dimensions.get('window');

type SlideItem = {
    key: number;
    title: string;
    text: string;
    image: any; 
    backgroundColor: string;
  };

const slides: SlideItem[] = [
    {
      key: 1,
      title: 'Best Digital Solution',
      text: 'Description.\nSay something cool',
      image: require('../images/B.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Achieve Your Goals',
      text: 'Other cool stuff',
      image: require('../images/C.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 3,
      title: 'Cool Stuff',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../images/D.png'),
      backgroundColor: '#59b2ab',
    }
  ];

  const Slide: React.FC<{ item: SlideItem }> = ({item}) => {
    return(
        <View style={{alignItems: 'center'}}>
              <Image source={item.image} 
              style={{height: '75%', width, resizeMode: 'contain'}}/>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.text}</Text>
            </View>
        </View>
    )
  }

  const Onboarding: React.FC<{ navigation: any }> = ({navigation}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);  
    const ref = React.useRef<FlatList<SlideItem> | null>(null);
    const updateCurrentSlideIndex = (e: any) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(currentIndex);
    };
  
    const goToNextSlide = () => {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slides.length) {
        const offset = nextSlideIndex * width;
        ref.current?.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    };

    const skip = () => {
      const lastSlideIndex = slides.length - 1;
      const offset = lastSlideIndex * width;
      ref.current?.scrollToOffset({offset});
      setCurrentSlideIndex(lastSlideIndex);
    };
    const Footer = () => {
      return(
        <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
          
        {/* Indicator container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
          </View>

        {/* Render buttons */}
        <View style={{marginBottom: 35}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace('HomeScreen')}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: COLORS.primary}}>
                GET STARTED
              </Text>
            </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: COLORS.white,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: COLORS.primary
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        </View>
      )
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
          <StatusBar backgroundColor={COLORS.primary}/>
          <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          pagingEnabled
          data={slides}
          contentContainerStyle={{height: height * 0.75}}
          horizontal
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <Slide item={item}/>}
          />
          <Footer/>
        </SafeAreaView>
    )
  }
  export default Onboarding;

const styles = StyleSheet.create({
  title: {
    color: COLORS.F,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 20,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})