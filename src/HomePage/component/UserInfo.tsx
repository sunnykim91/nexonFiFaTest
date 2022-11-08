import React, { useEffect, useContext } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { MatchInfo, PlayerType } from "../../model/MatchDetail";
import { RootContext } from "../../RootContext";
import moment from "moment";

interface Props {
    matchInfo: MatchInfo;
}

function UserInfo(props: Props) {
    const { matchInfo } = props;
    const { userInfo } = useContext(RootContext);

    return (
        <Grid>
            <Paper
                sx={{ padding: "10px", fontSize: "0.7em", minWidth: "260px" }}
            >
                <Grid
                    container
                    sx={{ fontSize: "1.2em" }}
                    direction={"column"}
                    textAlign="left"
                    gap={2}
                >
                    <Grid>닉네임 : {userInfo.nickname}</Grid>
                    <Grid>레벨 : {userInfo.level}</Grid>
                    <Grid>공식경기 클래스 : {userInfo.divisionName}</Grid>
                    <Grid>
                        클래스 달성일자 :{" "}
                        {moment(userInfo.achievementDate).format(
                            "YYYY년 MM월 DD일 HH:mm"
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default UserInfo;
