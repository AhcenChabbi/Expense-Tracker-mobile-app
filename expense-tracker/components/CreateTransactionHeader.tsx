import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onSave: () => void;
  isPending: boolean;
};
const CreateTransactionHeader = ({ onSave, isPending }: Props) => {
  const router = useRouter();
  const back = () => {
    router.back();
  };
  return (
    <View className="flex-row items-center justify-between px-4 py-3 w-full border-b border-brand-500/50">
      <TouchableOpacity
        onPress={back}
        className="bg-brand-50 border-brand-200 p-2 border rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color={"#7a4532"} />
      </TouchableOpacity>

      <Text className="text-lg font-bold">New Transaction</Text>
      <TouchableOpacity
        disabled={isPending}
        onPress={onSave}
        className="flex-row items-center gap-x-2 "
      >
        {isPending ? (
          <ActivityIndicator size="small" color="#7a4532" />
        ) : (
          <Ionicons name="checkmark" size={20} color={"#7a4532"} />
        )}
        <Text className="text-lg font-semibold text-brand-600">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTransactionHeader;
