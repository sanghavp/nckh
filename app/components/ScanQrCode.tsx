import * as React from "react"
import { StyleProp, TextStyle, ViewStyle,TouchableOpacity, Linking } from "react-native"
import { observer } from "mobx-react-lite"
// import { colors, typography } from "../theme"
// import { Text } from "./Text"
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export interface ScanQrCodeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ScanQrCode = observer(function ScanQrCode(props: ScanQrCodeProps) {
  const { style } = props
  const $styles = [$container, style]

  const onSuccess = e => {
    console.log("Thông tin: ",e);
  };


    return (
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
       // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text >wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        reactivate={true}
        reactivateTimeout={1000}
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
        cameraType={"back"} // cam truoc hay sau default la sau
        // containerStyle={{color: "#ffffff"}}
      />
    );
})

const $container: ViewStyle = {
  justifyContent: "center",
}

// const $text: TextStyle = {
//   fontFamily: typography.primary.normal,
//   fontSize: 14,
//   color: colors.palette.primary500,
// }

// const styles = {
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// };
