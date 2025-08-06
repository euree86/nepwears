import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: deviceWidth } = Dimensions.get('window');

interface Step {
    id: string | number;
    title: string;
    completed: boolean;
}

interface OrderProgressTrackerProps {
    steps: Step[];
}

const OrderProgressTracker: React.FC<OrderProgressTrackerProps> = ({ steps }) => {
    const getStepIcon = (step: Step) => (step.completed ? '✓' : '');
    const getStepColor = (step: Step) => (step.completed ? '#FC0079' : '#E5E7EB');

    return (
        <View style={styles.wrapper}>
            <View style={styles.progressContainer}>
                {steps.map((step: Step, index: number) => (
                    <View key={step.id} style={styles.step}>
                        <View style={[styles.circle, { backgroundColor: getStepColor(step) }]}>
                            <Text style={[styles.icon, { color: step.completed ? 'white' : '#9CA3AF' }]}>
                                {getStepIcon(step)}
                            </Text>
                        </View>
                        <Text
                            style={[styles.label, { color: step.completed ? '#374151' : '#9CA3AF' }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {step.title}
                        </Text>


                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <View
                                style={[
                                    styles.connector,
                                    { backgroundColor: step.completed ? '#FC0079' : '#E5E7EB' },
                                ]}
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const circleSize = 32;
const connectorHeight = 2;
const stepCount = 4; // You can dynamically pass step count or calculate it if needed

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    step: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        zIndex: 2, // on top of connector
    },
    icon: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        maxWidth: 70,

    },

    connector: {
        position: 'absolute',
        top: circleSize / 2 - connectorHeight / 2,
        left: circleSize / 2,
        right: -deviceWidth / (stepCount * 2), // dynamic width depending on device width and step count
        height: connectorHeight,
        zIndex: 1,
    },
});

export default OrderProgressTracker;
