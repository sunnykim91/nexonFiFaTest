import React, { useEffect, useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RootContext } from "../RootContext";
import MatchRecordPageTabs from "../HomePage/component/MatchRecordPageTabs";

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

    return (
        <Grid container height={"100%"}>
            <Grid container>헤더 및 검색 영역</Grid>
            <Grid container>여기가 선수 정보 영역</Grid>
            <MatchRecordPageTabs />
        </Grid>
    );
}

export default MatchRecordPage;
