import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

// --- (NOTA: La prop 'navigation' se usa para cambiar de pantalla en React Native) ---
const WelcomeScreen = ({ navigation }) => {

    // Función que maneja la acción de pulsar el botón de registro
    const handleRegisterPress = (userType) => {
        // Por ahora, solo mostraremos el tipo de usuario, 
        // pero luego esto nos llevará a una pantalla de registro con un formulario.
        console.log(`Navegando a Registro como: ${userType}`);
        
        // **FUTURO:** Aquí se usaría: navigation.navigate('Register', { type: userType });
    };

    return (
        // SafeAreaView asegura que el contenido no se oculte detrás de la barra de estado
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>¡Bienvenido a Tu App de Contratistas!</Text>
                <Text style={styles.subtitle}>Encuentra profesionales o expón tu trabajo.</Text>
            </View>

            <View style={styles.buttonContainer}>
                {/* Botón para registrarse como Cliente */}
                <TouchableOpacity 
                    style={[styles.button, styles.clientButton]}
                    onPress={() => handleRegisterPress('Cliente')}
                >
                    <Text style={styles.buttonText}>Soy un Cliente (Buscar Contratistas)</Text>
                </TouchableOpacity>

                {/* Botón para registrarse como Proveedor/Contratista */}
                <TouchableOpacity 
                    style={[styles.button, styles.providerButton]}
                    onPress={() => handleRegisterPress('Contratista')}
                >
                    <Text style={styles.buttonText}>Soy un Contratista (Ofrecer Servicios)</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.loginArea}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity 
                    // **FUTURO:** navigation.navigate('Login');
                    onPress={() => console.log('Navegando a Iniciar Sesión')}
                >
                    <Text style={styles.loginLink}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

// --- (ESTILOS: Define cómo se verá la pantalla) ---
const styles = StyleSheet.create({
    container: {
        flex: 1, // Hace que el contenedor ocupe toda la pantalla
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribuye el contenido verticalmente
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '90%',
        paddingVertical: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    clientButton: {
        backgroundColor: '#007AFF', // Azul para Clientes
    },
    providerButton: {
        backgroundColor: '#4CD964', // Verde para Contratistas
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    loginArea: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
        color: '#666666',
        marginRight: 5,
    },
    loginLink: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: 'bold',
    }
});

export default WelcomeScreen;
