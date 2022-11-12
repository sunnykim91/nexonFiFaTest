import { Grid, Paper } from "@mui/material";
import { MatchInfo, ShootDetail } from "../../model/MatchDetail";
import stadium from "../../assets/stadium.jpg";
import ball from "../../assets/ball.png";
import redball from "../../assets/redball.png";

interface Props {
    matchInfo: MatchInfo;
}

function MatchInfoShootPosition(props: Props) {
    const { matchInfo } = props;

    const renderGoal = (shootDetail: ShootDetail[], enemy?: boolean) => {
        return shootDetail
            .filter((shoot: ShootDetail) => shoot.result === 3)
            .map((li: ShootDetail, index: number) => {
                return (
                    <div
                        style={{
                            position: "absolute",
                            left: li.x * 200,
                            top: li.y * 150,
                        }}
                        key={`${li.spId}${index}`}
                    >
                        {enemy ? (
                            <img
                                src={redball}
                                width="10px"
                                height="10px"
                                alt="redball"
                            />
                        ) : (
                            <img
                                src={ball}
                                width="10px"
                                height="10px"
                                alt="ball"
                            />
                        )}
                    </div>
                );
            });
    };

    return (
        <Grid>
            <Paper sx={{ fontSize: "0.7em" }}>
                <Grid
                    container
                    alignItems="center"
                    justifyContent={"space-around"}
                    sx={{ fontSize: "1.2em" }}
                >
                    <div style={{ position: "relative" }}>
                        <img
                            src={stadium}
                            width="220px"
                            height="150px"
                            alt="stadium"
                        />
                        {renderGoal(matchInfo.matchInfo[0].shootDetail)}
                        {renderGoal(matchInfo.matchInfo[1].shootDetail, true)}
                    </div>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default MatchInfoShootPosition;
