import React, { useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { RootContext } from "../../RootContext";
import { MatchType } from "../../model/MatchType";
import TabPanel from "@mui/lab/TabPanel";
import { MatchInfo } from "../../model/MatchDetail";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import PlayerDetailInfo from "./PlayerDetailInfo";
import MatchInfoDetail from "./MatchInfoDetail";
import MatchInfoShootPosition from "./MatchInfoShootPosition";
import { CircularProgress } from "@mui/material";

function MatchRecordPageContent() {
    const {
        isOffLoading,
        offset,
        userInfo,
        matchType,
        matchTypeList,
        matchDetailList,
        fetchMatchInfoByTypeMore,
        setPageOffset,
    } = useContext(RootContext);

    const renderContainer = (result: string) => {
        if (result === "무") {
            return {
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            };
        } else if (result === "패") {
            return {
                background: "linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)",
            };
        }
        return {
            background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        };
    };

    const handleClickMoreData = () => {
        setPageOffset((offset + 1) * 10);
        fetchMatchInfoByTypeMore(userInfo, matchType);
    };

    return matchDetailList.length === 0 ? (
        <Typography>전적이 없습니다.</Typography>
    ) : (
        <>
            {matchTypeList?.map((li: MatchType) => {
                return (
                    <TabPanel key={li.matchtype} value={`${li.matchtype}`}>
                        {matchDetailList?.map((li: MatchInfo) => {
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
                                            <MatchInfoShootPosition
                                                matchInfo={li}
                                            />
                                            <PlayerDetailInfo matchInfo={li} />
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </TabPanel>
                );
            })}
            {isOffLoading ? (
                <CircularProgress />
            ) : (
                <Button variant="contained" onClick={handleClickMoreData}>
                    더보기
                </Button>
            )}
        </>
    );
}

export default MatchRecordPageContent;
