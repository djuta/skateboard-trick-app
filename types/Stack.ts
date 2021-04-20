import { StackScreenProps } from "@react-navigation/stack";
import Trick from "./Trick";
import TrickCategory from "./TrickCategory";

export type RootStackParamList = {
    Home: { tricks: TrickCategory[] };
    Detail: { trick: Trick };
};

export type DetailProps = StackScreenProps<RootStackParamList, "Detail">;
