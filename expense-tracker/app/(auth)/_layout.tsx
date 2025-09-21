import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});
export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  useEffect(() => {
    if (isLoaded) SplashScreen.hideAsync();
  }, [isLoaded]);
  if (!isLoaded) return null;
  if (isSignedIn) {
    return <Redirect href="/" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          animation: "fade",
          animationDuration: 200,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          animation: "fade",
          animationDuration: 200,
        }}
      />
    </Stack>
  );
}
