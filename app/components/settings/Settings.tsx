import { useState, useEffect } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Box, Center, HStack, ScrollView, Avatar } from "native-base"
import AntDesign from "@expo/vector-icons/AntDesign"
import { observer } from "mobx-react-lite"
import { colors, typography, spacing } from "../../theme"
// import { Text } from "../Text"
import {SkeletonProfileNav, Text, ItemList, SkeletonItemlist} from '../index'

export interface SettingsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Settings = observer(function Settings(props: SettingsProps) {
  const { style } = props
  const styles = [$container, style]
  const [skeleton, setSkeleton] = useState(false);
  return (
    <View style={styles}>
        <ScrollView>
          {skeleton ? (
            <SkeletonProfileNav />
          ) : (
            <Box marginX="10">
              <Box bgColor={colors.background} paddingBottom="5">
                <Center>
                  {/* <PickImage uri={data["avatar"]} update={updateAvatar} /> */}
                  <Avatar bg="amber.500" source={{
                    uri: "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/241188327_2709794319320356_8069975612694885373_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=NIOuIYnozWkAX_hkISa&_nc_ht=scontent.fhan2-4.fna&oh=00_AfBINYWuA025z_xxnGvwnxKKs13UlOjpiAO9gWgkkRcm9Q&oe=646DB6B6",
                  }} size="2xl" maxW={120} maxH={120}>
                    Avatar
                  </Avatar>
                  <HStack alignItems={"center"}>
                    <Text text="Hà Hữu Sáng" />
                    <Text text="  -ID : 19012" />
                  </HStack>
                  <Text text="Tổng giám đốc" />
                </Center>
              </Box>
            </Box>
          )}
          <Text
            tx="settingScreen.user"
            // fontWeight="bold"
            colors={colors.textDim}
            // marginX={"5%"}
            // marginTop={4}
          ></Text>
          <Box>
            {skeleton ? (
              // <SkeletonItemlist icons={true} style={{ width: 300 }} />
              <SkeletonItemlist style={{ width: 300 }} />
            ) : (
              <ItemList
                // tx="settingScreen.employ"
                fontWeight={"bold"}
                // onPress={() => {
                //   navigation.navigate("profileDetails")
                // }}
                arrowRight={true}
                image={true}
                icon={<AntDesign name="user" size={24} colors="black" />}
              />
            )}
          </Box>
          <Text
            tx="settingScreen.settings"
            // fontWeight={"bold"}
            colors={colors.textDim}
            // marginX={"5%"}
            // marginTop={4}
          ></Text>
          {/* <Box>
            <ItemList
              // tx="settingScreen.language"
              fontWeight={"bold"}
              arrowRight={true}
              image={true}
              icon={<AntDesign name="earth" size={24} colors="black" />}
              // onPress={() => {
              //   setChangeLanguage(true)
              // }}
            />
            <ItemList
              tx="settingScreen.changePassword"
              fontWeight={"bold"}
              arrowRight={true}
              image={true}
              icon={<AntDesign name="edit" size={24} colors="black" />}
              // onPress={() => {
              //   setChangePassword(true)
              // }}
            />
            <ItemList
              tx="settingScreen.verInfo"
              fontWeight={"bold"}
              arrowRight={false}
              image={true}
              // text={version}
              icon={<AntDesign name="infocirlceo" size={24} colors="black" />}
            />
            <ItemList
              tx="settingScreen.logout"
              fontWeight={"bold"}
              // onPress={OnlogOut}
              arrowRight={true}
              image={true}
              icon={<AntDesign name="logout" size={24} colors="black" />}
            />
          </Box> */}
          {/* <ModalLoader caption={false} loading={skeleton}/> */}
          {/* {changeLanguage ? (
            <ChangeLanguage
              isChange={true}
              languageStorage={language}
              passing={() => {
                onClose(false)
              }}
            />
          ) : null}
          {changePassword ? (
            <ChangePassword
              isChange={true}
              passing={() => {
                onClose(false)
              }}
            />
          ) : null} */}
          {/* <ToastMessage placement="top" text="OK!"/> */}
        </ScrollView>
      </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

