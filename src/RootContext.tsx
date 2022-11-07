import { createContext, useState } from "react";
import { MatchInfo, PlayerType } from "./model/MatchDetail";
import { MatchType } from "./model/MatchType";
import NEXONAPI from "./NEXONAPI";
import { useNavigate } from "react-router-dom";
import { SPID } from "./model/SPID";
import { SpPositionType } from "./model/SpPositionType";

const RootContext = createContext({
    username: "",
    matchType: "",
    spIdList: [] as SPID[],
    spPositionList: [] as SpPositionType[],
    isLoading: false,
    matchTypeList: [] as MatchType[],
    matchDetailList: [] as MatchInfo[],
    fetchMatchTypes: () => {},
    fetchSpId: () => {},
    fetchSpPosition: () => {},
    fetchUserMatchInfo: () => {},
    fetchMatchInfoByType: (matchType: string) => {},
    setType: (matchType: string) => {},
    setName: (username: string) => {},
    setMatchInfoList: (list: MatchInfo[]) => {},
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

const RootProvider = ({ children }: Props): JSX.Element => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [accessId, setAccessId] = useState("");
    const [username, setUserName] = useState<string>("");
    const [matchType, setMatchType] = useState<string>("30");
    const [spIdList, setSpIdList] = useState<SPID[]>([]);
    const [spPositionList, setSpPositionList] = useState<SpPositionType[]>([]);
    const [matchTypeList, setMatchTypeList] = useState<MatchType[]>([]);
    const [matchDetailList, setMatchDetailList] = useState<MatchInfo[]>([]);

    const fetchMatchTypes = async () => {
        try {
            const res = await NEXONAPI.fetchMatchTypes();
            setMatchTypeList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSpId = async () => {
        try {
            const res = await NEXONAPI.fetchSpId();
            console.log(res);
            setSpIdList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSpPosition = async () => {
        try {
            const res = await NEXONAPI.fetchSpPosition();
            console.log(res);
            setSpPositionList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUserMatchInfo = async () => {
        try {
            const res1 = await NEXONAPI.fetchUserInfo(username);
            let accessId = res1.accessId;
            setAccessId(accessId);
            const res2 = await NEXONAPI.fetchMatchRecord(
                accessId,
                Number(matchType),
                { limit: 10 }
            );
            let tempList: any = [];
            for (let i = 0; i < res2.length; i++) {
                let matchInfo = await NEXONAPI.fetchMatchRecordDetail(res2[i]);
                console.log(matchInfo);

                tempList.push(matchInfo);
            }

            setMatchDetailList(tempList);
        } catch (err: any) {
            console.log(err.response.data.message);
        } finally {
            navigate(`/${username}`);
        }
    };

    const fetchMatchInfoByType = async (matchType: string) => {
        try {
            setIsLoading(true);
            const res2 = await NEXONAPI.fetchMatchRecord(
                accessId,
                Number(matchType),
                { limit: 10 }
            );
            let tempList: any = [];
            for (let i = 0; i < res2.length; i++) {
                let matchInfo = await NEXONAPI.fetchMatchRecordDetail(res2[i]);
                console.log(matchInfo);
                matchInfo.matchInfo.sort((a: any, b: any) => {
                    return a.nickname === username ? -1 : 0;
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

                console.log(matchInfo.matchInfo[0].player);
                tempList.push(matchInfo);
            }

            setMatchDetailList(tempList);
        } catch (err: any) {
            setIsLoading(false);
            console.log(err.response.data.message);
        } finally {
            setIsLoading(false);
            navigate(`/${username}`);
        }
    };

    const setName = (username: string) => {
        setUserName(username);
    };

    const setMatchInfoList = (list: MatchInfo[]) => {
        setMatchDetailList(list);
    };

    const setType = (matchType: string) => {
        setMatchType(matchType);
    };

    return (
        <RootContext.Provider
            value={{
                username,
                spIdList,
                spPositionList,
                matchType,
                isLoading,
                matchTypeList,
                matchDetailList,
                fetchSpId,
                fetchMatchTypes,
                fetchSpPosition,
                fetchUserMatchInfo,
                fetchMatchInfoByType,
                setName,
                setType,
                setMatchInfoList,
            }}
        >
            {children}
        </RootContext.Provider>
    );
};

export { RootContext, RootProvider };
