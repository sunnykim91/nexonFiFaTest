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
import MatchRecordPageContent from "./MatchRecordPageContent";

function MatchRecordPageTabs() {
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

    return (
        <Grid
            textAlign={"center"}
            style={{ padding: "20px", color: "#005391" }}
        >
            <Box sx={{ width: "100%" }}>
                <TabContext value={matchType}>
                    <Box
                        sx={{
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
                        <Grid
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                paddingTop: "20%",
                            }}
                        >
                            <Grid>
                                <CircularProgress />
                            </Grid>
                            <Typography>{`전적을 가져오고 있습니다.`}</Typography>
                        </Grid>
                    ) : matchDetailList.length === 0 ? (
                        <Typography>전적이 없습니다.</Typography>
                    ) : (
                        <MatchRecordPageContent />
                    )}
                </TabContext>
            </Box>
        </Grid>
    );
}

export default MatchRecordPageTabs;
