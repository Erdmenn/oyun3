import { Observable, Dialogs, ApplicationSettings, Frame } from '@nativescript/core';
import { passiveSkills } from './data/passive-skills';
import { positions } from './data/positions';
import { calculateOverall } from './data/mock-players';

export function createViewModel(context) {
    const viewModel = new Observable();
    
    viewModel.set("player", context.player);
    viewModel.set("positions", positions);
    
    viewModel.getPassiveSkillName = (passiveSkillId) => {
        const skill = passiveSkills.find(s => s.id === passiveSkillId);
        return skill ? skill.name : "Yok";
    };
    
    viewModel.onPositionTap = (args) => {
        const selectedPosition = positions[args.index];
        const player = viewModel.get("player");
        
        if (selectedPosition === player.position) {
            return;
        }

        const players = JSON.parse(ApplicationSettings.getString("players"));
        const selectedPlayers = players.filter(p => p.position !== "Seçilmedi" && p.id !== player.id);

        if (selectedPosition !== "Seçilmedi") {
            if (selectedPlayers.length >= 11 && player.position === "Seçilmedi") {
                Dialogs.alert({
                    title: "Hata",
                    message: "Takımda zaten 11 oyuncu var. Başka bir oyuncu ekleyemezsiniz.",
                    okButtonText: "Tamam"
                });
                return;
            }

            if (selectedPosition === "Kaleci") {
                const hasGoalkeeper = selectedPlayers.some(p => p.position === "Kaleci");
                if (hasGoalkeeper) {
                    Dialogs.alert({
                        title: "Hata",
                        message: "Takımda zaten bir kaleci var!",
                        okButtonText: "Tamam"
                    });
                    return;
                }
            } else {
                const hasGoalkeeper = selectedPlayers.some(p => p.position === "Kaleci");
                if (!hasGoalkeeper && player.position !== "Kaleci") {
                    Dialogs.alert({
                        title: "Hata",
                        message: "Önce bir kaleci seçmelisiniz!",
                        okButtonText: "Tamam"
                    });
                    return;
                }
            }
        }
        
        Dialogs.confirm({
            title: "Mevki Değişikliği",
            message: `${player.name} oyuncusunun mevkisini ${selectedPosition} olarak değiştirmek istediğinize emin misiniz?`,
            okButtonText: "Evet",
            cancelButtonText: "Hayır"
        }).then(result => {
            if (result) {
                player.position = selectedPosition;
                player.overall = calculateOverall(player, selectedPosition);
                
                const playerIndex = players.findIndex(p => p.id === player.id);
                if (playerIndex !== -1) {
                    players[playerIndex] = player;
                    ApplicationSettings.setString("players", JSON.stringify(players));
                    viewModel.notifyPropertyChange("player", player);
                }
            }
        });
    };
    
    viewModel.goBack = () => {
        Frame.topmost().goBack();
    };
    
    return viewModel;
}