import CreateTransactionHeader from "@/components/CreateTransactionHeader";
import CATEGORY_ICONS from "@/constants/category-icons";
import useCreateTransaction from "@/hooks/mutations/useCreateTransaction";
import useCreateTransactionForm from "@/hooks/useCreateTransactionForm";
import { TransactionSchema } from "@/lib/validation";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useWatch } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateTransaction() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useCreateTransactionForm();
  const { mutate: createTransaction, isPending } = useCreateTransaction();
  const onSubmit = (data: TransactionSchema) => {
    createTransaction(data);
  };
  const [transactionType, category] = [
    useWatch({
      control,
      name: "transactionType",
      defaultValue: "income",
    }),
    useWatch({
      control,
      name: "category",
      defaultValue: "Other",
    }),
  ];
  const handleTransactionTypeChange = (
    type: TransactionSchema["transactionType"]
  ) => {
    setValue("transactionType", type, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleCategoryChange = (category: TransactionSchema["category"]) => {
    setValue("category", category, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  return (
    <View className="flex-1">
      <CreateTransactionHeader
        onSave={handleSubmit(onSubmit)}
        isPending={isPending}
      />
      <View className="px-4 py-5 flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-white rounded-2xl  p-6 border border-gray-100"
          accessible={true}
          accessibilityLabel="Transaction form"
          keyboardShouldPersistTaps="handled"
        >
          <View
            className="flex-row items-center justify-between gap-x-4 mb-6"
            accessible={true}
            accessibilityRole="radiogroup"
            accessibilityLabel="Select transaction type"
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleTransactionTypeChange("expense")}
              className={`flex-row flex-1 items-center justify-center gap-x-3 py-4 px-4 rounded-2xl border-2  ${
                transactionType === "expense"
                  ? "bg-red-50 border-red-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: transactionType === "expense" }}
              accessibilityLabel="Expense transaction"
              accessibilityHint="Select to create an expense transaction"
            >
              <Ionicons
                name="arrow-down-circle"
                size={26}
                color={transactionType === "expense" ? "#dc2626" : "#6b7280"}
              />
              <Text
                className={`text-lg font-bold ${
                  transactionType === "expense"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleTransactionTypeChange("income")}
              className={`flex-row flex-1 items-center justify-center gap-x-3 py-4 px-4 rounded-2xl border-2  ${
                transactionType === "income"
                  ? "bg-green-50 border-green-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: transactionType === "income" }}
              accessibilityLabel="Income transaction"
              accessibilityHint="Select to create an income transaction"
            >
              <Ionicons
                name="arrow-up-circle"
                size={26}
                color={transactionType === "income" ? "#16a34a" : "#6b7280"}
              />
              <Text
                className={`text-lg font-bold ${
                  transactionType === "income"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mb-4">
            <View
              className="flex-row items-center px-5 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 mt-1"
              accessible={true}
              accessibilityLabel="Transaction amount input"
            >
              <Text
                className="text-4xl font-bold text-gray-700 mr-3"
                accessible={false}
              >
                $
              </Text>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 font-bold text-4xl text-gray-800 outline-none"
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor="#9ca3af"
                    accessible={true}
                    accessibilityLabel="Enter transaction amount in dollars"
                    accessibilityHint="Enter the amount without dollar sign"
                    returnKeyType="next"
                    onBlur={onBlur}
                    onChangeText={(val) => {
                      onChange(parseFloat(val) || 0);
                    }}
                    maxLength={10}
                    value={value.toString()}
                  />
                )}
              />
            </View>
            {errors.amount && (
              <Text
                className="text-sm text-red-500 m"
                accessible={true}
                accessibilityLabel={`Error: ${errors.amount.message}`}
              >
                {errors.amount.message}
              </Text>
            )}
          </View>
          <View className="mb-6">
            <View
              className="flex-row items-center px-5 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 mb-1 "
              accessible={true}
              accessibilityLabel="Transaction title input"
            >
              <Ionicons
                name="create-outline"
                size={24}
                color="#6b7280"
                style={{ marginRight: 12 }}
              />
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="What's this transaction for?"
                    placeholderTextColor="#9ca3af"
                    className="flex-1 text-lg text-gray-800 outline-none"
                    accessible={true}
                    accessibilityLabel="Enter transaction title"
                    accessibilityHint="Describe what this transaction is for"
                    returnKeyType="done"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.title && (
              <Text
                className="text-sm text-red-500"
                accessible={true}
                accessibilityLabel={`Error: ${errors.title.message}`}
              >
                {errors.title.message}
              </Text>
            )}
          </View>

          <View className=" mt-3">
            <View
              className="flex-row items-center mb-4"
              accessible={true}
              accessibilityRole="header"
              accessibilityLabel="Category selection"
            >
              <Ionicons
                name="pricetag-outline"
                size={22}
                color="#374151"
                style={{ marginRight: 8 }}
              />
              <Text className="text-xl font-bold text-gray-800">Category</Text>
            </View>
            <View className="flex-row flex-wrap items-center gap-x-3 gap-y-2 mt-3">
              {Object.keys(CATEGORY_ICONS).map((categoryKey) => {
                const currentCategory =
                  categoryKey as keyof typeof CATEGORY_ICONS;
                const iconName = CATEGORY_ICONS[currentCategory];
                const isSelected = category === currentCategory;
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleCategoryChange(currentCategory)}
                    className={`flex-row items-center gap-x-3 px-4 py-3 rounded-2xl border-2 min-w-[120px] ${
                      isSelected
                        ? "bg-brand-50 border-brand-400"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    accessible={true}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    accessibilityLabel={`${currentCategory} category`}
                    accessibilityHint={`Select ${currentCategory} as transaction category`}
                    key={currentCategory}
                  >
                    <Ionicons
                      name={iconName}
                      size={20}
                      color={isSelected ? "#7a4532" : "#6b7280"}
                    />
                    <Text
                      className={`font-medium ${
                        isSelected ? "text-brand-600" : "text-gray-700"
                      }`}
                      numberOfLines={1}
                    >
                      {currentCategory}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
