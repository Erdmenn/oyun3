import { ApplicationSettings } from "@nativescript/core";
import { Player } from "../models/player";
import { skills, positionKeys } from "./skills";

export function generatePlayers(numPlayers) {
    const firstNames = ["Ali", "Ahmet", "Mehmet", "Mustafa", "Can", "Burak", "Emre", "Hakan", "Ozan", "Yusuf"];
    const lastNames = ["Yılmaz", "Demir", "Çelik", "Öztürk", "Arslan", "Şahin", "Kaya", "Aydın", "Yıldız", "Özdemir"];
    
    let lastId = 0;
    try {
        if (ApplicationSettings.hasKey("players")) {
            const existingPlayers = JSON.parse(ApplicationSettings.getString("players"));
            if (existingPlayers.length > 0) {
                lastId = Math.max(...existingPlayers.map(p => p.id));
            }
        }
    } catch (error) {
        console.error('Error getting last player ID:', error);
    }
    
    return Array.from({ length: numPlayers }, (_, i) => {
        const player = new Player(
            lastId + i + 1,
            `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            "Seçilmedi",
            0,
            null,
            []
        );
        
        // Generate random skills
        Object.keys(player.skills).forEach(skill => {
            player.skills[skill] = Math.floor(Math.random() * 100) + 1;
        });
        
        return player;
    });
}

export function calculateOverall(player, position) {
    if (position === "Seçilmedi") return 0;
    
    const positionKey = positionKeys[position];
    if (!positionKey) return 0;
    
    let total = 0;
    let weightSum = 0;
    
    Object.entries(skills).forEach(([skillKey, skillData]) => {
        const weight = skillData[positionKey];
        total += player.skills[skillKey] * weight;
        weightSum += weight;
    });
    
    return Math.round(total / weightSum);
}