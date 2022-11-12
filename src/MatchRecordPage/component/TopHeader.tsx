import React, { useContext } from "react";
import { Grid, Input, Typography, Button } from "@mui/material";
import { RootContext } from "../../RootContext";

function TopHeader() {
    const { setUserName, fetchUserMatchInfo } = useContext(RootContext);
    const [name, setName] = React.useState<string>("");

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleKeyDownNickname = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.code === "NumpadEnter" || e.code === "Enter") {
            if (name === "") {
                alert("구단주 명을 입력해주세요");
                return;
            }
            setName("");
            setUserName(name);
            fetchUserMatchInfo(name);
        }
    };

    const handleClickSearch = async () => {
        if (name === "") {
            alert("구단주 명을 입력해주세요");
            return;
        }
        setName("");
        setUserName(name);
        fetchUserMatchInfo(name);
    };

    return (
        <Grid container justifyContent={"space-around"} alignItems={"center"}>
            <Grid item>FIFA전적 검색</Grid>
            <Grid item>
                <Grid container alignItems={"center"} gap={2}>
                    <Typography variant="subtitle1">구단주명</Typography>
                    <Input
                        placeholder="구단주 이름을 입력해주세요"
                        value={name}
                        onChange={handleChangeNickname}
                        onKeyPress={handleKeyDownNickname}
                        style={{ minWidth: "240px" }}
                    />
                    <Button variant="contained" onClick={handleClickSearch}>
                        검색
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TopHeader;
