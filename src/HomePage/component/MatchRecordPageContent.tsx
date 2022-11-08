import React, { useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import { RootContext } from "../../RootContext";
import { MatchType } from "../../model/MatchType";
import TabPanel from "@mui/lab/TabPanel";
import { MatchInfo, PlayerType } from "../../model/MatchDetail";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import ListItemText from "@mui/material/ListItemText";
import { CircularProgress } from "@mui/material";
import { SPID } from "../../model/SPID";
import PlayerDetailInfo from "./PlayerDetailInfo";
import MatchInfoDetail from "./MatchInfoDetail";

function MatchRecordPageContent() {
    const {
        matchTypeList,
        matchType,
        setType,
        isLoading,
        fetchMatchInfoByType,
        matchDetailList,
        spIdList,
    } = useContext(RootContext);

    const renderContainer = (result: string) => {
        if (result === "무") {
            return { background: "lightgray" };
        } else if (result === "패") {
            return { background: "pink" };
        }
        return { background: "skyblue" };
    };

    return (
        <>
            {matchTypeList.map((li: MatchType) => {
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
                                        <Grid container gap={1}>
                                            <MatchInfoDetail matchInfo={li} />
                                            <PlayerDetailInfo matchInfo={li} />
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </TabPanel>
                );
            })}
        </>
    );
}

export default MatchRecordPageContent;