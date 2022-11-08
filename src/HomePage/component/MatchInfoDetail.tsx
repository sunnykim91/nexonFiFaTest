import React, { useEffect, useContext } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { MatchInfo, PlayerType } from "../../model/MatchDetail";

interface Props {
    matchInfo: MatchInfo;
}

function MatchInfoDetail(props: Props) {
    const { matchInfo } = props;
    return (
        <Grid container>
            <Paper sx={{ padding: "10px" }}>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].nickname}
                    </Typography>
                    <Typography variant="caption">vs</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].nickname}
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].matchDetail.possession}%
                    </Typography>
                    <Typography variant="caption">볼점유율</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].matchDetail.possession}%
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].shoot.shootTotal}
                    </Typography>
                    <Typography variant="caption">볼점유율</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].shoot.shootTotal}
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].shoot.effectiveShootTotal}
                    </Typography>
                    <Typography variant="caption">유효슈팅</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].shoot.effectiveShootTotal}
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].matchDetail.cornerKick}
                    </Typography>
                    <Typography variant="caption">코너킥</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].matchDetail.cornerKick}
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].matchDetail.offsideCount}
                    </Typography>
                    <Typography variant="caption">오프사이드</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].matchDetail.offsideCount}
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].matchDetail.foul}
                    </Typography>
                    <Typography variant="caption">파울</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].matchDetail.foul}
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Typography variant="caption">
                        {matchInfo.matchInfo[0].matchDetail.redCards}
                    </Typography>
                    <Typography variant="caption">퇴장</Typography>
                    <Typography variant="caption">
                        {matchInfo.matchInfo[1].matchDetail.redCards}
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default MatchInfoDetail;
