import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TouchableOpacity, View, ViewStyle } from "react-native"
import { Modal, Button } from "native-base"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { IconsApp, Screen, Text } from "../components"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import { HStack } from "native-base"
const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width
const rectDimensions = SCREEN_WIDTH * 0.65 // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005 // this is equivalent to 2 from a 393 device width
const rectBorderColor = "blue"

const scanBarWidth = SCREEN_WIDTH * 0.46 // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025 //this is equivalent to 1 from a 393 device width
const scanBarColor = "blue"
const overlayColor = "rgba(0,0,0,0.2)"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Qr: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Qr" component={QrScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const QrScreen: FC<StackScreenProps<AppStackScreenProps, "Qr">> = observer(
  function QrScreen() {
    // Pull in one of our MST stores
    const { deviceStore } = useStores()
    const [isModal, setIsModal] = useState<boolean>(false)
    const [device, setDevice] = useState<object>({})

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const onSuccess = async (e) => {
      // Linking.openURL(e.data).catch(err =>
      //   console.error('An error occured', err)
      // );
      console.log("Thông tin quét được là: ", e.data)
      const deviceInfo = await deviceStore.getDevicebyQr(e.data)
      console.log(deviceInfo)
      setDevice(deviceInfo)
      setIsModal(true)
    }

    return (
        <Screen preset="auto">
          {!isModal && <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            // topContent={
            // <HStack style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
            //    <IconsApp icon={<Ionicons name="chevron-back" size={30} color="black" />} />
            //    <IconsApp icon={<Entypo name="thunder-cloud" size={30} color="black" />}/>
            // </HStack>

            // }

            customMarker={
              <View style={styles.rectangleContainer}>
                <View style={styles.topOverlay}></View>

                <View style={{ flexDirection: "row" }}>
                  <View style={styles.leftAndRightOverlay} />

                  <View style={styles.rectangle}>
                    {/* <IconsApp
                    icon={<AntDesign name="qrcode" size={24} color="black" />}
                    /> */}
                  </View>

                  <View style={styles.leftAndRightOverlay} />
                </View>

                <View style={styles.bottomOverlay} />
              </View>
            }
            reactivate={true}
            reactivateTimeout={1000}
            showMarker={true}
            // bottomContent={
            //   <TouchableOpacity style={styles.buttonTouchable}>
            //     <Text style={styles.buttonText}>Try again</Text>
            //   </TouchableOpacity>
            // }
            cameraType={"back"} // cam truoc hay sau default la sau
            markerStyle={{
              borderColor: "#2498c9",
              //borderRadius:10,
              borderStartColor: "blue",
            }}
            cameraContainerStyle={{
              // ben trong
              backgroundColor: "red",
            }}
            cameraStyle={{
              height: SCREEN_HEIGHT,
            }}
            containerStyle={{
              backgroundColor: "gray", // ben ngoai
            }}
          />}
          {isModal && (
            <Modal
              isOpen={isModal}
              onClose={() => setIsModal(false)}
              avoidKeyboard
              justifyContent="center"
              size="lg"
            >
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Thông tin thiết bị</Modal.Header>
                <Modal.Body>
                  <Text
                    style={{ color: "black" }}
                    text={`Tên thiết bị: ${device['result']['data']['name']}`}
                  />
                  <Text
                    style={{ color: "black" }}
                    text={`Bộ phận quản lí: ${device['result']['data']['bo_phan']}`}
                  />
                  <Text
                    style={{ color: "black" }}
                    text={`Giá: ${device['result']['data']['gia']}`}
                  />
                  <Text
                    style={{ color: "black" }}
                    text={`Ngày nhập: ${device['result']['data']['date']}`}
                  />
                  <Text
                    style={{ color: "black" }}
                    text={`Chi tiết: ${device['result']['data']['name']}`}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    flex="1"
                    onPress={() => {
                      setIsModal(false)
                    }}
                  >
                    Xác nhận
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          )}
        </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
  backgroundColor: "#2498c9",
}
const $container: ViewStyle = {
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
}
const styles = {
  centerText: {
    padding: 32,

    // color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 30,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    // padding: 16,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: overlayColor,
  },
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0,0,0,0.2)",
    borderRadius: 10,
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: SCREEN_WIDTH * 0.5
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    // paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
}
{
  /* <View style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                  <IconsApp icon={<AntDesign name="back" size={30} color="black" />} />
                  <Text style={styles.buttonText}>OK. Got it!</Text>
                </View> */
}
