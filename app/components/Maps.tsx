import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import MapboxGL from "@react-native-mapbox-gl/maps"

export interface MapsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

MapboxGL.setAccessToken("sk.eyJ1Ijoic2FuZ2hoIiwiYSI6ImNsaG1ic3ZoeTFhNWMzZnBoeXhoZXdlbjcifQ.Bu3OdsIPS8C3--KCBDJ9vg")

/**
 * Describe your component here
 */
export const Maps = observer(function Maps(props: MapsProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={styles.container}> 
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.UserLocation androidRenderMode={"gps"} renderMode={"native"} visible={true}/>
          <MapboxGL.Camera centerCoordinate={[105.77400409659455, 21.072130348907255]} zoomLevel={11} />
        </MapboxGL.MapView>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
const styles = {
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
}
