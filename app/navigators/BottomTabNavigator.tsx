import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, IconsApp } from "../components"
import { translate } from "../i18n"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen } from "../screens"
import {HomeScreen,SettingScreen,QrScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { MaterialCommunityIcons,MaterialIcons ,Ionicons   } from "@expo/vector-icons"

export type BottomTabParamList = {
//   DemoCommunity: undefined
//   DemoShowroom: { queryIndex?: string; itemIndex?: string }
//   DemoDebug: undefined
//   DemoPodcastList: undefined
  HomeScreen:undefined
  SettingScreen:undefined
  QrScreen:undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<BottomTabParamList>()

export function BottomTabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("demoNavigator.HomeTab"),
          tabBarIcon: ({ focused }) => <IconsApp icon={<MaterialCommunityIcons name={"shield-home"} size={25} color={focused && colors.tint}/>} />,
        }}
      />

      <Tab.Screen
        name="QrScreen"
        component={QrScreen}
        options={{
          tabBarLabel: translate("demoNavigator.QRTab"),
          tabBarIcon: ({ focused }) => <IconsApp icon={<MaterialIcons name="qr-code-scanner" size={24} color={focused && colors.tint} />} />,
        }}
      />

      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: translate("demoNavigator.Setting"),
          tabBarIcon: ({ focused }) => <IconsApp icon={<Ionicons name="md-settings-outline" size={24} color={focused && colors.tint}/>} />,
        }}
      />

      {/* <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => <Icon icon="debug" color={focused && colors.tint} />,
        }}
      /> */}
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
