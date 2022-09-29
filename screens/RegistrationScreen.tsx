import { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register, resetError } from '../features/auth/auth';
import { Button, Input, Loader } from '../components';

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const headerHeight = useHeaderHeight();

  const { errors, loading, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleRegister = () => {
    Keyboard.dismiss();
    dispatch(register(inputs));
  };

  useEffect(() => {
    // @ts-ignore
    user && navigation.navigate('Home');
  }, [user]);

  const handleOnchange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : undefined}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: '#fff', flex: 1 }}
    >
      <StatusBar style="dark" />
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: '#333', fontSize: 40, fontWeight: 'bold' }}>
          Регистрация
        </Text>
        <Text style={{ color: '#BABBC3', fontSize: 18, marginVertical: 10 }}>
          Введи ваши данные для регистрации
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
            value={inputs.username}
            onChangeText={(text) => handleOnchange(text, 'username')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'username' }))
            }
            iconName="account-outline"
            label="Полное Имя"
            placeholder="Ваше полное имя"
            error={errors.username}
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
          <Input
            value={inputs.confirmPassword}
            onChangeText={(text) => handleOnchange(text, 'confirmPassword')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'confirmPassword' }))
            }
            iconName="lock-outline"
            label="Потворите пароль"
            placeholder="Ваш пароль еще раз"
            error={errors.confirmPassword}
            password
          />
          <Button title="Регистрация" onPress={handleRegister} />
          <Text
            // @ts-ignore
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#333',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Уже зарегистрированы? Войти
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
