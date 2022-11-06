import { createContext, useState } from "react";
import { MatchInfo } from "./model/MatchDetail";
import { MatchType } from "./model/MatchType";
import NEXONAPI from "./NEXONAPI";
import { useNavigate } from "react-router-dom";

const RootContext = createContext({
    username: "",
    matchType: "",
    matchTypeList: [] as MatchType[],
    matchDetailList: [] as MatchInfo[],
    fetchMatchTypes: () => {},
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
    const [accessId, setAccessId] = useState("");
    const [username, setUserName] = useState<string>("");
    const [matchType, setMatchType] = useState<string>("30");
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
                matchType,
                matchTypeList,
                matchDetailList,
                fetchMatchTypes,
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
