import axios from "axios";
import { NEXONAPIKEY } from "./config";

class NEXONAPI {
    static async fetchMatchTypes() {
        const url =
            "https://static.api.nexon.co.kr/fifaonline4/latest/matchtype.json";
        const key = NEXONAPIKEY;

        return axios
            .get(url, {
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res.data;
            });
    }

    static async fetchUserInfo(nickname: string) {
        const url = `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${nickname}`;
        const key = NEXONAPIKEY;

        return axios
            .get(url, {
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res.data;
            });
    }

    static async fetchMatchRecord(
        accessid: string,
        matchtype: number,
        params?: any
    ) {
        let offset = params?.offset ? params?.offset : 0;
        let limit = params?.limit ? params?.limit : 100;
        const url = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${accessid}/matches?matchtype=${matchtype}&offset=${offset}&limit=${limit}`;
        const key = NEXONAPIKEY;

        return axios
            .get(url, {
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res.data;
            });
    }

    static async fetchMatchRecordDetail(matchid: string) {
        const url = `https://api.nexon.co.kr/fifaonline4/v1.0/matches/${matchid}`;
        const key = NEXONAPIKEY;

        return axios
            .get(url, {
                headers: {
                    Authorization: key,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                return res.data;
            });
    }
}

export default NEXONAPI;
