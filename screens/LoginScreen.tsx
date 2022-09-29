import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, resetError } from '../features/auth/auth';
import { Button, Input, Loader } from '../components';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { errors, loading, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    user && navigation.navigate('Home');
  }, [user]);

  const handleLogin = () => {
    Keyboard.dismiss();
    dispatch(login(inputs));
    setInputs({
      email: '',
      password: '',
    });
  };

  const handleOnchange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar style="dark" />
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: '#333', fontSize: 40, fontWeight: 'bold' }}>
          Войти
        </Text>
        <Text style={{ color: '#BABBC3', fontSize: 18, marginVertical: 10 }}>
          Введите ваши данные
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            value={inputs.email}
            onChangeText={(text) => handleOnchange(text, 'email')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'email' }))
            }
            iconName="email-outline"
            label="E-mail"
            placeholder="Ваш e-mail адрес"
            error={errors.email}
          />
          <Input
            value={inputs.password}
            onChangeText={(text) => handleOnchange(text, 'password')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'password' }))
            }
            iconName="lock-outline"
            label="Пароль"
            placeholder="Ваш пароль"
            error={errors.password}
            password
          />

          <Button title="Войти" onPress={handleLogin} />
          <Text
            // @ts-ignore
            onPress={() => navigation.navigate('Register')}
            style={{
              color: '#333',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            У вас нет аккаунта? Регистрация
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
