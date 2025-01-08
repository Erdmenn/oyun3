import { Observable, ApplicationSettings, Frame } from '@nativescript/core';
import { generatePlayers } from './data/mock-players';
import { passiveSkills } from './data/passive-skills';

export function createViewModel() {
    const viewModel = new Observable();
    
    viewModel.onButtonTap = () => {
        Frame.topmost().navigate("test-page");
    };
    
    viewModel.navigateToPlayers = () => {
        Frame.topmost().navigate("players-page");
    };
    
    viewModel.startNewGame = () => {
        ApplicationSettings.remove("players");
        const players = generatePlayers(3);
        players.forEach(player => {
            if (Math.random() < 0.5) {
                const randomIndex = Math.floor(Math.random() * passiveSkills.length);
                player.passiveSkill = passiveSkills[randomIndex].id;
            }
        });
        ApplicationSettings.setString("players", JSON.stringify(players));
        alert('Yeni oyun başlatıldı!');
    };
    
    viewModel.continueGame = () => {
        if (ApplicationSettings.hasKey("players")) {
            Frame.topmost().navigate("players-page");
        } else {
            alert('Kayıtlı oyuncu bulunamadı!');
        }
    };

    return viewModel;
}