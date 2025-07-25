import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text, Dimensions, Alert } from "react-native";
import { EvilIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { BarcodeScanningResult } from 'expo-camera';

const { width } = Dimensions.get('window');

const SearchBar = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scanMode, setScanMode] = useState<'product' | 'qr'>('product');
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = React.useRef(null);

  const openCamera = async () => {
    if (!permission) return;

    if (!permission.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Camera permission is required to scan.");
        return;
      }
    }

    setCameraVisible(true);
  };

  const closeCamera = () => setCameraVisible(false);


  const onBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    Alert.alert("Scanned", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: closeCamera },
    ]);
  };

  const onPictureTaken = () => {
    Alert.alert("Product Scanned", "Processing image...", [
      { text: "OK", onPress: closeCamera },
    ]);
  };

  const showHelp = () => {
    Alert.alert(
      "Help",
      scanMode === 'product'
        ? "To scan a product:\n\n1. Frame it\n2. Tap the camera button"
        : "To scan a QR code:\n\n1. Frame it\n2. It scans automatically",
      [{ text: "OK" }]
    );
  };

  const openGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Please allow gallery access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        Alert.alert(
          scanMode === 'product' ? "Processing product..." : "Scanning QR code...",
          "",
          [{ text: "OK", onPress: closeCamera }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not open gallery.");
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <EvilIcons name="search" size={22} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Find your favorite items"
          placeholderTextColor="#999"
          selectionColor="#FF6B35"
        />
        <TouchableOpacity onPress={openCamera}>
          <MaterialCommunityIcons name="image-filter-center-focus" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={cameraVisible} animationType="slide">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          onCameraReady={() => setCameraReady(true)}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417', 'aztec', 'ean13', 'ean8', 'upc_e', 'upc_a', 'code39', 'code93', 'code128', 'codabar', 'itf14', 'datamatrix'],
          }}
          onBarcodeScanned={scanMode === 'qr' ? onBarcodeScanned : undefined}
        >
          <View style={styles.cameraHeader}>
            <TouchableOpacity onPress={closeCamera} style={styles.headerButton}>
              <MaterialCommunityIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {scanMode === 'product' ? 'Scan Product' : 'Scan QR Code'}
            </Text>
            <View style={styles.headerButton} /> {/* Empty right button */}
          </View>

          <View style={styles.modeToggle}>
            <TouchableOpacity
              style={[styles.modeButton, scanMode === 'product' && styles.activeModeButton]}
              onPress={() => setScanMode('product')}
            >
              <MaterialCommunityIcons
                name="cube-scan"
                size={20}
                color={scanMode === 'product' ? '#FF6B35' : '#fff'}
              />
              <Text style={[styles.modeText, scanMode === 'product' && styles.activeModeText]}>
                Product
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, scanMode === 'qr' && styles.activeModeButton]}
              onPress={() => setScanMode('qr')}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={20}
                color={scanMode === 'qr' ? '#FF6B35' : '#fff'}
              />
              <Text style={[styles.modeText, scanMode === 'qr' && styles.activeModeText]}>
                QR Code
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scanningContainer}>
            <View style={[
              styles.scanningFrame,
              scanMode === 'qr' && styles.qrScanningFrame
            ]}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {scanMode === 'product' && <View style={styles.scanLine} />}

              {scanMode === 'qr' && (
                <View style={styles.qrIndicator}>
                  <MaterialCommunityIcons name="qrcode" size={40} color="rgba(255,107,53,0.6)" />
                </View>
              )}
            </View>

            <Text style={styles.instructionText}>
              {scanMode === 'product'
                ? 'Position the product within the frame'
                : 'Center the QR code within the frame'}
            </Text>
            <Text style={styles.subInstructionText}>
              {scanMode === 'product'
                ? 'Make sure the product is well-lit and clearly visible'
                : 'QR code will be scanned automatically'}
            </Text>
          </View>

          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
              <Ionicons name="images" size={24} color="#fff" />
              <Text style={styles.controlButtonText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={scanMode === 'product' ? onPictureTaken : undefined}
              disabled={scanMode === 'qr'}
            >
              <View style={[
                styles.captureButtonInner,
                scanMode === 'qr' && styles.captureButtonDisabled
              ]}>
                {scanMode === 'product' ? (
                  <MaterialCommunityIcons name="camera" size={24} color="#333" />
                ) : (
                  <MaterialCommunityIcons name="qrcode-scan" size={24} color="#999" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpButton} onPress={showHelp}>
              <Ionicons name="help-circle" size={24} color="#fff" />
              <Text style={styles.controlButtonText}>Help</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    borderWidth: 0,
    borderColor: "transparent",
    outlineWidth: 0,
  },
  // Camera UI Styles
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modeToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeModeButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  modeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  activeModeText: {
    color: '#FF6B35',
  },
  scanningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  scanningFrame: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
    marginBottom: 40,
  },
  qrScanningFrame: {
    width: width * 0.6,
    height: width * 0.6,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FF6B35',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FF6B35',
    top: '50%',
    opacity: 0.8,
  },
  qrIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  instructionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subInstructionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  galleryButton: {
    alignItems: 'center',
    flex: 1,
  },
  helpButton: {
    alignItems: 'center',
    flex: 1,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default SearchBar;