const http = require("http");
const { Op } = require("sequelize");
const { companys, recruitments, sequelize, details, users_recruitments } = require("./models");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const url = new URL(req.url, `http://${hostname}:${port}`);
  const pathValiable = Number(url.pathname.split("/")[2]);
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
      if (url.pathname === `/api/${pathValiable}`) {
        recruitments
          .findOne({
            where: { id: pathValiable },
            attributes: {
              include: [
                [sequelize.col("companyname"), "companyname"],
                [sequelize.col("country"), "country"],
                [sequelize.col("region"), "region"],
                [sequelize.col("contents"), "contents"],
                [sequelize.col("anotherIds"), "anotherIds"],
              ],
              exclude: ["companyId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: companys,
                attributes: [],
              },
              {
                model: details,
                attributes: [],
              },
            ],
          })
          .then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ data: data, message: "채용공고를 가져옵니다." }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (url.pathname === "/api/some/url") {
        const keyword = url.searchParams.get("search");
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
        .on("end", async () => {
          body = Buffer.concat(body).toString();
          const data = JSON.parse(body);
          if (url.pathname === "/api") {
            await recruitments.create({
              companyId: data.companyId,
              position: data.position,
              compensation: data.compensation,
              techStack: data.techStack,
            });

            await recruitments
              .findAll({
                where: { companyId: data.companyId },
              })
              .then(async (result) => {
                if (result.length === 1) {
                  await details.create({
                    contents: data.contents,
                    anotherIds: [],
                  });
                } else if (result.length > 1) {
                  const recruitmentIds = result.map((data) => data.dataValues.id);

                  await details.create({
                    contents: data.contents,
                    anotherIds: [],
                  });

                  await recruitmentIds.map(async (id) => {
                    const data = recruitmentIds.filter((resultId) => resultId !== id);
                    await details.update(
                      {
                        anotherIds: data,
                      },
                      {
                        where: { id: id },
                      }
                    );
                  });
                }
              });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ message: "채용공고를 등록합니다." }));
          } else {
            const result = await users_recruitments.findOrCreate({
              where: { userId: data.userId, recruitmentId: data.recruitmentId },
            });

            const isTrue = result[1];
            if (isTrue) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ message: "채용공고에 지원합니다." }));
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ message: "사용자는 1회만 지원 가능합니다." }));
            }
          }
        });
    } else if (method === "PATCH") {
      const params = url.searchParams;
      const recruitmentId = Number(params.get("recruitment_id"));
      let body = [];

      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", async () => {
          body = Buffer.concat(body).toString();
          const { position, compensation, contents, techStack } = JSON.parse(body);

          await recruitments.update(
            {
              position: position,
              compensation: compensation,
              techStack: techStack,
            },
            {
              where: { id: recruitmentId },
            }
          );

          await details.update(
            {
              contents: contents,
            },
            {
              where: { id: recruitmentId },
            }
          );

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ message: "채용공고를 수정합니다." }));
        });
    } else if (method === "DELETE") {
      const params = url.searchParams;
      const companyId = Number(params.get("company_id"));
      const recruitmentsId = Number(params.get("recruitment_id"));

      await recruitments.destroy({
        where: {
          id: recruitmentsId,
        },
      });

      await details.destroy({
        where: {
          id: recruitmentsId,
        },
      });

      const result = await recruitments.findAll({
        where: { companyId: companyId },
      });
      const recruitmentIds = result.map((data) => data.dataValues.id);

      recruitmentIds.map(async (id) => {
        const data = recruitmentIds.filter((resultId) => resultId !== id);
        await details.update(
          {
            anotherIds: data,
          },
          {
            where: { id: id },
          }
        );
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
