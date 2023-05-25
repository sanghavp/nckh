import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Box, Pressable} from "native-base"
import { observer } from "mobx-react-lite"
import { TxKeyPath } from "../i18n"
import AntDesign from "@expo/vector-icons/AntDesign"
import { color, colors, typography } from "../theme"
import { Text } from "./Text"
import { Icons } from "./icons/icons"


export interface ItemListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  tx?:TxKeyPath
  text?:string
  mainText?:string
  style?: StyleProp<ViewStyle>
  fontWeight?: string
  onPressIn?():void
  arrowRight?: Boolean
  textRight?: Boolean
  image?: Boolean
  icon?: any
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  // color: color.primary,
  
}

const BOX: ViewStyle = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  maxWidth: "70%",
}

/**
 * Describe your component here
 */
export const ItemList = observer(function ItemList(props: ItemListProps) {
  const { style,tx,text,mainText,onPressIn, fontWeight, arrowRight, textRight, image, icon,...rest } = props
  const content = <Text tx={tx} text={mainText} style={TEXT} fontWeight={fontWeight}/>
  // const styles = Object.assign({}, CONTAINER, style)

  return (
      <Pressable
        onPress={onPressIn}
        marginX={"5%"}
        marginBottom={"1%"}
        bgColor={colors.background}
        paddingX="0"
        paddingY="6"
        // shadow={3}
        borderBottomWidth={1}
        borderBottomColor="#ccc"
        // borderRadius="10"
        flexDirection={"row"}
        justifyContent="space-between"
        style={style}
        {...rest}
      >
        <Box style={BOX}>
          {image && (
            <Icons marginRight={2} icon={icon}/>)}
            <View>
              {content}
            </View> 
        </Box>
        {arrowRight ? (<AntDesign name="right" size={24} color={colors.dim} />) : 
        <View style={{maxWidth: "30%", justifyContent: "center"}}>
          <Text text={text} color={colors.dim}></Text>
        </View>
        }
      </Pressable>
  )
})

