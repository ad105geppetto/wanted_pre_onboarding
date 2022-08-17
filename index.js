import http from "http";
import Recruitments from "./models/recruitments.cjs";

const hostname = "127.0.0.1";
const port = 3000;
const companys = [
  { 회사명: "NAVER", 국가: "한국", 지역: "서울" },
  { 회사명: "원티드랩", 국가: "한국", 지역: "서울" },
  { 회사명: "KAKAO", 국가: "한국", 지역: "서울" },
  { 회사명: "LINE", 국가: "한국", 지역: "서울" },
  { 회사명: "COUPANG", 국가: "한국", 지역: "서울" },
  { 회사명: "우아한형제들", 국가: "한국", 지역: "서울" },
];
const users = ["우영우", "이준호", "동그라미", "최수연", "권민우", "정명석"];
let recruitments = [];

const server = http.createServer((req, res) => {
  const method = req.method;
  try {
    if (method === "GET") {
      const data = recruitments.map((recruitment) => {
        return Object.assign(recruitment, companys[recruitment.회사_id]);
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ data: data, message: "채용공고 목록을 가져옵니다." }));
    } else if (method === "POST") {
      let body = [];

      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", async () => {
          body = Buffer.concat(body).toString();
          const data = JSON.parse(body);
          const companysData = recruitments.filter((recruitment) => {
            recruitment.companysId === data.companysId;
          });
          console.log(data.companysId);
          if (companysData === []) {
            await Recruitments.create({
              companysId: data.companysId,
              position: data.position,
              compensation: data.compensation,
              contents: data.contents,
              techStack: data.techStack,
            });
            data.채용공고_id = 0;
            recruitments.push(data);
          } else {
            data.채용공고_id = companysData.length;
            recruitments.push(data);
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: "채용공고를 등록합니다." }));
        });
    } else if (method === "PATCH") {
      const url = new URL(req.url, `http://${req.host}`);
      const params = url.searchParams;
      const componysId = Number(params.get("company_id"));
      const recruitmentsId = Number(params.get("recruitment_id"));
      let body = [];

      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const { 채용포지션, 채용보상금, 채용내용, 사용기술 } = JSON.parse(body);

          recruitments = recruitments.map((recruitment) => {
            if (recruitment.회사_id === componysId && recruitment.채용공고_id === recruitmentsId) {
              if (채용포지션) {
                recruitment.채용포지션 = 채용포지션;
              }
              if (채용보상금) {
                recruitment.채용보상금 = 채용보상금;
              }
              if (채용내용) {
                recruitment.채용내용 = 채용내용;
              }
              if (사용기술) {
                recruitment.사용기술 = 사용기술;
              }
              return recruitment;
            } else {
              return recruitment;
            }
          });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: "채용공고를 수정합니다." }));
        });
    } else if (method === "DELETE") {
      const url = new URL(req.url, `http://${req.host}`);
      const params = url.searchParams;
      const companysId = Number(params.get("company_id"));
      const recruitmentsId = Number(params.get("recruitment_id"));

      recruitments = recruitments.filter((recruitment) => {
        return recruitment.회사_id !== companysId || recruitment.채용공고_id !== recruitmentsId;
      });

      res.statusCode = 204;
      res.setHeader("Content-Type", "application/json");
      return res.end();
    }
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "서버 에러" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
