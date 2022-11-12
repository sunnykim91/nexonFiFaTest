import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { RootContext } from "../../RootContext";
import { MatchType } from "../../model/MatchType";
import { CircularProgress } from "@mui/material";
import MatchRecordPageContent from "./MatchRecordPageContent";

function MatchRecordPageTabs() {
    const {
        matchTypeList,
        matchType,
        setType,
        userInfo,
        isLoading,
        fetchMatchInfoByType,
    } = useContext(RootContext);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setType(newValue);
        fetchMatchInfoByType(userInfo, newValue);
    };

    return (
        <Grid
            container
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
                    ) : (
                        <MatchRecordPageContent />
                    )}
                </TabContext>
            </Box>
        </Grid>
    );
}

export default MatchRecordPageTabs;
