import {
    Grid,
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { MatchInfo } from "../../model/MatchDetail";
import { styled } from "@mui/material/styles";

interface Props {
    matchInfo: MatchInfo;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        borderBottom: "1px solid black",
        color: theme.palette.common.black,
        fontSize: "1em",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "0.8em",
    },
}));

function MatchInfoDetail(props: Props) {
    const { matchInfo } = props;
    return (
        <Grid item>
            <Paper sx={{ padding: 1, width: "100%" }}>
                <TableContainer component={Table}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">
                                    {matchInfo.matchInfo[0].nickname}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    vs
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {matchInfo.matchInfo[1].nickname}
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[0].matchDetail
                                            .possession
                                    }
                                    %
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    ????????????
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[1].matchDetail
                                            .possession
                                    }
                                    %
                                </StyledTableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[0].shoot
                                            .effectiveShootTotal
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    ????????????
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[1].shoot
                                            .effectiveShootTotal
                                    }
                                </StyledTableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[0].matchDetail
                                            .cornerKick
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    ?????????
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[1].matchDetail
                                            .cornerKick
                                    }
                                </StyledTableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[0].matchDetail
                                            .offsideCount
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    ???????????????
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[1].matchDetail
                                            .offsideCount
                                    }
                                </StyledTableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell align="center">
                                    {matchInfo.matchInfo[0].matchDetail.foul}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    ??????
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {matchInfo.matchInfo[1].matchDetail.foul}
                                </StyledTableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[0].matchDetail
                                            .redCards
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    ??????
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        matchInfo.matchInfo[1].matchDetail
                                            .redCards
                                    }
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
}

export default MatchInfoDetail;
