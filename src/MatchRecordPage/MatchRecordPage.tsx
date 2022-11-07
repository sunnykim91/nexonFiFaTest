import React, { useEffect, useContext } from "react";
import {
    Box,
    Grid,
    Typography,
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { RootContext } from "../RootContext";
import { MatchType } from "../model/MatchType";
import TabPanel from "@mui/lab/TabPanel";
import { MatchInfo, PlayerType } from "../model/MatchDetail";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import ListItemText from "@mui/material/ListItemText";
import { CircularProgress } from "@mui/material";
import { SPID } from "../model/SPID";

const tableHead = [
    "선수명",
    "평점",
    "득점",
    "도움",
    "슈팅",
    "유효슈팅",
    "패스",
    "인터셉트",
    "패스차단",
    "태클",
    "경고",
    "퇴장",
];

function MatchRecordPage() {
    const {
        matchTypeList,
        matchType,
        setType,
        isLoading,
        fetchMatchInfoByType,
        matchDetailList,
        spIdList,
    } = useContext(RootContext);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        setType(newValue);
        fetchMatchInfoByType(newValue);
    };

    const renderContainer = (result: string) => {
        if (result === "무") {
            return { background: "lightgray" };
        } else if (result === "패") {
            return { background: "pink" };
        }
        return { background: "skyblue" };
    };

    const renderMacthInfoDetail = (playerList: PlayerType[]) => {
        return playerList.map((player) => (
            <TableRow
                key={player.spId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {player.name}({player.desc})
                </TableCell>
                <TableCell align="right">{player.status.spRating}</TableCell>
                <TableCell align="right">{player.status.goal}</TableCell>
                <TableCell align="right">{player.status.assist}</TableCell>
                <TableCell align="right">{player.status.shoot}</TableCell>
                <TableCell align="right">
                    {player.status.effectiveShoot}
                </TableCell>
                <TableCell align="right">{player.status.passTry}</TableCell>
                <TableCell align="right">{player.status.intercept}</TableCell>
                <TableCell align="right">{player.status.defending}</TableCell>
                <TableCell align="right">{player.status.tackleTry}</TableCell>
                <TableCell align="right">{player.status.yellowCards}</TableCell>
                <TableCell align="right">{player.status.redCards}</TableCell>
            </TableRow>
        ));
    };

    const renderMaychTypeList = () => {
        return matchDetailList.length === 0 ? (
            <Typography>전적이 없습니다.</Typography>
        ) : (
            matchTypeList.map((li: MatchType, index: number) => {
                return (
                    <TabPanel key={li.matchtype} value={`${li.matchtype}`}>
                        {matchDetailList.map((li: MatchInfo) => {
                            return (
                                <Accordion
                                    key={li.matchId}
                                    style={renderContainer(
                                        li.matchInfo[0].matchDetail.matchResult
                                    )}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Grid
                                            container
                                            justifyContent={"space-evenly"}
                                            alignItems={"center"}
                                        >
                                            <Typography variant="subtitle2">
                                                {moment(li.matchDate).format(
                                                    "YYYY년MM월DD일 HH시mm분"
                                                )}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                {li.matchInfo[0].nickname}
                                            </Typography>
                                            <Typography variant="h5">
                                                {
                                                    li.matchInfo[0].shoot
                                                        .goalTotal
                                                }
                                                :
                                                {
                                                    li.matchInfo[1].shoot
                                                        .goalTotal
                                                }
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                {li.matchInfo[1].nickname}
                                            </Typography>
                                        </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container>
                                            <Grid
                                                style={{
                                                    padding: "10px",
                                                }}
                                            >
                                                <TableContainer
                                                    component={Paper}
                                                >
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                {tableHead.map(
                                                                    (
                                                                        head: string,
                                                                        index: number
                                                                    ) => {
                                                                        return (
                                                                            <TableCell
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    head
                                                                                }
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                )}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {renderMacthInfoDetail(
                                                                li.matchInfo[0]
                                                                    .player
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                            <Grid
                                                style={{
                                                    padding: "10px",
                                                }}
                                            >
                                                <TableContainer
                                                    component={Paper}
                                                >
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                {tableHead.map(
                                                                    (
                                                                        head: string,
                                                                        index: number
                                                                    ) => {
                                                                        return (
                                                                            <TableCell
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    head
                                                                                }
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                )}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {renderMacthInfoDetail(
                                                                li.matchInfo[1]
                                                                    .player
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </TabPanel>
                );
            })
        );
    };

    return (
        <>
            <Grid
                container
                height={"100%"}
                textAlign={"center"}
                style={{ padding: "20px", color: "#005391" }}
            >
                <Box sx={{ width: "100%" }}>
                    <TabContext value={matchType}>
                        <Box
                            sx={{
                                maxWidth: { xs: 320, sm: 480 },
                                bgcolor: "background.paper",
                            }}
                        >
                            <Tabs
                                value={matchType}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                {matchTypeList.map((li: MatchType) => {
                                    return (
                                        <Tab
                                            key={li.matchtype}
                                            label={`${li.desc}`}
                                            value={`${li.matchtype}`}
                                        />
                                    );
                                })}
                            </Tabs>
                        </Box>
                        {isLoading ? (
                            <Grid container>
                                <CircularProgress />
                                <Typography>{`전적을 가져오고 있습니다.`}</Typography>
                            </Grid>
                        ) : (
                            renderMaychTypeList()
                        )}
                    </TabContext>
                </Box>
            </Grid>
        </>
    );
}

export default MatchRecordPage;
