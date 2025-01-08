import { Observable, Frame, ApplicationSettings } from '@nativescript/core';
import { passiveSkills } from './data/passive-skills';

export function createViewModel() {
    const viewModel = new Observable();
    
    const loadPlayers = () => {
        try {
            let players = [];
            if (ApplicationSettings.hasKey("players")) {
                players = JSON.parse(ApplicationSettings.getString("players"));
            }
            viewModel.set("players", players);
        } catch (error) {
            console.error('Error loading players:', error);
            viewModel.set("players", []);
        }
    };

    loadPlayers();
    
    viewModel.getPassiveSkillName = (passiveSkillId) => {
        const skill = passiveSkills.find(s => s.id === passiveSkillId);
        return skill ? skill.name : "Yok";
    };
    
    viewModel.onPlayerTap = (args) => {
        const player = viewModel.get("players")[args.index];
        Frame.topmost().navigate({
            moduleName: "player-detail-page",
            context: { player }
        });
    };
    
    viewModel.onButtonTap = (args) => {
        const buttonId = args.object.id;
        alert(`${args.object.text} sayfası henüz hazır değil`);
    };
    
    viewModel.goBack = () => {
        Frame.topmost().goBack();
    };
    
    return viewModel;
}