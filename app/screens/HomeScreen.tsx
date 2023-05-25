import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { AutoImage, Button, Icon, IconsApp, Screen, Text, Maps } from "../components"
import { spacing } from "../theme"
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useStores } from "../models"
import { Center, HStack, VStack } from "native-base"
import MapboxGL from '@react-native-mapbox-gl/maps';
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(
  function HomeScreen() {
    const {
      authenticationStore: { name_user },
    } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    MapboxGL.setAccessToken('sk.eyJ1IjoiZGluaGFuaDIwMDEiLCJhIjoiY2xoZjB2Mm4wMWxqaDNscGM3MTU3dW9qNyJ9.Ibu6vijlcf96y9KXtyN3_Q')
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["end"]}>
        <View style={$header}>
          <Icon icon="menu" size={30} />
          <Text tx="HomeScreen.NameApp" />
          <AutoImage
            source={{
              uri: "https://cdn.pixabay.com/photo/2023/04/06/01/26/heart-7902540_960_720.jpg",
            }}
            maxWidth={50}
            maxHeight={50}
            borderRadius={25}
          />
        </View>
        <Center>
          <HStack>
            <Text tx="HomeScreen.labelHello" />
            <Text>{` ${name_user}`}</Text>
          </HStack>
        </Center>

        <View>
          <HStack style={{ justifyContent: "space-around" }}>
            <Button style={{ width: "40%" }} tx="HomeScreen.InforPatrol" />
            <Button tx="HomeScreen.Explanation" style={{ width: "40%" }} />
          </HStack>
        </View>
        <View style={page}>
          <View style={container}>
            <Maps style={{width: '100%', height: '100%'}}/>
            {/* <MapboxGL.MapView style={map} /> */}
            <Text text="Map hien thi o day" />
            <MapboxGL.MapView style={{flex: 1}} />
          </View>
          <IconsApp icon={<Ionicons name="location" size={24} color="black" />} />
          <Text>Bạn đang ở Cổ Nhuế,Việt Nam</Text>
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $header: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: 2,
}
const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.medium,
  backgroundColor: "#F5FCFF",
}
const $title: TextStyle = {
  marginBottom: spacing.small,
}

const $tagline: TextStyle = {
  marginBottom: spacing.huge,
}

const $description: TextStyle = {
  marginBottom: spacing.large,
}
const page: TextStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const container: TextStyle = {
  height: 300,
  width: 300,
  backgroundColor: "tomato",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const map: ViewStyle = {
  flex: 1,
  width: '100%',
  height: '100%',
}

// const styles = {
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   container: {
//     height: 300,
//     width: 300,
//     backgroundColor: 'tomato'
//   },
//   map: {
//     flex: 1
//   }
// };
