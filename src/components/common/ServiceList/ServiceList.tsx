import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton, { ServiceType } from "../CustomButton/CustomButton";
interface ServiceItem {
    id: string;
    name: string;
    type: ServiceType;
}

const SERVICES: ServiceItem[] = [
    { id: '1', name: 'Deep Cleaning', type: 'deepcleaning' },
    { id: '2', name: 'Kitchen Cleaning', type: 'kitchencleaning' },
    { id: '3', name: 'Cooking', type: 'Cooking' },
    { id: '4', name: 'Dusting', type: 'Dusting' },
    { id: '5', name: 'Washroom Cleaning', type: 'WashroomCleaning' },
];
export function ServiceList() {
    const [selectedService, setSelectedService] = useState('1');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a service</Text>

            <View style={styles.grid}>
                {SERVICES.map((service) => {
                    const isSelected = selectedService === service.id;
                    return (
                        <CustomButton
                            key={service.id}
                            title={service.name}
                            serviceType={service.type}
                            variant={isSelected ? 'primary' : 'outline'}
                            size="md"
                            style={styles.gridItem}
                            onPress={() => setSelectedService(service.id)}
                        />
                    );
                })}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1917',
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        width: '100%',
    },
    gridItem: {
        flexBasis: '48%', // 2 per row
        flexGrow: 1,
    },
});