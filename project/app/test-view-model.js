import { Observable, ApplicationSettings, Frame } from '@nativescript/core';
import { generatePlayers } from './data/mock-players';

export function createViewModel() {
    const viewModel = new Observable();
    
    viewModel.createAndSavePlayer = () => {
        try {
            let players = [];
            if (ApplicationSettings.hasKey("players")) {
                players = JSON.parse(ApplicationSettings.getString("players"));
            }
            
            const newPlayer = generatePlayers(1)[0];
            players.push(newPlayer);
            
            ApplicationSettings.setString("players", JSON.stringify(players));
            console.log(`Added new player. Total players: ${players.length}`);
            alert(`Oyuncu başarıyla eklendi: ${newPlayer.name}`);
        } catch (error) {
            console.error('Error creating player:', error);
            alert('Oyuncu eklenirken bir hata oluştu');
        }
    };
    
    viewModel.goBack = () => {
        Frame.topmost().goBack();
    };

    return viewModel;
}