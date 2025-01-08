import { ApplicationSettings } from '@nativescript/core';

const PLAYER_KEY = 'player';

export function savePlayer(player) {
    try {
        ApplicationSettings.setString(PLAYER_KEY, JSON.stringify(player));
        console.log('Oyuncu kaydedildi:', player.name);
        return true;
    } catch (error) {
        console.error('Oyuncu kaydedilemedi:', error);
        return false;
    }
}

export function loadPlayer() {
    try {
        const playerData = ApplicationSettings.getString(PLAYER_KEY);
        if (!playerData) {
            console.log('Kayıtlı oyuncu bulunamadı!');
            return null;
        }
        const player = JSON.parse(playerData);
        console.log('Kayıttan yüklenen oyuncu:', player.name);
        return player;
    } catch (error) {
        console.error('Oyuncu yüklenemedi:', error);
        return null;
    }
}

export function clearPlayer() {
    ApplicationSettings.remove(PLAYER_KEY);
    console.log('Kayıt silindi mi?:', !ApplicationSettings.hasKey(PLAYER_KEY));
    return !ApplicationSettings.hasKey(PLAYER_KEY);
}