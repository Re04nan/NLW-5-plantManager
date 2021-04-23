import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { PlantProps, loadPlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>();
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<String>();

    useEffect(()=>{
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();
            // calcular distância de uma data pra outra
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
            );

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    },[]);

    return(
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={item}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{}}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantTitle: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
});
