import React, { useEffect } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NEXONAPI from "../NEXONAPI";
import { MatchType } from "../model/MatchType";
import moment from "moment";
import { MatchInfo } from "../model/MatchDetail";

function HomePage() {
    const [username, setUserName] = React.useState<string>("");
    const [matchType, setMatchType] = React.useState<string>("30");
    const [matchTypeList, setMatchTypeList] = React.useState<MatchType[]>([]);
    const [matchDetailList, setMatchDetailList] = React.useState<MatchInfo[]>(
        []
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await NEXONAPI.fetchMatchTypes();
            console.log(res);
            setMatchTypeList(res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleClickSearch = async () => {
        try {
            const res1 = await NEXONAPI.fetchUserInfo(username);
            let accessId = res1.accessId;
            const res2 = await NEXONAPI.fetchMatchRecord(
                accessId,
                Number(matchType),
                { limit: 5 }
            );
            let tempList: any = [];
            for (let i = 0; i < res2.length; i++) {
                let matchInfo = await NEXONAPI.fetchMatchRecordDetail(res2[i]);
                console.log(matchInfo);
                tempList.push(matchInfo);
            }
            setMatchDetailList(tempList);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setMatchType(event.target.value as string);
    };

    return (
        <Grid>
            <Input
                placeholder="유저 닉네임을 입력하세요"
                value={username}
                onChange={handleChangeNickname}
            />
            <Button variant="contained" onClick={handleClickSearch}>
                검색
            </Button>
            <Grid>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={matchType}
                    label="matchType"
                    onChange={handleChangeSelect}
                >
                    {matchTypeList?.map((type: MatchType) => {
                        return (
                            <MenuItem
                                key={type.matchtype}
                                value={type.matchtype}
                            >
                                {type.desc}
                            </MenuItem>
                        );
                    })}
                </Select>
            </Grid>
            <Grid>
                {matchDetailList?.map((li: MatchInfo) => {
                    return (
                        <Typography key={li.matchId}>
                            {moment(li.matchDate).format("YYYY-MM-DD HH:mm:ss")}
                        </Typography>
                    );
                })}
            </Grid>
        </Grid>
    );
}

export default HomePage;
