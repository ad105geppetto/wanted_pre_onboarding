const http = require("http");
const { Op } = require("sequelize");
const { companys, recruitments, sequelize } = require("./models");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = new URL(req.url, `http://${req.host}`);
  try {
    if (method === "GET") {
      if (url.pathname === "/api") {
        recruitments
          .findAll({
            attributes: {
              include: [
                [sequelize.col("companyname"), "companyname"],
                [sequelize.col("country"), "country"],
                [sequelize.col("region"), "region"],
              ],
              exclude: ["companyId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: companys,
                attributes: [],
              },
            ],
          })
          .then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ data: data, message: "채용공고 목록을 가져옵니다." }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (url.pathname === "/api/some/url") {
        const keyword = url.searchParams.get("search");
        console.log(keyword);
        recruitments
          .findAll({
            where: {
              [Op.or]: [
                { position: { [Op.like]: `%${keyword}%` } },
                { techStack: { [Op.like]: `%${keyword}%` } },
                { $companyname$: { [Op.like]: `%${keyword}%` } },
              ],
            },
            attributes: {
              include: [
                [sequelize.col("companyname"), "companyname"],
                [sequelize.col("country"), "country"],
                [sequelize.col("region"), "region"],
              ],
              exclude: ["companyId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: companys,
                attributes: [],
              },
            ],
          })
          .then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ data: data, message: "채용공고 목록을 가져옵니다." }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (method === "POST") {
      let body = [];

      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const data = JSON.parse(body);
          recruitments.create({
            companyId: data.companyId,
            position: data.position,
            compensation: data.compensation,
            contents: data.contents,
            techStack: data.techStack,
          });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: "채용공고를 등록합니다." }));
        });
    } else if (method === "PATCH") {
      const url = new URL(req.url, `http://${req.host}`);
      const params = url.searchParams;
      const recruitmentId = Number(params.get("recruitment_id"));
      let body = [];

      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const { position, compensation, contents, techStack } = JSON.parse(body);

          recruitments
            .update(
              {
                position: position,
                compensation: compensation,
                contents: contents,
                techStack: techStack,
              },
              {
                where: { id: recruitmentId },
              }
            )
            .then(() => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ message: "채용공고를 수정합니다." }));
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else if (method === "DELETE") {
      const url = new URL(req.url, `http://${req.host}`);
      const params = url.searchParams;
      const recruitmentsId = Number(params.get("recruitment_id"));

      recruitments.destroy({
        where: {
          id: recruitmentsId,
        },
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
