import React, { useEffect, useContext } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NEXONAPI from "../NEXONAPI";
import { MatchType } from "../model/MatchType";
import moment from "moment";
import { MatchInfo } from "../model/MatchDetail";
import BackGroundIMG from "../assets/background.jpg";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../RootContext";

function HomePage() {
    const {
        username,
        matchType,
        setName,
        fetchMatchTypes,
        setMatchInfoList,
        fetchSpId,
        fetchSpPosition,
        fetchDivision,
        fetchUserMatchInfo,
    } = useContext(RootContext);

    useEffect(() => {
        fetchMatchTypes();
        fetchSpId();
        fetchSpPosition();
        fetchDivision();
    }, []);

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleClickSearch = async () => {
        fetchUserMatchInfo();
    };

    return (
        <>
            <Grid
                container
                height={"100%"}
                textAlign={"center"}
                style={{ padding: "20px", color: "#005391" }}
            >
                <Typography variant="h3">NEXON</Typography>
                <Grid
                    container
                    alignItems={"center"}
                    gap={2}
                    style={{
                        marginTop: "100px",
                    }}
                >
                    <Typography variant="subtitle1">구단주명</Typography>
                    <Input
                        placeholder="구단주 이름을 입력해주세요"
                        value={username}
                        onChange={handleChangeNickname}
                        style={{ minWidth: "240px" }}
                    />
                    <Button variant="contained" onClick={handleClickSearch}>
                        검색
                    </Button>
                </Grid>

                <Grid
                    style={{
                        position: "absolute",
                        bottom: 10,
                        color: "#005391",
                    }}
                    textAlign={"left"}
                >
                    <Typography variant="subtitle2">
                        DATA based on NEXON Developers
                    </Typography>
                    <Typography variant="subtitle2">by sunnyKim91</Typography>
                </Grid>
            </Grid>

            <img
                src={BackGroundIMG}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    width: "100%",
                    height: "100%",
                }}
                alt="backgroundImg"
            />
        </>
    );
}

export default HomePage;
