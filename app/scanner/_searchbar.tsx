import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Modal, StatusBar, SafeAreaView, Alert, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { BarcodeScanningResult } from 'expo-camera';

import { getScanFrameSize, ScanMode } from '../../utils/constant';
import SearchInput from '../(tabs)/Home/searchinput';
import CameraHeader from './CameraHeader';
import ScanModeToggle from './ScanModeToggle';
import ScanningFrame from './ScanFrame';
import CameraControls from './cameracontrol';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onProductScanned?: (data: any) => void;
  onQRScanned?: (data: BarcodeScanningResult) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Find your favorite items",
  onSearch,
  onProductScanned,
  onQRScanned,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scanMode, setScanMode] = useState<ScanMode>('product');
  const [cameraReady, setCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cameraRef = useRef<any>(null);

  // Memoized values for performance
  const scanFrameSize = useMemo(() => getScanFrameSize(), []);
  const qrFrameSize = useMemo(() => scanFrameSize * 0.8, [scanFrameSize]);

  const openCamera = useCallback(async () => {
    if (!permission) return;

    if (!permission.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        Alert.alert(
          "Camera Permission Required",
          "Please allow camera access to scan products and QR codes.",
          [{ text: "OK", style: "default" }]
        );
        return;
      }
    }

    setCameraVisible(true);
    setCameraReady(false);
  }, [permission, requestPermission]);

  const closeCamera = useCallback(() => {
    setCameraVisible(false);
    setIsProcessing(false);
    setCameraReady(false);
  }, []);

  const onBarcodeScanned = useCallback((barcodeResult: BarcodeScanningResult) => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (onQRScanned) {
      onQRScanned(barcodeResult);
    } else {
      Alert.alert(
        "QR Code Scanned",
        `Content: ${barcodeResult.data}`,
        [{ text: "OK", onPress: closeCamera }]
      );
    }
  }, [isProcessing, onQRScanned, closeCamera]);


  const onPictureTaken = useCallback(async () => {
    if (isProcessing || !cameraReady) return;
    setIsProcessing(true);

    try {
      if (onProductScanned) {
        onProductScanned({ timestamp: Date.now() });
      } else {
        Alert.alert(
          "Product Scanned",
          "Processing product information...",
          [{ text: "OK", onPress: closeCamera }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to process product scan");
      console.error('Product scan error:', error);
    }
  }, [isProcessing, cameraReady, onProductScanned, closeCamera]);

  const showHelp = useCallback(() => {
    const helpText = scanMode === 'product'
      ? "Product Scanning:\n\n• Position the product clearly within the frame\n• Ensure good lighting\n• Tap the capture button to scan\n• You can also select from gallery"
      : "QR Code Scanning:\n\n• Center the QR code within the frame\n• Hold steady for automatic detection\n• Ensure the code is clearly visible\n• Good lighting improves accuracy";

    Alert.alert("Scanning Help", helpText, [{ text: "Got it", style: "default" }]);
  }, [scanMode]);

  const openGallery = useCallback(async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Gallery Permission Required",
          "Please allow gallery access to select images.",
          [{ text: "OK", style: "default" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        setIsProcessing(true);
        const message = scanMode === 'product'
          ? "Processing product from image..."
          : "Scanning QR code from image...";

        Alert.alert("Processing", message, [{ text: "OK", onPress: closeCamera }]);
      }
    } catch (error) {
      Alert.alert("Error", "Could not access gallery");
      console.error('Gallery error:', error);
    }
  }, [scanMode, closeCamera]);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  }, [searchQuery, onSearch]);

  const changeScanMode = useCallback((mode: ScanMode) => {
    setScanMode(mode);
    setIsProcessing(false);
  }, []);

  return (
    <>
      <SearchInput
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
        onCameraPress={openCamera}
      />

      <Modal
        visible={cameraVisible}
        animationType="slide"
        statusBarTranslucent
        presentationStyle="fullScreen"
      >
        <StatusBar hidden />
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onCameraReady={() => setCameraReady(true)}
          barcodeScannerSettings={{
            barcodeTypes: [
              'qr', 'pdf417', 'aztec', 'ean13', 'ean8',
              'upc_e', 'upc_a', 'code39', 'code93',
              'code128', 'codabar', 'itf14', 'datamatrix'
            ],
          }}
          onBarcodeScanned={scanMode === 'qr' ? onBarcodeScanned : undefined}
        >
          <SafeAreaView style={styles.cameraOverlay}>
            <CameraHeader
              scanMode={scanMode}
              onClose={closeCamera}
              onHelp={showHelp}
            />

            <ScanModeToggle
              scanMode={scanMode}
              onModeChange={changeScanMode}
            />

            <ScanningFrame
              scanMode={scanMode}
              frameSize={scanMode === 'qr' ? qrFrameSize : scanFrameSize}
              isProcessing={isProcessing}
            />

            <CameraControls
              scanMode={scanMode}
              cameraReady={cameraReady}
              isProcessing={isProcessing}
              onGalleryPress={openGallery}
              onCapturePress={onPictureTaken}
              onHelpPress={showHelp}
            />
          </SafeAreaView>
        </CameraView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default SearchBar;