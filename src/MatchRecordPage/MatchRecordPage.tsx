import React, { useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { RootContext } from "../RootContext";
import { MatchType } from "../model/MatchType";
import TabPanel from "@mui/lab/TabPanel";
import { MatchInfo } from "../model/MatchDetail";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

function MatchRecordPage() {
    const {
        matchTypeList,
        matchType,
        setType,
        fetchMatchInfoByType,
        matchDetailList,
    } = useContext(RootContext);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        setType(newValue);
        fetchMatchInfoByType(newValue);
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
                                aria-label="scrollable auto tabs example"
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
                        {matchTypeList.map((li: MatchType, index: number) => {
                            return (
                                <TabPanel
                                    key={li.matchtype}
                                    value={`${li.matchtype}`}
                                >
                                    {li.desc}
                                    {matchDetailList.map((li: MatchInfo) => {
                                        return (
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={
                                                        <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>
                                                        {moment(
                                                            li.matchDate
                                                        ).format(
                                                            "YYYYMMDD HH:mm:ss"
                                                        )}
                                                        {
                                                            li.matchInfo[0]
                                                                .nickname
                                                        }
                                                        {
                                                            li.matchInfo[0]
                                                                .shoot.goalTotal
                                                        }
                                                        {
                                                            li.matchInfo[1]
                                                                .nickname
                                                        }
                                                        {
                                                            li.matchInfo[1]
                                                                .shoot.goalTotal
                                                        }
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit.
                                                        Suspendisse malesuada
                                                        lacus ex, sit amet
                                                        blandit leo lobortis
                                                        eget.
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        );
                                    })}
                                </TabPanel>
                            );
                        })}
                    </TabContext>
                </Box>
            </Grid>
        </>
    );
}

export default MatchRecordPage;
