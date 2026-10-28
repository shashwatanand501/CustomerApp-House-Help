import * as Location from 'expo-location';

export interface DetectedAddress {
    line1: string;
    line2: string;
    city: string;
    pincode: string;
}

// Asks for permission, reads the current GPS position and turns it into an address
export async function getCurrentAddress(): Promise<DetectedAddress> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Location permission was denied. Please enter your address manually.');
    }

    const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const [place] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
    });
    if (!place) {
        throw new Error('Could not find an address for your location.');
    }

    const street = [place.streetNumber, place.street].filter(Boolean).join(' ');
    return {
        line1: street || place.name || '',
        line2: place.district || place.subregion || '',
        city: place.city || place.region || '',
        pincode: place.postalCode || '',
    };
}
