import { useContext } from "react";
import { Grid, Paper } from "@mui/material";
import { RootContext } from "../../RootContext";
import moment from "moment";

function UserInfo() {
    const { userInfo } = useContext(RootContext);

    return (
        <Grid>
            <Paper
                sx={{
                    padding: "10px",
                    fontSize: "0.9em",
                    color: "#2E3C7E",
                    background: "#FBEAEB",
                }}
            >
                <Grid
                    container
                    sx={{ fontSize: "1.2em" }}
                    textAlign="left"
                    gap={3}
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
