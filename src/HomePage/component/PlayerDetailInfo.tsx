import React, { useEffect, useContext } from "react";
import {
    Grid,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Avatar,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { MatchInfo, PlayerType } from "../../model/MatchDetail";
import { styled } from "@mui/material/styles";

interface Props {
    matchInfo: MatchInfo;
}

const tableHead = [
    "선수명",
    "평점",
    "득점",
    "도움",
    "슈팅",
    "유효슈팅",
    "패스",
    "인터셉트",
    "패스차단",
    "태클",
    "경고",
    "퇴장",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        borderBottom: "2px solid black",
        color: theme.palette.common.black,
        fontSize: "0.3em",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "0.2em",
    },
}));

const renderMacthInfoDetail = (playerList: PlayerType[]) => {
    return playerList.map((player) => (
        <TableRow
            key={player.spId}
            sx={{
                "&:last-child td, &:last-child th": { border: 0 },
            }}
        >
            <StyledTableCell component="th" scope="row">
                {player.name}({player.desc})
                <Avatar
                    alt="Remy Sharp"
                    src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${player.spId}.png`}
                />
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.spRating}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.goal}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.assist}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.shoot}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.effectiveShoot}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.passTry}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.intercept}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.defending}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.tackleTry}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.yellowCards}
            </StyledTableCell>
            <StyledTableCell align="center">
                {player.status.redCards}
            </StyledTableCell>
        </TableRow>
    ));
};

function PlayerDetailInfo(props: Props) {
    return (
        <Grid container gap={1}>
            <TableContainer component={Paper}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            {tableHead.map((head: string, index: number) => {
                                return (
                                    <StyledTableCell key={index} align="center">
                                        {head}
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderMacthInfoDetail(
                            props.matchInfo.matchInfo[0].player
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {tableHead.map((head: string, index: number) => {
                                return (
                                    <StyledTableCell key={index} align="center">
                                        {head}
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderMacthInfoDetail(
                            props.matchInfo.matchInfo[1].player
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default PlayerDetailInfo;
