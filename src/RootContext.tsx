import { createContext, useState } from "react";
import { MatchInfo, PlayerType } from "./model/MatchDetail";
import { MatchType } from "./model/MatchType";
import NEXONAPI from "./NEXONAPI";
import { SPID } from "./model/SPID";
import { SpPositionType } from "./model/SpPositionType";
import { UserInfo } from "./model/UserInfo";
import { MaxDivision } from "./model/MaxDivision";
import { DivisionData } from "./model/DivisionData";

const RootContext = createContext({
    username: "",
    matchType: "",
    offset: 0,
    userInfo: {} as UserInfo,
    spIdList: [] as SPID[],
    spPositionList: [] as SpPositionType[],
    isLoading: false,
    isOffLoading: false,
    matchTypeList: [] as MatchType[],
    matchDetailList: [] as MatchInfo[],
    fetchMatchTypes: () => {},
    fetchSpId: () => {},
    fetchSpPosition: () => {},
    fetchDivision: () => {},
    fetchUserMatchInfo: (username: string) => {},
    fetchMatchInfoByType: (userInfo: UserInfo, matchType: string) => {},
    fetchMatchInfoByTypeMore: (userInfo: UserInfo, matchType: string) => {},
    setType: (matchType: string) => {},
    setPageOffset: (offset: number) => {},
    setUserName: (username: string) => {},
    setMatchInfoList: (list: MatchInfo[]) => {},
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

const RootProvider = ({ children }: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOffLoading, setIsOffLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [username, setUserNameState] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfo>({
        accessId: "",
        level: 0,
        nickname: "",
        divisionName: "",
        achievementDate: "",
    });
    const [matchType, setMatchType] = useState<string>("50");
    const [spIdList, setSpIdList] = useState<SPID[]>([]);
    const [spPositionList, setSpPositionList] = useState<SpPositionType[]>([]);
    const [divisionList, setDivisionList] = useState<DivisionData[]>([]);
    const [matchTypeList, setMatchTypeList] = useState<MatchType[]>([]);
    const [matchDetailList, setMatchDetailList] = useState<MatchInfo[]>([]);

    const fetchMatchTypes = async () => {
        try {
            let res = await NEXONAPI.fetchMatchTypes();
            res = res.filter(
                (matchType: MatchType) =>
                    matchType.matchtype === 50 || matchType.matchtype === 52
            );
            setMatchTypeList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSpId = async () => {
        try {
            const res = await NEXONAPI.fetchSpId();
            setSpIdList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSpPosition = async () => {
        try {
            const res = await NEXONAPI.fetchSpPosition();
            setSpPositionList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchDivision = async () => {
        try {
            const res = await NEXONAPI.fetchDivision();
            setDivisionList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserMatchInfo = async (name: string) => {
        try {
            setIsLoading(true);

            const userRes = await NEXONAPI.fetchUserInfo(name);
            let accessId = userRes.accessId;

            const divRes = await NEXONAPI.fetchUserDivision(accessId);

            divRes.sort((a: MaxDivision, b: MaxDivision) =>
                a.matchType === 50 ? -1 : 0
            );

            divisionList.map((divi: DivisionData) => {
                if (divRes[0].division === divi.divisionId) {
                    userRes.divisionName = divi.divisionName;
                    userRes.achievementDate = divRes[0].achievementDate;
                }
            });

            setUserInfo(userRes);

            fetchMatchInfoByType(userRes, matchType);
        } catch (err: any) {
            console.log(err);
            if (err?.response?.data?.message === "User could not found") {
                setUserInfo({
                    accessId: "",
                    level: 0,
                    nickname: "",
                    divisionName: "",
                    achievementDate: "",
                });
                setMatchDetailList([]);
            }
        }
    };

    const fetchMatchInfoByType = async (
        userInfo: UserInfo,
        matchType: string
    ) => {
        try {
            setIsLoading(true);
            const recordRes = await NEXONAPI.fetchMatchRecord(
                userInfo.accessId,
                Number(matchType),
                { offset: 0, limit: 10 }
            );

            let tempList: any = [];
            for (let i = 0; i < recordRes.length; i++) {
                let matchInfo = await NEXONAPI.fetchMatchRecordDetail(
                    recordRes[i]
                );
                matchInfo.matchInfo.sort((a: any, b: any) => {
                    return a.nickname === userInfo.nickname ? -1 : 0;
                });

                spIdList.map((li: SPID) => {
                    return matchInfo.matchInfo[0].player.map(
                        (play: PlayerType) => {
                            if (li.id === play.spId) {
                                play.name = li.name;
                            }
                        }
                    );
                });

                spIdList.map((li: SPID) => {
                    return matchInfo.matchInfo[1].player.map(
                        (play: PlayerType) => {
                            if (li.id === play.spId) {
                                play.name = li.name;
                            }
                        }
                    );
                });

                spPositionList.map((li: SpPositionType) => {
                    return matchInfo.matchInfo[0].player.map(
                        (play: PlayerType) => {
                            if (li.spposition === play.spPosition) {
                                play.desc = li.desc;
                            }
                        }
                    );
                });

                spPositionList.map((li: SpPositionType) => {
                    return matchInfo.matchInfo[1].player.map(
                        (play: PlayerType) => {
                            if (li.spposition === play.spPosition) {
                                play.desc = li.desc;
                            }
                        }
                    );
                });

                matchInfo.matchInfo[0].player =
                    matchInfo.matchInfo[0].player.filter(
                        (play: PlayerType) => play.desc !== "SUB"
                    );
                matchInfo.matchInfo[1].player =
                    matchInfo.matchInfo[1].player.filter(
                        (play: PlayerType) => play.desc !== "SUB"
                    );

                tempList.push(matchInfo);
            }

            setMatchDetailList(tempList);
        } catch (err: any) {
            console.log(err);
            if (err?.response?.data?.message === "User could not found") {
                setUserInfo({
                    accessId: "",
                    level: 0,
                    nickname: "",
                    divisionName: "",
                    achievementDate: "",
                });
                setMatchDetailList([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMatchInfoByTypeMore = async (
        userInfo: UserInfo,
        matchType: string
    ) => {
        try {
            setIsOffLoading(true);
            const recordRes = await NEXONAPI.fetchMatchRecord(
                userInfo.accessId,
                Number(matchType),
                { offset: (offset + 1) * 10, limit: 10 }
            );

            let tempList: any = [];
            for (let i = 0; i < recordRes.length; i++) {
                let matchInfo = await NEXONAPI.fetchMatchRecordDetail(
                    recordRes[i]
                );
                matchInfo.matchInfo.sort((a: any, b: any) => {
                    return a.nickname === userInfo.nickname ? -1 : 0;
                });

                spIdList.map((li: SPID) => {
                    return matchInfo.matchInfo[0].player.map(
                        (play: PlayerType) => {
                            if (li.id === play.spId) {
                                play.name = li.name;
                            }
                        }
                    );
                });

                spIdList.map((li: SPID) => {
                    return matchInfo.matchInfo[1].player.map(
                        (play: PlayerType) => {
                            if (li.id === play.spId) {
                                play.name = li.name;
                            }
                        }
                    );
                });

                spPositionList.map((li: SpPositionType) => {
                    return matchInfo.matchInfo[0].player.map(
                        (play: PlayerType) => {
                            if (li.spposition === play.spPosition) {
                                play.desc = li.desc;
                            }
                        }
                    );
                });

                spPositionList.map((li: SpPositionType) => {
                    return matchInfo.matchInfo[1].player.map(
                        (play: PlayerType) => {
                            if (li.spposition === play.spPosition) {
                                play.desc = li.desc;
                            }
                        }
                    );
                });

                matchInfo.matchInfo[0].player =
                    matchInfo.matchInfo[0].player.filter(
                        (play: PlayerType) => play.desc !== "SUB"
                    );
                matchInfo.matchInfo[1].player =
                    matchInfo.matchInfo[1].player.filter(
                        (play: PlayerType) => play.desc !== "SUB"
                    );

                tempList.push(matchInfo);
            }

            setMatchDetailList([...matchDetailList, ...tempList]);
        } catch (err: any) {
            console.log(err);
            if (err?.response?.data?.message === "User could not found") {
                setUserInfo({
                    accessId: "",
                    level: 0,
                    nickname: "",
                    divisionName: "",
                    achievementDate: "",
                });
                setMatchDetailList([]);
            }
        } finally {
            setIsOffLoading(false);
        }
    };

    const setUserName = (username: string) => {
        setUserNameState(username);
    };

    const setMatchInfoList = (list: MatchInfo[]) => {
        setMatchDetailList(list);
    };

    const setType = (matchType: string) => {
        setMatchType(matchType);
    };

    const setPageOffset = (pageOffset: number) => {
        setOffset(pageOffset);
    };

    return (
        <RootContext.Provider
            value={{
                offset,
                username,
                spIdList,
                spPositionList,
                matchType,
                userInfo,
                isLoading,
                isOffLoading,
                matchTypeList,
                matchDetailList,
                fetchSpId,
                fetchMatchTypes,
                fetchSpPosition,
                fetchDivision,
                fetchUserMatchInfo,
                fetchMatchInfoByType,
                fetchMatchInfoByTypeMore,
                setUserName,
                setType,
                setPageOffset,
                setMatchInfoList,
            }}
        >
            {children}
        </RootContext.Provider>
    );
};

export { RootContext, RootProvider };
