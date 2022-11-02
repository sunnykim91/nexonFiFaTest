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
}

export default NEXONAPI;
