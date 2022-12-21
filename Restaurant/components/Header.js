import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header(props) {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.nameText}>Arno Princeston Pan</Text>
                <Text style={styles.text}>{props.headerDisplay}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    logo: {
        width: 80,
        height: 35,
    },
    text: {
        fontSize: 22,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    nameText:{
        fontSize: 24,
    }
});
