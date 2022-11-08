import React, { useEffect, useContext } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { MatchInfo, PlayerType } from "../../model/MatchDetail";

interface Props {
    matchInfo: MatchInfo;
}

function MatchInfoDetail(props: Props) {
    const { matchInfo } = props;
    return (
        <Grid>
            <Paper
                sx={{ padding: "10px", fontSize: "0.7em", minWidth: "260px" }}
            >
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                    sx={{ fontSize: "1.2em" }}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].nickname}
                    </Grid>
                    <Grid item xs={4}>
                        vs
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].nickname}
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].matchDetail.possession}%
                    </Grid>
                    <Grid item xs={4}>
                        볼점유율
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].matchDetail.possession}%
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].shoot.effectiveShootTotal}
                    </Grid>
                    <Grid item xs={4}>
                        유효슈팅
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].shoot.effectiveShootTotal}
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].matchDetail.cornerKick}
                    </Grid>
                    <Grid item xs={4}>
                        코너킥
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].matchDetail.cornerKick}
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].matchDetail.offsideCount}
                    </Grid>
                    <Grid item xs={4}>
                        오프사이드
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].matchDetail.offsideCount}
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].matchDetail.foul}
                    </Grid>
                    <Grid item xs={4}>
                        파울
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].matchDetail.foul}
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[0].matchDetail.redCards}
                    </Grid>
                    <Grid item xs={4}>
                        퇴장
                    </Grid>
                    <Grid item xs={4}>
                        {matchInfo.matchInfo[1].matchDetail.redCards}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default MatchInfoDetail;
