import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}
const Button: React.FC<ButtonProps> = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: "#333",
        borderRadius: 4,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
