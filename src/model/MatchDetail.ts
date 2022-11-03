export interface MatchInfoDetail {
    accessId: string;
    nickname: string;
    matchDetail: {
        seasonId: number;
        matchResult: string;
        matchEndType: number;
        systemPause: number;
        foul: number;
        injury: number;
        redCards: number;
        yellowCards: number;
        dribble: number;
        cornerKick: number;
        possession: number;
        offsideCount: number;
        averageRating: number;
        controller: string;
    };
    shoot: {
        shootTotal: number;
        effectiveShootTotal: number;
        shootOutScore: number;
        goalTotal: number;
        goalTotalDisplay: number;
        ownGoal: number;
        shootHeading: number;
        goalHeading: number;
        shootFreekick: number;
        goalFreekick: number;
        shootInPenalty: number;
        goalInPenalty: number;
        shootOutPenalty: number;
        goalOutPenalty: number;
        shootPenaltyKick: number;
        goalPenaltyKick: number;
    };
    shootDetail: [
        {
            goalTime: number;
            x: number;
            y: number;
            type: number;
            result: number;
            spId: number;
            spGrade: number;
            spLevel: number;
            spIdType: boolean;
            assist: boolean;
            assistSpId: number;
            assistX: number;
            assistY: number;
            hitPost: boolean;
            inPenalty: boolean;
        }
    ];
    pass: {
        passTry: number;
        passSuccess: number;
        shortPassTry: number;
        shortPassSuccess: number;
        longPassTry: number;
        longPassSuccess: number;
        bouncingLobPassTry: number;
        bouncingLobPassSuccess: number;
        drivenGroundPassTry: number;
        drivenGroundPassSuccess: number;
        throughPassTry: number;
        throughPassSuccess: number;
        lobbedThroughPassTry: number;
        lobbedThroughPassSuccess: number;
    };
    defence: {
        blockTry: number;
        blockSuccess: number;
        tackleTry: number;
        tackleSuccess: number;
    };
    player: [
        {
            spId: number;
            spPosition: number;
            spGrade: number;
            status: {
                shoot: number;
                effectiveShoot: number;
                assist: number;
                goal: number;
                dribble: number;
                intercept: number;
                defending: number;
                passTry: number;
                passSuccess: number;
                dribbleTry: number;
                dribbleSuccess: number;
                ballPossesionTry: number;
                ballPossesionSuccess: number;
                aerialTry: number;
                aerialSuccess: number;
                blockTry: number;
                block: number;
                tackleTry: number;
                tackle: number;
                yellowCards: number;
                redCards: number;
                spRating: number;
            };
        }
    ];
}

export interface MatchInfo {
    matchId: string;
    matchDate: string;
    matchType: number;
    matchInfo: MatchInfoDetail[];
}