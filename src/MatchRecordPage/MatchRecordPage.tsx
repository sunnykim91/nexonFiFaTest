import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import MatchRecordPageTabs from "./component/MatchRecordPageTabs";
import UserInfo from "./component/UserInfo";
import TopHeader from "./component/TopHeader";
import { RootContext } from "../RootContext";

function MatchRecordPage() {
    const { userInfo } = useContext(RootContext);
    return (
        <Grid
            container
            height={"100%"}
            style={{ padding: "10px" }}
            justifyContent={"center"}
            gap={2}
        >
            <TopHeader />
            {userInfo.nickname ? (
                <>
                    <UserInfo />
                    <MatchRecordPageTabs />
                </>
            ) : (
                <Typography>구단주 정보가 없습니다.</Typography>
            )}
        </Grid>
    );
}

export default MatchRecordPage;
