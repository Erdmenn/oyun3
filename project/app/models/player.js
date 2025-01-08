export class Player {
    constructor(id, name, position, overall, passiveSkill, items) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.overall = overall;
        this.passiveSkill = passiveSkill;
        this.items = items || [];
        this.skills = {
            reflex: 0,
            speed: 0,
            dribbling: 0,
            ballControl: 0,
            stamina: 0,
            shooting: 0,
            passing: 0,
            skill: 0
        };
    }
}