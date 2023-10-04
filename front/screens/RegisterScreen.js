import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import {theme} from '../core/theme'
import {emailValidator} from '../helpers/emailValidator'
import {passwordValidator} from '../helpers/passwordValidator'
import {nameValidator} from '../helpers/nameValidator'
import axios from 'axios'
import {BASE_URL} from '../config.js'
export default function RegisterScreen({navigation}) {
    const [nickname, setNickname] = useState({value: '', error: ''})
    const [email, setEmail] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})

    const onSignUpPressed = async () => {
        const nicknameError = nameValidator(nickname.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nicknameError) {
            setNickname({...nickname, error: nicknameError})
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }

        try{
        const response = await axios.post('https://2f78-46-166-60-20.ngrok.io/api/register', {
            nickname: nickname.value,
            email: email.value,
            password: password.value,
        });
        if(response.status == 200){
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
            } else{
                console.error('Unable to register')
            }
        }
        catch (error) {
            console.error('Registration Error', error)
        }
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <View style={{left: 140}}><Logo/></View>

            <View style={{top: 200}}>
                <Header>Create Account</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={nickname.value}
                    onChangeText={(text) => setNickname({value: text, error: ''})}
                    error={!!nickname.error}
                    errorText={nickname.error}
                />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({value: text, error: ''})}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({value: text, error: ''})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{marginTop: 24}}
                >
                    Sign Up
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})