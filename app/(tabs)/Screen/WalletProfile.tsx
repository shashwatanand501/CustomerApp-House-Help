import CustomButton from "@/components/common/CustomButton/CustomButton";
import { FormField, FormSheet, FormValues } from "@/components/common/FormSheet/FormSheet";
import { AddressCard } from "@/components/common/Profile/AddressCard";
import { ProfileHeaderCard } from "@/components/common/Profile/ProfileHeaderCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { signOut } from "@/store/slices/authSlice";
import { addAddress, removeAddress, updateProfile } from "@/store/slices/profileSlice";
import { Address, AddressLabel } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROFILE_FIELDS: FormField[] = [
  { key: "name", label: "Full Name", placeholder: "Your name", required: true },
  { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", keyboardType: "phone-pad", required: true },
  { key: "email", label: "Email", placeholder: "you@example.com", keyboardType: "email-address" },
];

const ADDRESS_FIELDS: FormField[] = [
  { key: "label", label: "Save As", type: "options", options: ["Home", "Work", "Other"], required: true },
  { key: "line1", label: "Flat / House No., Building", placeholder: "Flat 302, Green Residency", required: true },
  { key: "line2", label: "Area / Street", placeholder: "Sector 21" },
  { key: "city", label: "City", placeholder: "Gurugram", required: true },
  { key: "pincode", label: "Pincode", placeholder: "122016", keyboardType: "number-pad", required: true },
];

const EMPTY_ADDRESS: FormValues = { label: "Home", line1: "", line2: "", city: "", pincode: "" };

export default function WalletProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.profile.user);
  const addresses = useAppSelector((s) => s.profile.addresses);

  const editSheetRef = useRef<BottomSheet>(null);
  const addressSheetRef = useRef<BottomSheet>(null);

  const profileValues = useMemo<FormValues>(
    () => ({ name: user.name, phone: user.phone, email: user.email }),
    [user]
  );

  const handleSaveProfile = (values: FormValues) => {
    dispatch(updateProfile({ name: values.name, phone: values.phone, email: values.email }));
    editSheetRef.current?.close();
  };

  const handleSaveAddress = (values: FormValues) => {
    dispatch(
      addAddress({
        label: values.label as AddressLabel,
        line1: values.line1,
        line2: values.line2,
        city: values.city,
        pincode: values.pincode,
      })
    );
    addressSheetRef.current?.close();
  };

  const handleDeleteAddress = (address: Address) => {
    Alert.alert("Remove address?", `${address.label}: ${address.line1}`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => dispatch(removeAddress(address.id)) },
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Log out?", "You will need to log in again to book services.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => dispatch(signOut()) },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account?",
      "This permanently deletes your account, saved addresses and order history. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // TODO: call the delete account API before signing out
            dispatch(signOut());
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeaderCard
          name={user.name}
          phone={user.phone}
          email={user.email}
          onEdit={() => editSheetRef.current?.expand()}
        />

        <Text style={styles.sectionHeading}>Saved Addresses</Text>
        <View style={styles.list}>
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} onDelete={handleDeleteAddress} />
          ))}
          {addresses.length === 0 ? <Text style={styles.emptyText}>No saved addresses yet.</Text> : null}
        </View>
        <CustomButton
          title="Add New Address"
          variant="outline"
          size="md"
          leftIcon={<Ionicons name="add" size={18} color="#DE3F1B" />}
          onPress={() => addressSheetRef.current?.expand()}
          style={styles.addButton}
        />

        <Text style={styles.sectionHeading}>Account</Text>
        <CustomButton
          title="Log Out"
          variant="secondary"
          size="md"
          leftIcon={<Ionicons name="log-out-outline" size={18} color="#FFFFFF" />}
          onPress={handleLogout}
        />
        <CustomButton
          title="Delete Account"
          variant="ghost"
          size="md"
          leftIcon={<Ionicons name="trash-outline" size={18} color="#DE3F1B" />}
          onPress={handleDeleteAccount}
          textStyle={styles.deleteText}
          style={styles.deleteButton}
        />
      </ScrollView>

      <FormSheet
        ref={editSheetRef}
        title="Edit Details"
        fields={PROFILE_FIELDS}
        initialValues={profileValues}
        submitTitle="Save Changes"
        onSubmit={handleSaveProfile}
      />

      <FormSheet
        ref={addressSheetRef}
        title="Add New Address"
        subtitle="Your helper will visit this address."
        fields={ADDRESS_FIELDS}
        initialValues={EMPTY_ADDRESS}
        submitTitle="Save Address"
        onSubmit={handleSaveAddress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F8' },
  content: { padding: 16, paddingBottom: 110 },
  sectionHeading: { fontSize: 17, fontWeight: '700', color: '#1C1917', marginTop: 24, marginBottom: 12 },
  list: { gap: 10 },
  emptyText: { fontSize: 13, color: '#78716C' },
  addButton: { marginTop: 12 },
  deleteButton: { marginTop: 8 },
  deleteText: { color: '#DE3F1B' },
});
