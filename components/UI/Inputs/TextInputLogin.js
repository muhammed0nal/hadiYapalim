import { forwardRef } from "react";
import { TextInput } from "react-native";

const TextInputLogin = forwardRef(({ style, ...props }, ref) => (
  <TextInput {...props} ref={ref} style={style} />
));

export default TextInputLogin;
