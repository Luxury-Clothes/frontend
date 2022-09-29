import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface InputProps {
  label: string;
  iconName: 'email-outline' | 'lock-outline' | 'account-outline';
  error?: null | string;
  password?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onFocus: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  password,
  value,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? 'red' : isFocused ? '#333' : '#F3F4FB',
            alignItems: 'center',
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          style={{ color: '#333', fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          value={value}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: '#333', flex: 1 }}
          {...props}
        />
        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: '#333', fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: 'red', fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#BABBC3',
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#F3F4FB',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default Input;
