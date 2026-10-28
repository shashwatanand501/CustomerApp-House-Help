import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Banner from '../../../src/components/common/Banner/Banner';
import CustomButton from '../../../src/components/common/CustomButton/CustomButton';
import { BannerItem, ImageBanner } from '../../../src/components/common/ImageBanner/ImageBanner';
import { ServiceBookingSheet } from '../../../src/components/common/ServiceBookingSheet/ServiceBookingSheet';
import { AVAILABLE_SERVICES, ServiceDetail } from '../../../src/types/booking';

const img1 = require('../../../assets/images/1.png');
const img2 = require('../../../assets/images/2.png');
const img3 = require('../../../assets/images/3.png');

const IMG_ARR: BannerItem[] = [
  {
    header: 'Quick 1-Hour Cleaning',
    subHeader: 'Verified helpers available near you',
    img: img1,
  },
  {
    header: 'Kitchen Deep Clean',
    subHeader: 'Disinfection & sparkling finish',
    img: img2,
  },
  {
    header: 'Home Cook on Demand',
    subHeader: 'Freshly prepared meals at your schedule',
    img: img3,
  },
];

export default function HomeScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  const handleServiceClick = (service: ServiceDetail) => {
    setActiveService(service);
    sheetRef.current?.expand();
  };

  const handleBookingConfirm = (payload: any) => {
    console.log('Dispatch booking action with payload:', payload);
    sheetRef.current?.close();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner with #ce2626e2 gradient */}
        <Banner
          badgeText="HELP ON TIME"
          title="A little help, right when you need it."
          subtitle="Choose a service and request an hourly visit."
        />

        {/* Dynamic Services Grid */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionHeading}>Choose a Service</Text>

          <View style={styles.grid}>
            {AVAILABLE_SERVICES.map((item) => {
              const isSelected = activeService?.id === item.id;
              return (
                <CustomButton
                  key={item.id}
                  title={item.name}
                  serviceType={item.type}
                  variant={isSelected ? 'primary' : 'outline'}
                  size="md"
                  style={styles.gridButton}
                  onPress={() => handleServiceClick(item)}
                />
              );
            })}
          </View>

          {/* Pass data-driven banners */}
          <View style={styles.bannerSection}>
            <ImageBanner banners={IMG_ARR} />
          </View>
        </View>
      </ScrollView>

      {/* Reusable Data-Driven Bottom Sheet */}
      <ServiceBookingSheet
        ref={sheetRef}
        service={activeService}
        onConfirmBooking={handleBookingConfirm}
        onClose={() => setActiveService(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  scrollContent: { padding: 16, paddingBottom: 110 },
  servicesSection: { marginTop: 14 },
  sectionHeading: { fontSize: 17, fontWeight: '700', color: '#1C1917', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridButton: { flexBasis: '48%', flexGrow: 1 },
  bannerSection: { marginTop: 12 },
});