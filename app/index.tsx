import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  return (
<SafeAreaView className="flex-1 items-center justify-center">
  <Text className="text-red-500">Hello world nice to meet you</Text>
</SafeAreaView>
  );
}
