import { Slot, Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokenCache } from "@clerk/clerk-expo/token-cache"
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView>

      <Slot />
      </SafeAreaView>






    </ClerkProvider>



  )
}
