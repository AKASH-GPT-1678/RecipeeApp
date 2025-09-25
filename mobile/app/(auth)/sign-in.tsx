import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons"
const SignUp = () => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSignIn = async () => {
        if (!isLoaded) return;
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields")
            return;
        }
        if (loading) return;

        setLoading(true);

        try {
            const signInAttempt = await signIn?.create({
                identifier: email,
                password
            });

            if (signInAttempt?.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
            }
            else {
                Alert.alert("Error", "Sign in failed , Please try again")

            }

        } catch (error) {

        }
        finally {
            setLoading(false);

        }
    }

    return (
        <View style={authStyles.container}>


            <KeyboardAvoidingView
                style={authStyles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}


            >
                <ScrollView
                    contentContainerStyle={authStyles.scrollContent}
                    showsVerticalScrollIndicator={false}

                >
                    <View style={authStyles.imageContainer}>
                        <Image
                            source={require("../../assets/images/i1.png")}
                            style={authStyles.image}

                            contentFit='contain'


                        />

                    </View>

                    <Text style={authStyles.title}>Welcome Back</Text>

                    <View style={authStyles.formContainer}>
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder='Enter email'
                                placeholderTextColor={COLORS.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                                autoCapitalize='none'


                            />
                        </View>
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder='Enter password'
                                placeholderTextColor={COLORS.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                               
                                autoCapitalize='none'


                            />

                            <TouchableOpacity
                            style={authStyles.eyeButton}
                            onPress={()=> setShowPassword(!showPassword)}
                            
                            
                            
                            >
                                <Ionicons 
                                name={showPassword ? "eye-outline" :"eye-off-outline"}
                                size={20}
                                color={COLORS.textLight}
                                
                                
                                />
                                
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                        style={[authStyles.authButton , loading && authStyles.buttonDisabled]}
                        onPress={handleSignIn}
                        disabled={loading}
                        activeOpacity={0.8}

                        
                        
                        >
                            <Text style={authStyles.buttonText}>
                                {
                                    loading ? "Signing in" : "Sign In"
                                }

                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                        style={authStyles.linkContainer}
                        onPress={()=> router.push("/(tabs)")}
                        
                        
                        >
                            <Text style={authStyles.linkText}>
                                Don&apos;t have and account?
                                <Text style={authStyles.link}> Sign Up</Text>

                            </Text>

                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({})