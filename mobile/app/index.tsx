import { Text, View } from "react-native";
import SignUp from "./(auth)/sign-in";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <SignUp/>
    </View>
  );
}
